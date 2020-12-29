import React from "react";
import { Link, NavLink } from "react-router-dom";
const Navbar = ({ user }) => {
  return (
    <nav 
      className="navbar navbar-expand-lg navbar-dark bg-dark"
    style={{ marginBottom: "100px" }}
    >
      <Link style={{color:"yellow"}} className="navbar-brand" to="/">
        Ali Shan
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink style={{color:"yellow"}} className="nav-item nav-link" to="/movies">
            Movies
          </NavLink>
          <NavLink style={{color:"yellow"}} className="nav-item nav-link" to="/customer">
            Customers
          </NavLink>
          <NavLink  style={{color:"yellow"}} className="nav-item nav-link" to="/rentals">
            Rentals
          </NavLink>

          {!user && (
            <React.Fragment>
              <NavLink style={{color:"yellow"}} className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink style={{color:"yellow"}} className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/profile">
                {user.name}
              </NavLink>
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
