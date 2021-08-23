import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import firebase from "firebase/app";
import "firebase/auth";

import ImageUploader from "./Uploader/ImageUpload";
import Stats from "./Stats";

import { connect } from "react-redux";
import { getProperties, loading } from "../redux/stats/actions";

import classes from './Dashboard.module.css';


const Dashboard = (props) => {
  // just for testing
  // const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [userID, setUserID] = useState("");

  // console.log("props in dashboard", props);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserID(user.uid);
        setEmail(user.email);
      } else {
      }
    });
  });

  useEffect(() => {}, []);

  // Private route, only seen to registered users
  return (
    <>
      {/* <Navbar /> */}
      <Container>
        <Row>
          <Col >
          <div className={classes.clm}>
            <div className={classes.btns}>
              <button className={classes.rating}>Rating</button>
              <Link to="/update-profile"><button className={classes.updateProfile}>Update Profile</button></Link>
              <button className={classes.logout}>Logout</button>
            </div>
            <ImageUploader uid={userID} email={email} />
            </div>
          </Col>
        </Row>
      </Container>

      {/* <h1>Testing image</h1>
      <img src={image} alt="No image found" /> */}

      <Container className="mt-3">
        <Row>
          <Col>
            <Stats />
          </Col>
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = ({ stats }) => {
  const { properties, loading } = stats;
  return { properties, loading };
};

export default connect(mapStateToProps, {
  getPropertiesAction: getProperties,
  loadingAction: loading,
})(Dashboard);
