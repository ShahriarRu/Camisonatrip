import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ReactStars from "react-stars";
import { useAuth } from "../../contexts/AuthContext";

import app from "../../firebase";

// components
import Labels from "./Labels";
import Faces from "./Faces";
import Objects from "./Objects";
import Colors from "./Colors";
import PhotoScore from "./PhotoScoring";
import Text from "./Text";

import { CSVLink } from "react-csv";

const Details = ({ location }) => {
  const [isRate, setIsRate] = useState(false);
  const db = app.firestore();
  const { currentUser } = useAuth();

  const [data, setData] = useState();
  const [csvData, setCsvData] = useState();

  const history = useHistory();
  const [rating, setRating] = useState(0); // initial rating value

  const ratingChanged = async (newRating) => {
    console.log("newRating", newRating);
    console.log("data", location.data);

    const ratingdata = await db
      .collection("ratings")
      .where("ratingBy", "==", currentUser.email)
      .where("statsID", "==", location.data.uid)
      .get();
    if (ratingdata.empty) {
      const ratingRef = db.collection("ratings").doc();

      console.log("rating,", await ratingRef.get());
      console.log(currentUser.email);
      console.log("uid", location.data.uid);

      await ratingRef.set({
        statsID: location.data.uid,
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
      console.log("uid", location.data.uid);

      await ratingRef.set(
        {
          statsID: location.data.uid,
          ratingBy: currentUser.email,
          rating: newRating,
        },
        {
          merge: true,
        }
      );
    }
  };

  const RatingPageHandler = () => {
    setIsRate(true);
  };

  const BackToDetailHandler = () => {
    setIsRate(false);
  };

  const trackDownload = async () => {
    console.log("Click on download");

    const downloadRef = db.collection("csv_downloads").doc();
    await downloadRef.set({
      download_by: currentUser.email,
      download_date: new Date(),
    });
  };

  useEffect(() => {
    if (!location.data) {
      history.push("/search");
    } else {
      console.log("location -> ", location);
      console.log("location data -> ", location.data);
      console.log("csvData data -> ", location.csvData);
      setData(location.data);
      setCsvData(location.csvData);
    }
  }, [history, location]);
  return (
    <Container>
      <Row>
        <Col>
          {data && (
            <Container className="mt-3">
              <Row>
                <Col>
                  {!isRate && (
                    <div style={{ marginBottom: "10px" }}>
                      <CSVLink
                        data={csvData}
                        filename="stats.csv"
                        className="float-right"
                      >
                        <Button onClick={trackDownload}>Download CSV</Button>
                      </CSVLink>
                      <Button onClick={RatingPageHandler}>
                        Rate this image
                      </Button>
                    </div>
                  )}
                  {isRate && (
                    <Button
                      onClick={BackToDetailHandler}
                      style={{ marginBottom: "10px" }}
                    >
                      Back
                    </Button>
                  )}
                  <Card style={{ marginBottom: "4rem" }}>
                    <img
                      src={data.user.fileURL}
                      style={{
                        maxWidth: "100%",
                      }}
                      alt="Faces"
                    />

                    {isRate && (
                      <div>
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
                      </div>
                    )}
                  </Card>
                  {!isRate && (
                    <div>
                      {data && data.score && (
                        <PhotoScore photo_score={data.score} />
                      )}
                      {data && data.labels && (
                        <Labels labels={data.labels.labels_data} />
                      )}
                      {data && data.colors && (
                        <Colors colors={data.colors.colors_data} />
                      )}
                      {data && data.objects && (
                        <Objects objects={data.objects.objects_data} />
                      )}
                      {data && data.faces && (
                        <Faces
                          faces={data.faces.face_data}
                          faces_image_url={data.faces.face_image_url}
                        />
                      )}
                      {data && data.texts && (
                        <Text
                          texts={data.texts.text_data}
                          texts_image_url={data.texts.text_image}
                        />
                      )}
                    </div>
                  )}
                </Col>
              </Row>
            </Container>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Details;
