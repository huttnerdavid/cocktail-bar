import React, { useState } from "react";
import axios from "axios";
import CocktailDetailed from "../Components/CocktailDetailed";

const Home = () => {
  const [cocktail, setCocktail] = useState("");

  let randomCocktail = async () => {
    const cocktail = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php").then(response => response.json());
    setCocktail(cocktail);
  }

  return (
    <div className="homeDiv">
      <h1>Welcome to the Cocktail Bar</h1>
      <p>Look up a random Cocktail</p>
      <button onClick={randomCocktail}>Try it!</button>
      {cocktail ? <CocktailDetailed cocktail={cocktail}/> : <></>}
    </div>
  );
};

export default Home;
