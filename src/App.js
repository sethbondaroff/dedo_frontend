import { React } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import BookDelivery from "./components/BookDelivery";
import Deliveries from "./components/Deliveries";
import { Paper } from "@mui/material";
import solution from "./images/solution.png";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Driver from "./components/Driver";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/bookdel" element={<BookDelivery />} />
        <Route path="/yourdel" element={<Deliveries />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/driver" element={<Driver />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
