import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";

import { useFirebase } from "../context/Firebase";

import google from "../images/google.png";
import "bootstrap/dist/css/bootstrap.min.css";

const RegisterPage = () => {
  const [validated, setValidated] = useState(false);
  const [fromValid, setValid] = useState(false);
  const [isShow1, setShow1] = useState(false);
  const [val1, setVal1] = useState("Show");
  const [type1, setType1] = useState("password");
  const [isShow2, setShow2] = useState(false);
  const [val2, setVal2] = useState("Show");
  const [type2, setType2] = useState("password");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [passVarification, setPassVerification] = useState(true);
  const [passVarification2, setPassVerification2] = useState(false);
  const [email, setEmail] = useState("");
  const [otpValided, setOtpValided] = useState(false);
  const [otpValid, setOtpValid] = useState(true);
  const [inpOtp, setInpOtp] = useState("");


  const firebase = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase, navigate]);

  useEffect(() => {
    if (isShow1 === true) {
      setVal1("Hide");
      setType1("text");
    } else {
      setVal1("Show");
      setType1("password");
    }
  }, [isShow1]);

  useEffect(() => {
    if (isShow2 === true) {
      setVal2("Hide");
      setType2("text");
    } else {
      setVal2("Show");
      setType2("password");
    }
  }, [isShow2]);

  const toggel1 = () => {
    setShow1(!isShow1);
  };

  const toggel2 = () => {
    setShow2(!isShow2);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setValid(true);
      verification();
    }
    event.preventDefault();
    setValidated(true);
  };



  const verification = async () => {
    if (fromValid === true) {
      if (pass1 === pass2) {
        setPassVerification(true);
        await firebase.singnupUserWithEmailAndPassword(email, pass1);

        setPassVerification2(false);
      } else {
        setPassVerification(false);
      }
    }
  };

  const otpHandleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      if (inpOtp === "000000") {
        setOtpValid(true);
        await firebase.singnupUserWithEmailAndPassword(email, pass1);

      } else {
        setOtpValid(false);
      }
    }
    
    setOtpValided(true);
  };

  return (
    <div className="container mt-5">
      {passVarification ? (
        <></>
      ) : (
        <Alert key="danger" variant="danger">
          Password not matched
        </Alert>
      )}

      {otpValid ? (
        <></>
      ) : (
        <Alert key="danger" variant="danger">
          OTP Incorrect
        </Alert>
      )}

      <div className="d-flex justify-content-center">
        <h1>Create Account</h1>
      </div>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <div className="container-fluid mb-5">
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="abc@exmaple.com"
                required
              />
              <Form.Control.Feedback type="invalid" tooltip>
                Enter a email
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </div>

        <div className="container-fluid mb-5">
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type={type1}
                placeholder="*********"
                name="password1"
                onChange={(e) => setPass1(e.target.value)}
                value={pass1}
                required
              />
              <Form.Control.Feedback type="invalid" tooltip>
                Create a Password
              </Form.Control.Feedback>
              <InputGroup.Text>
                <p
                  style={{ margin: "0", padding: "0", cursor: "pointer" }}
                  onClick={() => toggel1()}
                >
                  {val1}
                </p>
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </div>

        <div className="container-fluid mb-5">
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type={type2}
                placeholder="*********"
                name="password2"
                onChange={(e) => setPass2(e.target.value)}
                value={pass2}
                required
              />
              <Form.Control.Feedback type="invalid" tooltip>
                ReEnter Password
              </Form.Control.Feedback>
              <InputGroup.Text>
                <p
                  style={{ margin: "0", padding: "0", cursor: "pointer" }}
                  onClick={() => toggel2()}
                >
                  {val2}
                </p>
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </div>
        <div className="d-flex justify-content-center">
          <Button variant="success" type="submit">
            Get Varification Code
          </Button>
        </div>
      </Form>
      <hr />

      {passVarification2 ? (
        <div>
          <div className="d-flex justify-content-center">
            <h4>OTP Sent on {email}</h4>
          </div>

          <Form noValidate validated={otpValided} onSubmit={otpHandleSubmit}>
            <div className="container-fluid mb-5">
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Enter OTP</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    name="otp"
                    placeholder="000000"
                    onChange={(e) => setInpOtp(e.target.value)}
                    value={inpOtp}
                    required
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    Enter 6 Digits OTP
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </div>

            <div className="container-fluid mb-5">
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Full Name</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="John Milar"
                    required
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    Enter Your Name
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </div>
            <div className="d-flex justify-content-center">
              <Button variant="success" type="submit">
                Verify
              </Button>
            </div>
          </Form>
        </div>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <p className="fs-2 text">OR</p>
          <img
            className="shadow p-3 mb-5 mt-4 bg-body-tertiary rounded"
            src={google}
            alt=""
            onClick={() => firebase.signinWithGoogle()}
            style={{ width: "200px", hight: "auto", cursor: "pointer" }}
          />
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
