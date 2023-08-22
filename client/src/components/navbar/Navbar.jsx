import React, { useEffect, useState } from "react";
import { Container, Navbar, Dropdown, Button } from "react-bootstrap";

import logo from "../../assets/img/logo.png";
import profile from "../../assets/img/profile.png";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function getUser() {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
}

export const Navigation = () => {
  const [user, setUser] = useState(getUser());
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const Logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logout successfully", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  console.log("ini usernya", getUser());

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Navbar expand="lg" className="shadow">
        <Container>
          <Navbar.Brand>
            <img src={logo} alt="" width={"150px"} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <p
              className="d-flex align-items-center text-secondary-emphasis align-items-center fst-italic fw-medium mt-2 me-3"
              style={{ fontSize: "20px" }}
            >
              Selamat Datang
            </p>
            <img
              src={profile}
              width={"50px"}
              height={"50px"}
              className="border border-3 border-secondary rounded-circle object-fit-cover"
              alt="boy"
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
