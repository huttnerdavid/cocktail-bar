import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = ({ setLogin, loggedIn }) => {
  return (
    <>
      <nav className="navBar">
        <Link to="/" className="linkElements">
          Home
        </Link>
        <Link to="/cocktails" className="linkElements">
          Search for Cocktail
        </Link>
        {loggedIn ? (
          <Link className="linkElements"
            onClick={() => {
              setLogin("loggedIn", false);
            }}>
            Logout
          </Link>
        ) : (
          <>
            <Link to="/login" className="linkElements">
              Login
            </Link>
            <Link to="/register" className="linkElements">
              Register
            </Link>
          </>
        )}
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
