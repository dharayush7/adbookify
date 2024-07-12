import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import ListedTbody from "../components/ListedTbody";

import { useFirebase } from "../context/Firebase";
import "bootstrap/dist/css/bootstrap.min.css";

const ListedPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [doc, setDoc] = useState(null);

  const listBook = () => {
    firebase.bookList().then((doc) => setDoc(doc.docs));
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-center">
        <h1 className="text">Books List</h1>
      </div>
      <div className="d-flex d-flex justify-content-between">
        <Button variant="primary" onClick={() => listBook()}>
          {" "}
          Refresh{" "}
        </Button>
        <Button variant="success" onClick={() => navigate("/book/list")}>
          {" "}
          Add Book{" "}
        </Button>
      </div>

      {doc ? (
        <div style={{ marginTop: "15px" }}>
          <Table striped>
            <thead>
              <tr>
                <th>NO.</th>
                <th>Images</th>
                <th>Book Name</th>
                <th>ISBN NO</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {doc.map((book, index) => (
                <ListedTbody
                  {...book.data()}
                  index={index}
                  key={book.id}
                  id={book.id}
                />
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <h2>No Book to Show</h2>
        </div>
      )}
    </div>
  );
};

export default ListedPage;
