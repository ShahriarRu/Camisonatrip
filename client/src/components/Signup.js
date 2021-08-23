import React, { useRef, useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

// import db
import app from "../firebase";
const db = app.firestore();

export default function Signup() {
  // step 1
  // const emailRef = useRef();

  // email
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");

  // password
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  // step 2
  const userTypeRef = useRef();

  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState(1);
  const history = useHistory();

  async function saveUser(uid, user_type) {
    if (user_type) {
      const userRef = db.collection("users").doc(uid);
      console.log("user ref is", uid);
      await userRef.set(
        {
          id: uid,
          email,
          user_type,
        },
        {
          merge: true,
        }
      );
    } else {
      const userRef = db.collection("users").doc(uid);
      console.log("user ref is", uid);
      await userRef.set(
        {
          id: uid,
          email,
        },
        {
          merge: true,
        }
      );
    }
  }

  // step 1
  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);

      const {
        user: { uid },
      } = await signup(email, passwordRef.current.value);

      await saveUser(uid, "");

      // set the UID for step 2 use
      setUid(uid);
      // step to 2
      setStep(2);

      // previous code
      // history.push("/");
    } catch (e) {
      // setError("Failed to create an account");
      console.log(e);
      if (e.code === "auth/weak-password") {
        setError(e.message);
      } else if (e.code === "auth/email-already-in-use") {
        setError(e.message);
      } else {
        setError(e.message);
      }
    }
    setLoading(false);
  }

  // step 2

  async function handleRole(e) {
    e.preventDefault();
    console.log("Role value", userTypeRef.current.value);
    console.log("email value", email);

    // email, uid, and user_type
    try {
      await saveUser(uid, userTypeRef.current.value);
      history.push("/");
    } catch (error) {
      console.log("Error while saving userType", error);
    }
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          {/* step 1 */}
          {step === 1 && (
            <>
              <Card>
                <Card.Body>
                  <h2 className="text-center mb-4">Sign Up</h2>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group id="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        ref={passwordRef}
                        required
                      />
                    </Form.Group>
                    <Form.Group id="password-confirm">
                      <Form.Label>Password Confirmation</Form.Label>
                      <Form.Control
                        type="password"
                        ref={passwordConfirmRef}
                        required
                      />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">
                      Sign Up
                    </Button>
                  </Form>
                </Card.Body>
              </Card>

              <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log In</Link>
              </div>
            </>
          )}

          {/* step 2 */}
          {step === 2 && (
            <>
              <Card>
                <Card.Body>
                  <h2 className="text-center mb-4">Role</h2>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form onSubmit={handleRole}>
                    {/* user type */}

                    <Form.Group>
                      <Form.Label>How do you want to join as?</Form.Label>
                      <Form.Control
                        as="select"
                        type="select"
                        ref={userTypeRef}
                        required
                      >
                        <option value="photographer">Photographer</option>
                        <option value="business">Business</option>
                      </Form.Control>
                    </Form.Group>
                    {/* <Form.Group id="user_type">
                      <Form.Label>User Type</Form.Label>
                      <Form.Control type="text" ref={userTypeRef} required />
                    </Form.Group> */}
                    {/* submit */}
                    <Button disabled={loading} className="w-100" type="submit">
                      Sign Up
                    </Button>
                  </Form>
                </Card.Body>
              </Card>

              <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log In</Link>
              </div>
            </>
          )}
        </div>
      </Container>
    </>
  );
}
