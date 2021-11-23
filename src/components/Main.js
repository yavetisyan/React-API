import Home from "./Home";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import About from "./About";
import BreedList from "./BreedLists";
import Contact from "./Contact";

export default function Main() {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Link to="/Home" style={{ margin: 10 }}>
          Home
        </Link>
        <Link to="/About" style={{ margin: 10 }}>
          About
        </Link>
        <Link to="/Contact" style={{ margin: 10 }}>
          Contact
        </Link>
      </div>
      <Routes>
        <Route path="/" />
        <Route index element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/asdasd" element={<div>asdasd</div>} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>

      {/*<BreedList />*/}
    </div>
  );
}
