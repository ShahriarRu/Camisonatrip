import React, { useEffect } from "react";
import Labels from "./Labels";
import Colors from "./Colors";
import Faces from "./Faces";
import Objects from "./Objects";
import PhotoScoring from "./PhotoScoring";
import Text from "./Text";

import { connect } from "react-redux";

const Stats = ({ texts, labels, faces, objects, photo_score, colors }) => {
  useEffect(() => {
    console.log("Texts are", texts);
  }, [texts]);
  useEffect(() => {
    console.log("Labels are", labels);
  }, [labels]);
  useEffect(() => {
    console.log("Faces are", faces);
  }, [faces]);
  useEffect(() => {
    console.log("Objects are", objects);
  }, [objects]);
  useEffect(() => {
    console.log("photo score are", photo_score);
  }, [photo_score]);
  useEffect(() => {
    console.log("Colors are", colors);
  }, [colors]);

  return (
    <div>
      {texts.length !== 0 ||
      labels.length !== 0 ||
      faces.length !== 0 ||
      objects.length !== 0 ||
      colors.length !== 0 ||
      photo_score !== "" ? (
        <>
          <PhotoScoring />
          <Labels />
          <Colors />
          <Objects />
          <Faces />
          <Text />
        </>
      ) : (
        <>
          <div>
            {/* <h1 className="text-center">Upload an image to see the Magic</h1> */}
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = ({ stats }) => {
  const { texts, labels, faces, objects, photo_score, colors } = stats;
  return {
    texts,
    labels,
    faces,
    objects,
    photo_score,
    colors,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
