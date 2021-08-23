import React, { useEffect, useState } from "react";
import OnboardingScreen from "../Onboarding/OnboardingScreen";
import Splash from "../splash/SplashScreen";
import { Button } from "react-bootstrap";
import classes from "./index.module.css";
import { Link } from "react-router-dom";

import image1 from "./first.svg";
import image2 from "./second.svg";
import image3 from "./third.svg";

const maintext1 = "Submit Your Photo";
const subtext1 =
  "It is a long established fact that a reader will be distracted by the readable content";
const maintext2 = "Rate others Photo";
const subtext2 =
  "It is a long established fact that a reader will be distracted by the readable content";
const maintext3 = "Organize Your Dashboard";
const subtext3 =
  "It is a long established fact that a reader will be distracted by the readable content";

const LoginFlow = () => {
  const [onboarding, setOnboarding] = useState("1");
  const [isSplash, setIsSplash] = useState(true);

  const onChangeValue = (event) => {
    setOnboarding(event.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const onboardingChangeHandler = () => {
    if (onboarding === "1") {
      setOnboarding("2");
    } else {
      setOnboarding("3");
    }
  };

  return (
    <div>
      {isSplash && (
        <div>
          <Splash />
        </div>
      )}
      {!isSplash && (
        <div>
          <div className={classes.mainbody}>
            {onboarding === "1" && (
              <OnboardingScreen
                image={image1}
                subtext={subtext1}
                maintext={maintext1}
                alt="first"
              />
            )}
            {onboarding === "2" && (
              <OnboardingScreen
                image={image2}
                subtext={subtext2}
                maintext={maintext2}
                alt="second"
              />
            )}
            {onboarding === "3" && (
              <OnboardingScreen
                image={image3}
                subtext={subtext3}
                maintext={maintext3}
                alt="third"
              />
            )}
          </div>
          <div className={classes.footer}>
            <Link to="/login">
              <Button>SKIP</Button>
            </Link>
            <div>
              <input
                className={classes.slide}
                checked={onboarding === "1"}
                value="1"
                type="radio"
                onChange={onChangeValue}
              />
              <input
                className={classes.slide}
                checked={onboarding === "2"}
                value="2"
                type="radio"
                onChange={onChangeValue}
              />
              <input
                className={classes.slide}
                checked={onboarding === "3"}
                value="3"
                type="radio"
                onChange={onChangeValue}
              />
            </div>
            {onboarding === "3" && (
              <Link to="/login">
                <Button>NEXT</Button>
              </Link>
            )}
            {onboarding !== "3" && (
              <Button onClick={onboardingChangeHandler}>NEXT</Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginFlow;
