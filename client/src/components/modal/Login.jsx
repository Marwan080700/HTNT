import React, { useState } from "react";
import { Form, Button, Container, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Slice/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAuthToken } from "../../config/api";

function Login({ show, showLogin }) {
  const handleClose = () => showLogin(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    let userCredintials = {
      email,
      password,
    };

    dispatch(loginUser(userCredintials)).then((result) => {
      if (result.payload) {
        setEmail("");
        setPassword("");
      }
      console.log("ini paylad", result.payload);
    });
    setAuthToken(localStorage.token);
    toast.success("Login successfully", {
      position: "bottom-right",
      autoClose: 3000,
    });
    handleClose();
    console.log("ini payliad", payload);
  };

  return (
    <div>
      <Container>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Body>
            <Form className="w-75 mx-auto" onSubmit={handleLogin}>
              <h3 className="text-center">Login</h3>
              <Form.Group className="mb-3 " controlId="formGroupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </Form.Group>
              <Button
                variant="success"
                type="submit"
                className="w-100 mt-4 mb-3"
              >
                Login
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default Login;
