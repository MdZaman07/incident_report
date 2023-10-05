import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ShoppingMalls from "./shoppingMalls";
import archive from "./archive";
import "./home.css";

const Home = () => {


  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to the Incident Reporting System</h1>
        <p>Report incidents easily and help maintain safety.</p>
      </header>
      <nav className="navbar">
        <Link to="/form.js" className="nav-link">
          Report an Incident..
        </Link>
        <Link to="/signup.js" className="nav-link">
          Signup
        </Link>
        <Link to="/login.js" className="nav-link">
          Login
        </Link>
        <Link to="/archive.js" className="nav-link">
          Archive
        </Link>
        <Link to="/viewMalls.js" className="nav-link">
          Shopping
        </Link>
     
       
        <div>triallsss</div>
      </nav>
    </div>
  );
};
export default Home;
