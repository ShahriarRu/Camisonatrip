import app from "../../firebase";
const db = app.firestore();

// Handle capitalization rem
// function capitalizeFirstLetter(string) {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }

// This will search in all the fields
const search = async (searchUF, labels, objects, texts, photoScore, faces) => {
  // get single
  // const docRef = db.collection("search_stats").doc("123");
  // const response = await docRef.get();
  // console.log(response.data());

  let results = [];
  let addedIDs = [];

  // check arguments
  console.log(searchUF, labels, objects, texts, photoScore, faces);

  // capitalize first letter
  let search = searchUF.toLowerCase();

  // 1:
  // Colors Search
  let colors = false;
  if (colors) {
    const colorsSearch = await db
      .collection("search_stats")
      .where("user.privacy", "==", "public")
      .where("colors.colors_search", "array-contains", search)
      .get();
    if (colorsSearch.empty) {
      console.log("No document found -> colorsSearch");
    }
    colorsSearch.forEach((r) => {
      console.log(r.data());
      results.push(r.data());
    });
  }
  // 2:
  // Labels Search

  if (labels) {
    const labelsSearch = await db
      .collection("search_stats")
      .where("user.privacy", "==", "public")
      .where("labels.labels_search", "array-contains", search)
      .get();

    if (labelsSearch.empty) {
      console.log("No document found -> labelsSearch");
    }
    labelsSearch.forEach((r) => {
      console.log(r.data());
      console.log("ID is", r.id);
      if (!addedIDs.includes(r.id)) {
        addedIDs.push(r.id);
        results.push(r.data());
      }
    });
  }
  // 3:
  // Texts Search
  if (texts) {
    const textsSearch = await db
      .collection("search_stats")
      .where("user.privacy", "==", "public")
      .where("texts.texts", "array-contains", search)
      .get();

    if (textsSearch.empty) {
      console.log("No document found -> textsSearch");
    }
    textsSearch.forEach((r) => {
      if (!addedIDs.includes(r.id)) {
        addedIDs.push(r.id);
        results.push(r.data());
      }
    });
  }
  // 4:
  // objects search

  if (objects) {
    const objectsSearch = await db
      .collection("search_stats")
      .where("user.privacy", "==", "public")
      .where("objects.objects_search", "array-contains", search)
      .get();
    if (objectsSearch.empty) {
      console.log("No document found -> objectsSearch");
    }
    objectsSearch.forEach((r) => {
      if (!addedIDs.includes(r.id)) {
        addedIDs.push(r.id);
        results.push(r.data());
      }
    });
  }
  // 5:
  // score search
  if (photoScore) {
    console.log("photo score in search", photoScore);

    // check if 0-20 sel

    if (photoScore === "1") {
      // make query b/w 0-20
      const scoreSearch = await db
        .collection("search_stats")
        .where("user.privacy", "==", "public")
        .where("score.quality.score", ">=", 0)
        .where("score.quality.score", "<=", 20)
        .get();
      if (scoreSearch.empty) {
        console.log("No document found -> scoreSearch");
      }
      scoreSearch.forEach((r) => {
        if (!addedIDs.includes(r.id)) {
          addedIDs.push(r.id);
          results.push(r.data());
          console.log(r.data());
        }
      });
    } else if (photoScore === "2") {
      // make query b/w 20-40
      const scoreSearch = await db
        .collection("search_stats")
        .where("user.privacy", "==", "public")
        .where("score.quality.score", ">=", 20)
        .where("score.quality.score", "<=", 40)
        .get();
      if (scoreSearch.empty) {
        console.log("No document found -> scoreSearch");
      }
      scoreSearch.forEach((r) => {
        if (!addedIDs.includes(r.id)) {
          addedIDs.push(r.id);
          results.push(r.data());
          console.log(r.data());
        }
      });
    } else if (photoScore === "3") {
      // make query b/w 40-60
      const scoreSearch = await db
        .collection("search_stats")
        .where("user.privacy", "==", "public")
        .where("score.quality.score", ">=", 40)
        .where("score.quality.score", "<=", 60)
        .get();
      if (scoreSearch.empty) {
        console.log("No document found -> scoreSearch");
      }
      scoreSearch.forEach((r) => {
        if (!addedIDs.includes(r.id)) {
          addedIDs.push(r.id);
          results.push(r.data());
          console.log(r.data());
        }
      });
    } else if (photoScore === "4") {
      // make query b/w 60-80
      const scoreSearch = await db
        .collection("search_stats")
        .where("user.privacy", "==", "public")
        .where("score.quality.score", ">=", 60)
        .where("score.quality.score", "<=", 80)
        .get();
      if (scoreSearch.empty) {
        console.log("No document found -> scoreSearch");
      }
      scoreSearch.forEach((r) => {
        if (!addedIDs.includes(r.id)) {
          addedIDs.push(r.id);
          results.push(r.data());
          console.log(r.data());
        }
      });
    } else if (photoScore === "5") {
      // make query b/w 80-100
      const scoreSearch = await db
        .collection("search_stats")
        .where("user.privacy", "==", "public")
        .where("score.quality.score", ">=", 80)
        .where("score.quality.score", "<=", 100)
        .get();
      if (scoreSearch.empty) {
        console.log("No document found -> scoreSearch");
      }
      scoreSearch.forEach((r) => {
        if (!addedIDs.includes(r.id)) {
          addedIDs.push(r.id);
          results.push(r.data());
          console.log(r.data());
        }
      });
    }
  }
  // 6:
  // face search
  if (faces) {
    const faceSearch = await db
      .collection("search_stats")
      .where("user.privacy", "==", "public")
      .where("faces.face_search", "array-contains", search)
      .get();

    if (faceSearch.empty) {
      console.log("No document found -> faceSearch");
    }

    faceSearch.forEach((r) => {
      if (!addedIDs.includes(r.id)) {
        addedIDs.push(r.id);
        results.push(r.data());
      }
    });
  }
  return results;
};

export { search };
