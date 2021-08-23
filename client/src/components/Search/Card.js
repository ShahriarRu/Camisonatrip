import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

const CardComponent = ({ data }) => {
  const history = useHistory();
  const [csvData, setCsvData] = useState([]);

  const cleanData = () => {
    console.log('I am data', data);
    let cleaned = [];
    let cleanedData = {
      user: data.user.email,
      image: data.user.fileURL,
      colors: data.colors ? data.colors.colors_search : "",
      face_image: data.faces ? data.faces.face_image_url : "",
      faces: data.faces ? data.faces.face_search : "",
      labels: data.labels.labels_search,
      objects: data.objects ? data.objects.objects_search : "",
      score: data.score? data.score.quality.score : "",
      text: data.texts ? data.texts.texts : "",
      text_image: data.texts ? data.texts.text_image : "",
    };

    cleaned.push(cleanedData);
    setCsvData(cleaned);
  };

  useEffect(() => {
    cleanData();
  }, [data]);

  const seeDetails = () => {
    history.push({
      pathname: "/details",
      data,
      csvData,
    });
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
            {"  "}
            <span>{data.user.email}</span>
          </Card.Text>

          <Button variant="primary" onClick={seeDetails}>
            See More Details
          </Button>
        </Card.Body>
      </Card>
      {/* <img src={data.face_image_url} alt="Image" /> */}
    </div>
  );
};

export default CardComponent;
