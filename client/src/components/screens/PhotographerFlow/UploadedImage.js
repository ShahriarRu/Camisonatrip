import React, { useState, useEffect } from "react";
import SimpleSlider from "./SimpleSlider";
import classes from "./UploadedImage.module.css";
import { Container } from "react-bootstrap";
import app from "../../../firebase";
import firebase from "firebase/app";

const db = app.firestore();

const UploadedImage = () => {
  // data
  const [data, setData] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        fetchData(user.uid);
        // setUserID(user.uid);
      }
    });
  });

  const fetchData = async (userID) => {
    let data = [];
    console.log("I am userId", userID);
    const response = await db
      .collection("search_stats")
      .where("user.id", "==", userID)
      .limit(10)
      .get();
    console.log("response", response);
    response.forEach((r) => {
      data.push(Object.assign({ uid: r.id }, r.data()));
    });

    setData(data);
  };

  return (
    <Container style={{ maxWidth: "800px" }}>
      <div className={classes.body}>
        <SimpleSlider data={data} />
        <div className={classes.btns}>
          <button className={classes.dashboard}>Your Dashboard</button>
        </div>
      </div>
    </Container>
  );
};

export default UploadedImage;
