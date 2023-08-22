import { Form, Button, Container, Modal } from "react-bootstrap";
import { registerUser } from "../../Slice/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register({ show, showRegister }) {
  const handleClose = () => showRegister(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();

  const RegisterUser = async (e) => {
    e.preventDefault();

    const userCredentials = {
      username: form.username,
      email: form.email,
      password: form.password,
    };

    try {
      await dispatch(registerUser(userCredentials));
      toast.success("Register successfully", {
        position: "bottom-right",
        autoClose: 3000,
      });
      handleClose();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  return (
    <>
      <div>
        <Container>
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Body>
              <Form className="w-75 mx-auto" onSubmit={RegisterUser}>
                <h3 className="text-center">Register</h3>
                <Form.Group className="mb-3 " controlId="formGroupEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    onChange={handleChange}
                    placeholder="Enter username"
                  />
                </Form.Group>
                <Form.Group className="mb-3 " controlId="formGroupEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                  />
                </Form.Group>
                <Button
                  variant="success"
                  type="submit"
                  className="w-100 mt-4 mb-3"
                >
                  submit
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </Container>
      </div>
    </>
  );
}
export default Register;
