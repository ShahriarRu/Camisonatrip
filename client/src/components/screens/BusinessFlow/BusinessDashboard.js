import React, { useState, useEffect } from "react";
import classes from "../PhotographerFlow/PhotographerDashboard.module.css";
import image from "./1.png";
import ImgComponent from "../PhotographerFlow/ImgComponent";
import { Card } from "react-bootstrap";
import app from "../../../firebase";
import firebase from "firebase/app";

const db = app.firestore();

const BusinessDashboard = () => {

  // data
  const [data, setData] = useState([]);

  // console.log("props in dashboard", props);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {

      if (user) {
        fetchData(user.uid)
        // setUserID(user.uid);
      }
    });
  });

  const fetchData = async (userID) => {

    let data = [];
    console.log('I am userId', userID);
    const response = await db
      .collection("search_stats")
      .where("user.id", "==", userID)
      .get();
    console.log('response', response);
    response.forEach((r) => {
      data.push(Object.assign({ uid: r.id }, r.data()));
    });

    setData(data);
  };

  console.log(data);

  return (
    <div className={classes.body}>
      <h1>Business Dashboard</h1>
      <div>
        <h3>Total Score: 456</h3>
        <h3>Total Earn: %150</h3>
      </div>
      <Card>
        <div className={classes.img}>
        {data.map((result, i) => {
            return <ImgComponent  image={result.user.fileURL} key={i} score={result.score.quality.score} earn={20} />
            })}
          <ImgComponent image={image} score={10} earn={20} />
        </div>
      </Card>
    </div>
  );
};

export default BusinessDashboard;
