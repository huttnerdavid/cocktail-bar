import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const SearchCocktailsPage = () => {
  return (
    <>
      <nav className="cocktailNav">
        <Link to="/cocktails/byingredient" className="linkElements">
          Search by Ingredient
        </Link>
        <Link to="/cocktails/byletter" className="linkElements">
          Search by first letter
        </Link>
        <Link to="/cocktails/byname" className="linkElements">
          Search by full name
        </Link>
      </nav>
      <Outlet />
    </>
  );
};

export default SearchCocktailsPage;