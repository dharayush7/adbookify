import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

const OrdersTbody = (props) => {
  return (
    <tr>
      <td>{props.index + 1}</td>
      <td>{props.id}</td>
      <td>{props.displayName}</td>
      <td>{props.userEmail}</td>
      <td>{props.quantity}</td>
    </tr>
  );
};

export default OrdersTbody;
