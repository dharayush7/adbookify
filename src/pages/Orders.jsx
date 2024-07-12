import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useFirebase } from "../context/Firebase";
import OrdersTbody from "../components/OrdersTbody";

import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderPage = () => {
  const firebase = useFirebase();
  const params = useParams();

  const [data, setData] = useState(null);
  const [book, setBook] = useState(null);
  useEffect(() => {
    firebase.bookOrdersList(params.bookId).then((data) => setData(data.docs));
    firebase.getBookById(params.bookId).then((book) => setBook(book.data()));
  }, []);

  if (data === null) return <h1>No Order To Show</h1>;
  if (firebase.user?.uid !== book?.userId)
    return <h1>No permission to view</h1>;

  return (
    <div className="container">
      <div className="container-fluid d-flex justify-content-center mt-3">
        <h1>{book.name}</h1>
      </div>
      <div style={{ marginTop: "10px" }}>
        <Table striped>
          <thead>
            <tr>
              <th>NO.</th>
              <th>Order Id</th>
              <th>Customer Name</th>
              <th>Customer Email</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <OrdersTbody
                {...data.data()}
                index={index}
                id={data.id}
                key={data.id}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default OrderPage;
