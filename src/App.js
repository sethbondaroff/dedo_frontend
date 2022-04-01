import { React } from "react";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Routes, Route, Router } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import BookDelivery from "./components/BookDelivery";
import Deliveries from "./components/Deliveries";
import Profile from "./components/Profile";

const App = () => {
  return (
    <div className="App container">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/bookdel" element={<BookDelivery />} />
        <Route path="/yourdel" element={<Deliveries />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
