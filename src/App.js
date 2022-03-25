import { React } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Header from "./Header";
import Footer from "./Footer";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
