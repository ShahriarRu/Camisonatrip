import React, { useEffect, useState } from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { useHistory, NavLink } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

function NavbarComponent() {
  const { logout, getUserDetails } = useAuth();
  const [, setError] = useState("");
  const history = useHistory();

  const [userType, setUserType] = useState("");

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  function handleProfile() {
    history.push("/update-profile");
  }

  useEffect(async () => {
    let type = await getUserDetails();
    setUserType(type);
  }, []);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Nav>
        <NavLink
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            marginRight: "14px",
            fontSize: "24px",
            fontWeight: "bolder",
          }}
        >
          Camisonatrip
        </NavLink>
      </Nav>
      {userType === "photographer" && (
        <Nav className="mr-auto">
          <NavLink to="/rating">
            <Button
              variant="outline-light"
              // style={{
              //   width: "100px",
              // }}
            >
              Rating
            </Button>
          </NavLink>
        </Nav>
      )}

      {userType === "business" && (
        <Nav className="mr-auto">
          <NavLink to="/search">
            <Button
              variant="outline-light"
              // style={{
              //   width: "100px",
              // }}
            >
              Search
            </Button>
          </NavLink>
        </Nav>
      )}

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse
        id="basic-navbar-nav"
        style={{
          justifyContent: "flex-end",
        }}
      >
        <Form className="mr-3" inline>
          {userType === "business" && (
            <Nav className="mr-auto">
              <NavLink to="/business-dashboard">
                <Button variant="outline-light" className="mr-3 float-right">
                  Dashboard
                </Button>
              </NavLink>
            </Nav>
          )}
          {userType === "photographer" && (
            <Nav className="mr-auto">
              <NavLink to="/photographer-dashboard">
                <Button className="mr-3 float-right" variant="outline-light">
                  Dashboard
                </Button>
              </NavLink>
            </Nav>
          )}
          <Button
            variant="outline-light"
            className="mr-3 float-right"
            onClick={handleProfile}
          >
            Update Profile
          </Button>
          <Button
            className="float-right"
            variant="outline-light"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
