import { Routes, Route } from "react-router-dom";

import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ListingPage from "./pages/List";
import HomePage from "./pages/Home";
import BookDetailPage from "./pages/Detail";
import OrderPage from "./pages/Orders";
import ListedPage from "./pages/Listed";

import ADNav from "./components/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <div>
      <ADNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/book/list" element={<ListingPage />} />
        <Route path="/book/view/:bookId" element={<BookDetailPage />} />
        <Route path="/book/orders/:bookId" element={<OrderPage />} />
        <Route path="/book/listed" element={<ListedPage />} />
      </Routes>
    </div>
  );
}

export default App;
