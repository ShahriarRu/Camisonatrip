import React from "react";
import classes from "./OnboardingScreen.module.css";
import { Link } from "react-router-dom";

const OnboardingScreen = ({ image, alt, subtext, maintext }) => {
  return (
    <div className={classes.con}>
      <img src={image} alt={alt} />
      <h2>{maintext}</h2>
      <p>{subtext}</p>
      {alt === "third" && (
        <div className={classes.btns}>
          <Link to="/login"><button className={classes.login}>Login</button></Link>
          <Link to="/signup"><button className={classes.signup}>Sign Up</button></Link>
        </div>
      )}
    </div>
  );
};

export default OnboardingScreen;
