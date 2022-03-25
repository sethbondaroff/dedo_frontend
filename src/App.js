import { React } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Header from "./Header";
import Footer from "./Footer";
import BookDelivery from "./components/BookDelivery";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/bookdel" element={<BookDelivery />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
