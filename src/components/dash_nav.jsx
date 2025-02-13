import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../customHooks/user_auth";

const DashNavbar = () => {
    const {logout} = useAuth();
  return (
    <nav className="navbar navbar-expand-lg   px-4" style={{backgroundColor:"#25527f"}}>
      <div className="container-fluid">
        <div className="navbar-brand fw-bold"><Link to={'/'} style={{color:"orange",textDecoration:"None"}}>Simplotel</Link></div>
        <div className="ms-auto">
          {/* <Link to="/signup" className="btn btn-outline-primary me-2">Sign Up</Link> */}
          <Link to="/login" className="btn btn-primary"  onClick={logout}>Logout</Link>
        </div>
      </div>
    </nav>
  );
};

export default DashNavbar;