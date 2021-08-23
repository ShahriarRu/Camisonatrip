import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import ImageUpload from "image-upload-react";
import classes from "./ImageUpload.module.css";
import {
  getLabels,
  getProperties,
  getObjects,
  getTexts,
  getPhotoScore,
  getFaces,
  getExif,
} from "../../redux/stats/actions";
import upImage from "./UploadLogo.png";

import app from "../../firebase";
import { connect } from "react-redux";
const db = app.firestore();

async function createSearchStat(user) {
  const dbRef = db.collection("search_stats");

  const r = await dbRef.add({
    user,
  });

  return r.id;
}

function Uploader({
  uid,
  email,
  labels,
  objects,
  colors,
  texts,
  photo_score,
  faces,

  getLabelsAction,
  getPropertiesAction,
  getObjectsAction,
  getTextsAction,
  getPhotoScoreAction,
  getFacesAction,
  getExifAction,
}) {
  const [imageSrc, setImageSrc] = useState();
  const [privacy, setPrivacy] = useState("");
  const [file, setFile] = useState();

  const uploadHandler = async () => {
    let fileURL = "";
    try {
      const storageRef = app.storage().ref();
      const fileRef = storageRef.child(file.name);
      // store image in DB
      await fileRef.put(file);
      fileURL = await fileRef.getDownloadURL();
    } catch (error) {
      console.log("Error while saving in storage", error);
    }

    let user = {
      id: uid,
      email,
      fileURL,
      privacy,
    };

    const docID = await createSearchStat(user);

    // perform actions
    // setLoading(false);
    getLabelsAction(fileURL, user, docID);
    getPropertiesAction(fileURL, user, docID);
    getFacesAction(fileURL, user, docID);
    getObjectsAction(fileURL, user, docID);
    getPhotoScoreAction(fileURL, user, docID);
    getTextsAction(fileURL, user, docID);
    getExifAction(fileURL, user, docID);
  };

  const handleImageSelect = async (e) => {
    setImageSrc(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  // useEffect(() => {
  //   console.log("Labels are", labels);
  // }, [labels]);

  // useEffect(() => {
  //   console.log("Objects are", objects);
  // }, [objects]);

  // useEffect(() => {
  //   console.log("Photo Score is", photo_score);
  // }, [photo_score]);

  // useEffect(() => {
  //   console.log("Texts are", texts);
  // }, [texts]);

  // useEffect(() => {
  //   console.log("Colors are", colors);
  // }, [colors]);

  // useEffect(() => {
  //   console.log("Faces are", faces);
  // }, [faces]);

  // useEffect(() => {
  //   console.log(faces);
  //   console.log(objects);
  //   console.log(properties);
  //   console.log(texts);
  //   console.log(photo_score);
  //   console.log(faces);
  // }, [labels, objects, properties, texts, photo_score, faces]);

  const privacyChangeHandler = (event) => {
    setPrivacy(event.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <Container className="d-flex align-items-center justify-content-center">
      <div
        style={{
          marginTop: "-20px",
        }}
      >
        <ImageUpload
          handleImageSelect={handleImageSelect}
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}
          id="uploader"
          style={{
            width: 700,
            height: 500,
            background: "#d9d9d9",
            backgroundImage: `url(${upImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.15)`,
          }}
        />
        <div className={classes.imgupload}>
          <div style={{display: "flex"}}>
            <div>
              <input
                type="radio"
                value="public"
                checked={privacy === "public"}
                onChange={privacyChangeHandler}
              />
              <label>Public</label>
            </div>
            <div>
              <input
                type="radio"
                value="private"
                checked={privacy === "private"}
                onChange={privacyChangeHandler}
              />
              <label>Private</label>
            </div>
          </div>
          <div className={classes.btns}>
          <button
            className={classes.upload}
            onClick={uploadHandler}
            disabled={privacy === "" || file === undefined}
          >
            Upload
          </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

const mapStateToProps = ({ stats }) => {
  const { labels, objects, colors, texts, photo_score, faces } = stats;
  return {
    labels,
    objects,
    colors,
    texts,
    photo_score,
    faces,
  };
};

const mapDispatchToProps = {
  getLabelsAction: getLabels,
  getPropertiesAction: getProperties,
  getObjectsAction: getObjects,
  getTextsAction: getTexts,
  getPhotoScoreAction: getPhotoScore,
  getFacesAction: getFaces,
  getExifAction: getExif,
};

export default connect(mapStateToProps, mapDispatchToProps)(Uploader);
