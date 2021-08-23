import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ReactStars from "react-stars";
import { useAuth } from "../../contexts/AuthContext";

import app from "../../firebase";
const db = app.firestore();

// import Rating from "react-simple-star-rating";

const CardComponent = ({ data }) => {
  const history = useHistory();
  const [rating, setRating] = useState(0); // initial rating value

  console.log(data.user.fileURL);

  const { currentUser } = useAuth();

  const ratingChanged = async (newRating) => {
    // console.log(newRating);
    // console.log(data);
 
    // const ratingRef = db.collection("ratings").doc();
    // console.log(currentUser.email);
    // await ratingRef.set({
    //   statsID: data.uid,
    //   ratingBy: currentUser.email,
    //   rating: newRating,
    // });

    const ratingdata = await db
      .collection("ratings")
      .where("ratingBy", "==", currentUser.email)
      .where("statsID", "==", data.uid)
      .get();
    if (ratingdata.empty) {
      const ratingRef = db.collection("ratings").doc();

      console.log("rating,", await ratingRef.get());
      console.log(currentUser.email);
      console.log("uid", data.uid);

      await ratingRef.set({
        statsID: data.uid,
        ratingBy: currentUser.email,
        rating: newRating,
      });
    } else {
      let rateID = [];
      ratingdata.forEach((r) => {
        rateID.push(r.id);
      });
      console.log("rateID", rateID);
      const ratingRef = db.collection("ratings").doc(rateID[0]);

      console.log(currentUser.email);
      console.log("uid", data.uid);

      await ratingRef.set(
        {
          statsID: data.uid,
          ratingBy: currentUser.email,
          rating: newRating,
        },
        {
          merge: true,
        }
      );
    }

  };

  const handleRating = (rate) => {
    setRating(rate);
    // Some logic
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ marginTop: "20px", marginBottom: "20px" }}
    >
      <Card style={{ maxWidth: "80%" }}>
        <Card.Img variant="top" src={data.user.fileURL} />
        <Card.Body>
          <Card.Text className="float-right">
            <span>Photo by:</span>
            <span>{data.user.email}</span>
          </Card.Text>
          <Card.Text className="float-left">
            <span>Rate Image</span>
            <>
              <ReactStars
                count={10}
                onChange={ratingChanged}
                size={30}
                color2={"#ffd700"}
              />
            </>
          </Card.Text>
        </Card.Body>
      </Card>
      {/* <Rating
        onClick={handleRating}
        ratingValue={rating}
        size={20}
        label
        transition
        fillColor="orange"
        emptyColor="gray"
      />
      {rating} */}
      {/* <img src={data.face_image_url} alt="Image" /> */}
    </div>
  );
};

export default CardComponent;
