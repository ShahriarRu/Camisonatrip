import React from 'react';
import classes from './SplashScreen.module.css';
import image from './first.svg';
const SplashScreen = () => {

    return (
      <div className={classes.con}>
      <img src={image} alt='photo-camera'/>
      <h1>CONVPHO</h1>
      </div>
    )
};

export default SplashScreen;