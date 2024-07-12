import React, { useEffect, useState } from "react";

import CardGroup from "react-bootstrap/CardGroup";

import BookCard from "../components/BookCard";
import { useFirebase } from "../context/Firebase";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  const firebase = useFirebase();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    firebase.listAllBooks().then((books) => setBooks(books.docs));
  }, []);

  return (
    <div className="container mt-5">
      <CardGroup>
        {books.map((book) => (
          <BookCard key={book.id} {...book.data()} id={book.id} />
        ))}
      </CardGroup>
    </div>
  );
};

export default HomePage;
