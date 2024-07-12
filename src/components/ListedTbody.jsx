import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";

import { useFirebase } from "../context/Firebase";
import "bootstrap/dist/css/bootstrap.min.css";

const ListedTbody = (props) => {
  console.log(props);

  const firebase = useFirebase();
  const navigate = useNavigate();
  const [url, setURL] = useState(null);

  useEffect(() => {
    firebase.getImageUrl(props.imageUrl).then((url) => setURL(url));
  });

  return (
    <tr>
      <td>{props.index + 1}</td>
      <td>
        <img src={url} alt="book" style={{ width: "100px" }} />
      </td>
      <td>{props.name}</td>
      <td>{props.isbn}</td>
      <td>
        <span> &#36;</span>
        {props.price}.00
      </td>
      <td>
        <div className="container">
          <Button
            variant="primary"
            style={{ marginRight: "10px" }}
            onClick={() => navigate(`/book/orders/${props.id}`)}
          >
            Orders
          </Button>
          <Button variant="danger">UnList</Button>
        </div>
      </td>
    </tr>
  );
};

export default ListedTbody;
