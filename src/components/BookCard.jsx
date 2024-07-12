import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { useFirebase } from "../context/Firebase";

const BookCard = (props) => {
  const [url, setUrl] = useState(null);
  const firebase = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    firebase.getImageUrl(props.imageUrl).then((url) => setUrl(url));
  }, []);

  return (
    <Card
      style={{
        width: "100px",
        margin: "25px",
        padding: "10px 10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card.Img
        variant="top"
        src={url}
        style={{ width: "120px", height: "auto" }}
      />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          This Book is sold by {props.displayName} and price of this book is $
          {props.price}.
        </Card.Text>
        <Button
          variant="primary"
          onClick={() => navigate(`/book/view/${props.id}`)}
        >
          View
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
