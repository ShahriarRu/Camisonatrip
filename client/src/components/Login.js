import React, { useRef, useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
 
import app from "../firebase";
const db = app.firestore();

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const userTypeRef = useRef();

  const history = useHistory();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");

  const checkSingupComplete = async () => {
    let results = [];
    const userRef = db.collection("users");
    const response = await userRef
      .where("email", "==", emailRef.current.value)
      .limit(1)
      .get();
    response.forEach((r) => {
      console.log(r.data());
      results.push(Object.assign({ uid: r.id }, r.data()));
    });

    let data = results[0];

    if (data.user_type) {
      console.log("singup complete");
      history.push("/");
    } else {
      console.log("singup is not complete");
      setEmail(data.email);
      setUid(data.uid);
      setStep(2);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      checkSingupComplete();
      // history.push("/");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  async function saveUser(user_type) {
    const userRef = db.collection("users").doc(uid);
    console.log("user ref is", uid);
    await userRef.set({
      id: uid,
      email,
      user_type,
    });
  }
  // step 2
  async function handleRole(e) {
    e.preventDefault();

    console.log("Role value", userTypeRef.current.value);
    console.log("email value", email);

    // email, uid, and user_type
    try {
      await saveUser(userTypeRef.current.value);
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
                  <h2 className="text-center mb-4">Log In</h2>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        ref={passwordRef}
                        required
                      />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">
                      Log In
                    </Button>
                  </Form>
                  <div className="w-100 text-center mt-3">
                    <Link to="/forgot-password">Forgot Password?</Link>
                  </div>
                </Card.Body>
              </Card>
              <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign Up</Link>
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
