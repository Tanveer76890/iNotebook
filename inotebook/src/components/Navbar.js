import React from "react";
import { NavLink,Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
    const handleLogout = ()=>{
      localStorage.removeItem("token");
      navigate("/login"); 
    }

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light py-1 text-black shadow"
        style={{ backgroundColor: "rgb(182 231 181)" }}
      >
        <div className="container-fluid ">
          <Link className="navbar-brand fs-3 fw-bold mx-3" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0  ">
              <li className="nav-item  px-2">
                <NavLink
                  className="nav-link fs-4 text-dark "
                  aria-current="page"
                  to="/"
                >  Home</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link fs-4 text-dark" to="/about">
                  About
                </NavLink>
              </li>
            </ul>

            {!localStorage.getItem("token") ?
            <form className="d-flex">
              <NavLink className="btn btn-success mx-1" to="/login" role="button">login</NavLink>
              <NavLink className="btn btn-success mx-1" to="/signup" role="button">Register</NavLink>
            </form> : <button onClick={handleLogout} className="btn btn-outline-danger">logout</button> }
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
