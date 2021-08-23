import axios from "axios";

const getLabels = async (url, user, docID) => {
  // let user = JSON.parse(localStorage.getItem("logged_in_user"));

  const response = await axios.post("/api/stats/labels", {
    url,
    user,
    docID,
  });

  // console.log("User UID is", user.uid);
  // await db.collection("users").doc(user.uid).collection("stats").add({
  //   id: user.uid,
  //   labels: response.data.labels,
  // });

  return response;
};

const getProperties = async (url, user, docID) => {
  const response = await axios.post("/api/stats/properties", {
    url,
    user,
    docID,
  });

  // let user = JSON.parse(localStorage.getItem("logged_in_user"));
  // console.log("user is ", user);

  // await db
  //   .collection("users")
  //   .doc(user.uid)
  //   .collection("stats")
  //   .doc(user.uid)
  //   .update({
  //     // id: user.uid,
  //     colors: response.data.colors,
  //   });

  return response;
};

const getObjects = async (url, user, docID) => {
  const response = await axios.post("/api/stats/objects", {
    url,
    user,
    docID,
  });
  return response;
};

const getTexts = async (url, user, docID) => {
  const response = await axios.post("/api/stats/texts", {
    url,
    user,
    docID,
  });
  return response;
};

const getPhotoScore = async (url, user, docID) => {
  const response = await axios.post("/api/stats/photo-score", {
    url,
    user,
    docID,
  });
  return response;
};

const getFaces = async (url, user, docID) => {
  const response = await axios.post("/api/stats/faces", {
    url,
    user,
    docID,
  });

  return response;
};

const getExif = async (url, user, docID) => {
  const response = await axios.post("/api/stats/exif", {
    url,
    user,
    docID,
  });

  return response;
};

export {
  getLabels,
  getProperties,
  getObjects,
  getTexts,
  getPhotoScore,
  getFaces,
  getExif,
};
