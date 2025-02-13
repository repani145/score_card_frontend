import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <div className="container-fluid">
        <div className="navbar-brand fw-bold"><Link to={'/'} style={{textDecoration:"None"}}>Simplotel</Link></div>
        <div className="ms-auto">
          <Link to="/signup" className="btn btn-outline-primary me-2">Sign Up</Link>
          <Link to="/login" className="btn btn-primary">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;