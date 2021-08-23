import React from "react";
import classes from "./ImgComponent.module.css";

const ImgComponent = ({ image, score, earn }) => {
  return (
    <div className={classes.body}>
      <img src={image} height="100px" weight="100px" alt="imgs" />
      <p>score: {score}</p>
      <p>earn: {earn}</p>
    </div>
  );
};
export default ImgComponent;
