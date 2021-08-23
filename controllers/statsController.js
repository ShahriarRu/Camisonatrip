const asyncHandler = require("express-async-handler");
const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient();
const axios = require("axios");
const qs = require("qs");
const got = require("got");

var PImage = require("pureimage");
const fs = require("fs");

var sizeOf = require("image-size");
var rgbToHex = require("rgb-to-hex");

// const download = require("../utils/download");

var admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

// var admin = require("firebase-admin");

// var serviceAccount = require("../serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// const db = admin.firestore();

const { Storage } = require("@google-cloud/storage");
const storage = new Storage();

async function uploadFile(bucketName, filePath, destinationFileName) {
  await storage.bucket(bucketName).upload(destinationFileName, {
    destination: destinationFileName,
  });
  const urls = await storage
    .bucket(bucketName)
    .file(destinationFileName)
    .getSignedUrl({
      action: "read",
      expires: "03-09-2491",
    });
  console.log("Signed URLS are", urls);
  console.log(`${destinationFileName} uploaded to ${bucketName}`);
  return urls[0];
}

const deleteFile = async (file) => {
  fs.unlinkSync(file);
};

//getUsers function to get all users
// SAMPLE

const getStats = asyncHandler(async (req, res) => {
  //   Some async functions
  res.json({
    success: "OK",
  });
});

//getUsers function to get all users
const getExif = asyncHandler(async (req, res) => {
  //   Some async functions

  let url = req.body.url;
  let docID = req.body.docID;
  if (!url) {
    console.log("no url found");
    return;
  }

  var options = {
    method: "GET",
    url: "https://metadata-extractor.p.rapidapi.com/",
    params: {
      // url: "https://img.photographyblog.com/reviews/dji_mavic_air/photos/dji_mavic_air_06.jpg",
      url,
    },
    headers: {
      "x-rapidapi-key": "3a47ee8c49msh8fad11a9f7ea5cep11ab93jsn27ac2992080d",
      "x-rapidapi-host": "metadata-extractor.p.rapidapi.com",
    },
  };

  const response = await axios.request(options);
  console.log(response.data);
  const exifData = response.data;
  // store in DB

  await db.collection("search_stats").doc(docID).set(
    {
      exif: exifData,
    },
    {
      merge: true,
    }
  );

  res.json({
    exif: exifData,
  });
});

const getLabels = asyncHandler(async (req, res) => {
  //   Some async functions

  let url = req.body.url;
  let user = req.body.user;
  let docID = req.body.docID;
  if (!url) return;

  const [result] = await client.labelDetection(
    // "https://nmaahc.si.edu/sites/default/files/styles/featured_image_16x9/public/images/header/audience-citizen_0.jpg"
    url
  );
  const labels = result.labelAnnotations;
  console.log("Response from LABELS");
  console.log("Type of Labels:", typeof labels);
  console.log(labels);

  const labels_arr = labels.map((label) => label.description.toLowerCase());

  console.log("labels_arr", labels_arr);

  // store in DB
  await db
    .collection("search_stats")
    .doc(docID)
    .set(
      {
        labels: {
          labels_search: labels_arr,
          labels_data: labels,
        },
      },
      {
        merge: true,
      }
    );

  // labels.forEach((label) => console.log(label.description));

  res.json({
    labels,
  });
});

function decorateColors(colors) {
  var scoresSum =
    colors.reduce(function (sum, color) {
      return sum + color.score;
    }, 0) / 100;

  return colors.map(function (color) {
    color.percent = color.score / scoresSum;
    return color;
  });
}

const getProperties = asyncHandler(async (req, res) => {
  //   Some async functions

  let url = req.body.url;
  let user = req.body.user;
  let docID = req.body.docID;
  if (!url) return;

  const [result] = await client.imageProperties(url);
  const colors = result.imagePropertiesAnnotation.dominantColors.colors;

  console.log("Response from PROPERTIES");
  console.log("Type of colors", typeof colors);
  console.log(colors);

  // colors.forEach((color) => console.log(color));
  // console.log(new Date().getUTCSeconds());

  decorateColors(colors);

  const colors_arr = colors.map((color) => {
    let str_color =
      `rgb(` +
      color.color.red +
      "," +
      color.color.green +
      "," +
      color.color.blue +
      ")";

    return `#` + rgbToHex(str_color);
  });

  // store in DB
  await db
    .collection("search_stats")
    .doc(docID)
    .set(
      {
        colors: {
          colors_search: colors_arr,
          colors_data: colors,
        },
      },
      {
        merge: true,
      }
    );

  console.log("colors_arr", colors_arr);

  res.json({
    colors,
  });
});

const getObjects = asyncHandler(async (req, res) => {
  //   Some async functions

  let url = req.body.url;
  let user = req.body.user;
  let docID = req.body.docID;
  if (!url) return;

  // Get the fileName from the URL
  // let destinationFileName = "";
  // try {
  //   destinationFileName = new URL(url).pathname.split("/").pop();
  // } catch (e) {
  //   console.error(e);
  // }

  // download the file
  // await bucket
  //   .file(destinationFileName)
  //   .download({
  //     destination: __dirname + "/" + destinationFileName,
  //   })
  //   .then(() => {
  //     console.log("The file has been downloaded to", destinationFileName);
  //   });

  // var dimensions = sizeOf(destinationFileName);
  // console.log(dimensions);

  // Get object properties
  const [result] = await client.objectLocalization(url);
  const objects = result.localizedObjectAnnotations;

  // File that will be written
  // outputFile = __dirname + "/" + destinationFileName;
  // console.log("Output file path", outputFile);

  // See the file URL
  // let fileURL = url.split("&")[0];
  // console.log("FileURL is", fileURL);

  console.log("Response from OBJECTS");
  console.log("Typeof objects", typeof objects);
  console.log(objects);

  let objects_arr = objects.map((object) => object.name.toLowerCase());

  // store in db
  await db
    .collection("search_stats")
    .doc(docID)
    .set(
      {
        objects: {
          objects_search: objects_arr,
          objects_data: objects,
        },
      },
      {
        merge: true,
      }
    );

  console.log("objects_arr", objects_arr);

  // objects.forEach((object) => {
  // console.log(`Name: ${object.name}`);
  // console.log(`Confidence: ${object.score}`);
  // const vertices = object.boundingPoly.normalizedVertices;
  // console.log();
  // vertices.forEach((v) => console.log(`x: ${v.x}, y:${v.y}`));
  // });

  // try {
  // await highLightObjects(
  //   fileURL,
  //   objects,
  //   destinationFileName,
  //   PImage,
  //   dimensions
  // );
  // const urlOfImage = await uploadFile(
  //   "gwb-group.appspot.com",
  //   outputFile,
  //   destinationFileName
  // );
  // res.json({
  // url: urlOfImage,
  // objects,
  // });
  // } catch (error) {
  //   console.log("Error while highlighting faces", error);
  //   return res.json({
  //     error,
  //   });
  // }

  res.json({
    objects,
  });
});

const getTexts = asyncHandler(async (req, res) => {
  // Some async functions

  let url = req.body.url;
  let user = req.body.user;
  let docID = req.body.docID;
  if (!url) return;

  // DESTINATION FILE NAME
  let destinationFileName = "";
  try {
    destinationFileName = new URL(url).pathname.split("/").pop();
  } catch (e) {
    console.error(e);
  }

  const [result] = await client.textDetection(url);
  const texts = result.textAnnotations;

  console.log("Response from TEXT");
  console.log("Typeof Text:", typeof texts);
  console.log(texts);
  // texts.forEach((text) => console.log(text));

  // OUTPUT FILE PATH
  outputFile = __dirname + "/" + destinationFileName;
  console.log("Output file path", outputFile);

  // GET THE FILE URL
  let fileURL = url.split("&")[0];
  console.log("FileURL is", fileURL);

  try {
    await highlightFaces(
      fileURL,
      texts,
      "texts_" + destinationFileName,
      PImage
    );
    const urlOfImage = await uploadFile(
      "gwb-group.appspot.com",
      outputFile,
      "texts_" + destinationFileName
    );

    deleteFile("texts_" + destinationFileName);

    // return emotions as array for search
    const texts_arr = texts.map((text) => text.description.toLowerCase());

    // make an object
    let resultant_obj = {
      texts: texts_arr,
      text_data: texts_arr.length !== 0 ? texts : [],
      text_image: urlOfImage,
    };

    // store in db
    await db.collection("search_stats").doc(docID).set(
      {
        texts: resultant_obj,
      },
      {
        merge: true,
      }
    );
    console.log("testing");

    res.json({
      texts,
      url: urlOfImage,
    });
  } catch (error) {
    console.log("Error while highlighting texts", error);
  }
});

const getFaces = asyncHandler(async (req, res) => {
  //   Some async functions

  let url = req.body.url;
  let user = req.body.user;
  let docID = req.body.docID;
  if (!url) return;

  console.log("URL passed to faces API", url);
  // DESTINATION FILE NAME
  let destinationFileName = "";
  try {
    destinationFileName = new URL(url).pathname.split("/").pop();
  } catch (e) {
    console.error(e);
  }

  const [result] = await client.faceDetection(url);
  const faces = result.faceAnnotations;

  console.log("Faces:");
  console.log("Typeof Faces:", typeof faces);
  console.log(faces);

  // return emotions as array for search
  const faces_arr = faces.map((face) => {
    if (face.joyLikelihood === "VERY_LIKELY") {
      return "joy";
    }
    if (face.sorrowLikelihood === "VERY_LIKELY") {
      return "sorrow";
    }
    if (face.angerLikelihood === "VERY_LIKELY") {
      return "anger";
    }
    if (face.surpriseLikelihood === "VERY_LIKELY") {
      return "surprise";
    }
    return "";
  });

  console.log("faces_arr is", faces_arr);

  let unique_faces_arr = [...new Set(faces_arr)];

  console.log("unique element", unique_faces_arr);

  // faces.forEach((face, i) => {
  //   console.log(`  Face #${i + 1}:`);
  //   console.log(`    Joy: ${face.joyLikelihood}`);
  //   console.log(`    Anger: ${face.angerLikelihood}`);
  //   console.log(`    Sorrow: ${face.sorrowLikelihood}`);
  //   console.log(`    Surprise: ${face.surpriseLikelihood}`);
  // });

  outputFile = __dirname + "/" + destinationFileName;
  console.log("Output file path", outputFile);
  // make the download at upload image, so it will be downlaoded already
  // or find a way for filestream to get closed

  // let downloaded = "downloaded.png";
  // download(url, downloaded);

  let fileURL = url.split("&")[0];
  console.log("FileURL is", fileURL);

  // let fileURL =
  //   "https://www.quickanddirtytips.com/sites/default/files/styles/article_main_image/public/images/2332/people-persons-peoples.jpg";

  try {
    await highlightFaces(
      fileURL,
      faces,
      "faces_" + destinationFileName,
      PImage
    );

    // give the bucket name, where the file is, where it will be store
    const urlOfImage = await uploadFile(
      "gwb-group.appspot.com",
      outputFile,
      "faces_" + destinationFileName
    );

    // Delete the file after uploading

    deleteFile("faces_" + destinationFileName);

    let resultant_obj = {
      face_search: unique_faces_arr,
      face_data: unique_faces_arr.length !== 0 ? faces : [],
      face_image_url: urlOfImage,
    };

    // store in DB
    await db.collection("search_stats").doc(docID).set(
      {
        faces: resultant_obj,
      },
      {
        merge: true,
      }
    );

    res.json({
      url: urlOfImage,
      faces,
    });
  } catch (error) {
    console.log("Error while highlighting faces", error);
    return res.json({
      error,
    });
  }
  // res.sendFile(outputFile);

  // console.log(__dirname + "/" + outputFile);
  // res.end();
});

async function highlightFaces(inputFile, faces, outputFile, PImage) {
  // Open the original image
  // const stream = fs.createReadStream(inputFile);

  // console.log("Input file  highlightFaces", inputFile);
  // console.log("Input file faces", faces);
  // console.log("Input file outputFile", outputFile);
  // console.log("Input file PImage", PImage);

  const stream = got.stream(inputFile);
  let promise;
  // OLD REGEX
  // if (inputFile.match(/\.jpg$/)) {
  // NEW REGEX
  if (inputFile.match(/.jpg/g) || inputFile.match(/.jpeg/g)) {
    promise = PImage.decodeJPEGFromStream(stream);
  } else if (inputFile.match(/.png/g)) {
    promise = PImage.decodePNGFromStream(stream);
  } else {
    throw new Error(`Unknown filename extension ${inputFile}`);
  }

  const img = await promise;
  const context = img.getContext("2d");

  context.drawImage(img, 0, 0, img.width, img.height, 0, 0);

  // Now draw boxes around all the faces
  context.strokeStyle = "rgba(0,255,0,0.8)";
  context.lineWidth = "1";

  faces.forEach((face) => {
    context.beginPath();

    let origX = 0;
    let origY = 0;

    face.boundingPoly.vertices.forEach((bounds, i) => {
      if (i === 0) {
        origX = bounds.x;
        origY = bounds.y;
        context.moveTo(bounds.x, bounds.y);
      } else {
        context.lineTo(bounds.x, bounds.y);
      }
    });
    context.lineTo(origX, origY);
    context.stroke();
  });

  // Write the result to a file
  console.log(`Writing to file ${outputFile}`);
  const writeStream = fs.createWriteStream(outputFile);
  await PImage.encodePNGToStream(img, writeStream);
}

// If you know the size of your image (it's width and height), you can simply multiply it with your NorrmalizedVertex. You should multiply the x field of your normalizedVertices with the width of the picture to get the x field of the Vertex and multiply the y field of your normalizedVertices with the height of the image to get the y of the Vertex.
async function highLightObjects(
  inputFile,
  faces,
  outputFile,
  PImage,
  dimensions
) {
  // Open the original image
  // const stream = fs.createReadStream(inputFile);

  // console.log("Input file  highlightFaces", inputFile);
  // console.log("Input file faces", faces);
  // console.log("Input file outputFile", outputFile);
  // console.log("Input file PImage", PImage);

  const stream = got.stream(inputFile);
  let promise;
  // OLD REGEX
  // if (inputFile.match(/\.jpg$/)) {
  // NEW REGEX
  if (inputFile.match(/.jpg/g) || inputFile.match(/.jpeg/g)) {
    promise = PImage.decodeJPEGFromStream(stream);
  } else if (inputFile.match(/.png/g)) {
    promise = PImage.decodePNGFromStream(stream);
  } else {
    throw new Error(`Unknown filename extension ${inputFile}`);
  }

  const img = await promise;
  const context = img.getContext("2d");

  context.drawImage(img, 0, 0, img.width, img.height, 0, 0);

  // Now draw boxes around all the faces
  context.strokeStyle = "rgba(0,255,0,0.8)";
  context.lineWidth = "1";

  faces.forEach((face) => {
    context.beginPath();

    let origX = 0;
    let origY = 0;

    face.boundingPoly.normalizedVertices.forEach((bounds, i) => {
      if (i === 0) {
        origX = bounds.x * dimensions.width;
        origY = bounds.y * dimensions.height;
        context.moveTo(bounds.x, bounds.y);
      } else {
        context.lineTo(bounds.x, bounds.y);
      }
    });
    context.lineTo(origX, origY);
    context.stroke();
  });

  // Write the result to a file
  console.log(`Writing to file ${outputFile}`);
  const writeStream = fs.createWriteStream(outputFile);
  await PImage.encodePNGToStream(img, writeStream);
}

const getPhotoScore = async (req, res) => {
  //   Some async functions

  let url = req.body.url;
  let user = req.body.user;
  let docID = req.body.docID;
  if (!url)
    return res.json({
      msg: "No URL found",
    });

  const api_url = "https://api.everypixel.com/v1/quality_ugc";

  const data = {
    grant_type: "client_credentials",
  };

  const auth = {
    username: "gkzcl3MvBCkD9lpu0cMkEN4e",
    password: "gLBhw0iouzDOll2LpVfsdPxS1jhuuM0CvQi6TNz1FIKG2L13",
  };

  const options = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    data: qs.stringify(data),
    params: {
      url: url,
    },
    auth: auth,
    url: api_url,
  };

  try {
    const response = await axios(options);
    console.log("RESPOSNE FROM PHOTO SCORE", response.data);
    const data = response.data;

    data.quality.score = parseInt(data.quality.score * 100);

    // store in DB
    await db.collection("search_stats").doc(docID).set(
      {
        score: data,
      },
      {
        merge: true,
      }
    );

    res.json({
      photo_score: data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      error,
    });
  }
};

module.exports = {
  getStats,
  getLabels,
  getProperties,
  getObjects,
  getTexts,
  getPhotoScore,
  getFaces,
  getExif,
};
