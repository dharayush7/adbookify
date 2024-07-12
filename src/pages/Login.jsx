import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";

import { useFirebase } from "../context/Firebase";
import logo from "../images/google.png";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  const [validated, setValidated] = useState(false);
  const [isShow, setShow] = useState(false);
  const [val, setVal] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  const firebase = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase, navigate]);

  useEffect(() => {
    if (isShow === false) {
      setVal("Show");
      setType("password");
    } else {
      setVal("hide");
      setType("text");
    }
  }, [isShow]);

  const toggel = () => {
    setShow(!isShow);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      await firebase
        .singinUserEmailAndPass(email, pass)
        .then(() => setError(false))
        .catch(() => setError(true));
      console.log(error);
    }

    setValidated(true);
  };

  return (
    <div className="container mt-5">
      {error ? (
        <Alert key="danger" variant="danger">
          Wrong Email or Password
        </Alert>
      ) : (
        <></>
      )}

      <div className="d-flex justify-content-center">
        <h1>Log in</h1>
      </div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <div className="container-fluid mb-5">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="email"
                name="email"
                placeholder="abc@exmaple.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <Form.Control.Feedback type="invalid" tooltip>
                Enter a email
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </div>

        <div className="container-fluid mb-4">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type={type}
                name="password"
                placeholder="*************"
                onChange={(e) => setPass(e.target.value)}
                value={pass}
                required
              />
              <Form.Control.Feedback type="invalid" tooltip>
                Enter your Password
              </Form.Control.Feedback>
              <InputGroup.Text>
                <p
                  style={{ margin: "0", padding: "0", cursor: "pointer" }}
                  onClick={() => toggel()}
                >
                  {val}
                </p>
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </div>

        <div className="d-flex justify-content-center">
          <Button variant="success" type="submit">
            Log In
          </Button>
        </div>
      </Form>

      <hr />

      <div className="d-flex  flex-column justify-content-center align-items-center ">
        <p className="fs-2 text">OR</p>
        <img
          className="shadow p-3 mb-5 mt-4 bg-body-tertiary rounded"
          src={logo}
          alt=""
          onClick={() => firebase.signinWithGoogle()}
          style={{ width: "200px", hight: "auto", cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default LoginPage;
