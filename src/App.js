import { React } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Header from "./Header";
import Footer from "./Footer";
import BookDelivery from "./components/BookDelivery";
import Deliveries from "./components/Deliveries";
import { Paper } from "@mui/material";
import solution from "./images/solution.png";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/bookdel" element={<BookDelivery />} />
        <Route path="/yourdel" element={<Deliveries />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
