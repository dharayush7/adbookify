import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { useFirebase } from "../context/Firebase";
import "bootstrap/dist/css/bootstrap.min.css";

const ListingPage = () => {
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [ISBN, setISBN] = useState("");
  const [price, setPrice] = useState();
  const [coverPic, setCoverPic] = useState("");

  const firebase = useFirebase();

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
    } else {
      await firebase.handleCreateNewListing(name, ISBN, price, coverPic);
    }
    setValidated(true);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center mt-3">
        <h1>List a Book</h1>
      </div>
      <div className="container">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div className="container-fluid mb-5">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Book Name</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  name="text"
                  placeholder="Harry Potter and the Philosopher's Stone"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  Please provide name of your book
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </div>
          <div className="container-fluid mb-5">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>ISBN</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  name="text"
                  placeholder="ISBN 0-061-96436-0"
                  onChange={(e) => setISBN(e.target.value)}
                  value={ISBN}
                  required
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  Please provide a valid ISBN number of the book
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </div>
          <div className="container-fluid mb-5">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Price</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="number"
                  name="number"
                  placeholder="99909"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  required
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  Please provide price of the book
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </div>
          <div className="container-fluid mb-5">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Cover Pic</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="file"
                  name="coverPic"
                  placeholder="99909"
                  onChange={(e) => setCoverPic(e.target.files[0])}
                  required
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  Please choose a image of the book
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </div>

          <div className="d-flex justify-content-center">
            <Button variant="success" type="submit">
              Create
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ListingPage;
