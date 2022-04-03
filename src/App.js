import { React, useState, useEffect } from "react";
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
import Profile from "./components/Profile";
import SetCurrentLocation from "./components/SetCurrentLocation";
import Map from "./components/Map";

const App = () => {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);

  useEffect(() => {
    console.log(
      `Source: [${source[0]}, ${source[1]}], Dest: [${destination[0]}, ${destination[1]}]`
    );
  }, [source, destination]);

  return (
    <div className="App container">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/bookdel" element={<BookDelivery />} />
        <Route path="/yourdel" element={<Deliveries />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/driver" element={<Driver />} />
        <Route path="/refresh" element={<Refresh />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/setcurrlocation" element={<SetCurrentLocation />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/map-test"
          element={
            <Map setSourceCoords={setSource} setDestCoords={setDestination} />
          }
        />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
