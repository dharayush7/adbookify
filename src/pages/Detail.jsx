import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useFirebase } from "../context/Firebase";
import "bootstrap/dist/css/bootstrap.min.css";

const BookDetailPage = () => {
  const params = useParams();
  const firebase = useFirebase();

  const [data, setData] = useState(null);
  const [url, setURL] = useState(null);
  const [qyt, setQyt] = useState(1);

  useEffect(() => {
    firebase.getBookById(params.bookId).then((doc) => setData(doc.data()));
  }, []);

  useEffect(() => {
    if (data) {
      const imageURL = data.imageUrl;
      firebase.getImageUrl(imageURL).then((url) => setURL(url));
    }
  }, [data]);

  const placeOrder = async () => {
    const result = await firebase.placeOrder(params.bookId, qyt);
    console.log(result);
  };

  if (data === null) return <h1>Loading...</h1>;

  return (
    <div className="container d-flex mt-3 justify-content-around">
      <div className="d-flex flex-column">
        <img src={url} alt="Book" style={{ width: "250px" }} />
        <div style={{ marginTop: "15px" }}>
          <Form.Label>Quantity</Form.Label>
          <Form.Select
            aria-label="QuanTity"
            onChange={(e) => setQyt(parseInt(e.target.value))}
          >
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </div>
        <Button
          variant="warning"
          style={{ marginTop: "15px" }}
          onClick={() => placeOrder()}
        >
          Buy
        </Button>
      </div>
      <div className="conatiner mt-3">
        <h1>{data.name}</h1>
        <h2 className="text" style={{ marginTop: "50px" }}>
          Details:
        </h2>
        <p className="fs-4 text" style={{ marginTop: "15px" }}>
          <b>ISBN No. :</b> {data.isbn}
        </p>

        <p className="fs-3 text" s>
          <b>Price: </b>
          <span>&#36;</span>
          {data.price}.00
        </p>

        <h2 style={{ marginTop: "40px" }}>Owner Details:</h2>
        <div className="d-flex mt-3 align-items-center ml-3">
          <img
            src={data.photoURL}
            alt="owner"
            style={{
              width: "100px",
              height: "auto",
              borderRadius: "50px",
            }}
          />
          <div
            className="d-flex flex-column justify-content-center align-items-center "
            style={{ marginLeft: "20px" }}
          >
            <p className="fs-3 text" style={{ margin: "0", padding: "0" }}>
              {data.displayName}
            </p>
            <p className="fs-5 text" style={{ margin: "0", padding: "0" }}>
              <b>Contact Email:</b>{" "}
              <a
                href={`mailto:${data.userEmail}`}
                target="_blank"
                rel="noreferrer"
              >
                {data.userEmail}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
