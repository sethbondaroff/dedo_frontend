import { React } from "react";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Routes, Route, Router } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import BookDelivery from "./components/BookDelivery";
import Deliveries from "./components/Deliveries";
import { Paper } from "@mui/material";
import solution from "./images/solution.png";
import Driver from "./components/Driver";
import Refresh from "./components/Refresh";

const App = () => {
  return (
    <div className="App container">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/bookdel" element={<BookDelivery />} />
        <Route path="/yourdel" element={<Deliveries />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/driver" element={<Driver />} />
        <Route path="/refresh" element={<Refresh />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
