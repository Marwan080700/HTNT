import React, { useEffect, useState } from "react";
import { Container, Navbar, Dropdown, Button } from "react-bootstrap";

import logo from "../../assets/img/logo.png";
import profile from "../../assets/img/profile.png";
import logout from "../../assets/img/logout.png";

import Register from "../modal/register";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "../modal/Login";

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
          <Navbar.Brand href="#home">
            <img src={logo} alt="" width={"150px"} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            {user ? (
              <>
                <Dropdown>
                  <Dropdown.Toggle
                    className="d-flex align-items-center gap-2 fs-4 fw-bold border-0 text-black"
                    style={{ backgroundColor: "white" }}
                    id="dropdown-basic"
                  >
                    <p
                      className="d-flex align-items-center text-secondary-emphasis align-items-center fst-italic fw-medium mt-2"
                      style={{ fontSize: "20px" }}
                    >
                      Selamat Datang, {user?.data?.data?.user?.username}
                    </p>
                    <img
                      src={profile}
                      width={"50px"}
                      height={"50px"}
                      className="border border-3 border-secondary rounded-circle object-fit-cover"
                      alt="boy"
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    style={{ width: "17rem", height: "5rem" }}
                    onClick={Logout}
                  >
                    <div
                      className="d-flex align-items-center ps-4 gap-3"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={logout}
                        className="object-fit-cover"
                        alt="logout"
                        width={"30px"}
                        height={"30px"}
                      />
                      <p
                        className="mt-3 fw-medium"
                        style={{ fontSize: "20px" }}
                      >
                        Logout
                      </p>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <div className="d-flex gap-2">
                  <Button
                    className="bg-success border-0"
                    style={{ width: "100px" }}
                    onClick={() => setShowLogin(true)}
                  >
                    Login
                  </Button>
                  <Button
                    variant="outline-success"
                    style={{ width: "100px" }}
                    onClick={() => setShowRegister(true)}
                  >
                    Register
                  </Button>
                </div>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Login show={showLogin} showLogin={setShowLogin} />
      <Register show={showRegister} showRegister={setShowRegister} />
    </div>
  );
};

export default Navigation;
