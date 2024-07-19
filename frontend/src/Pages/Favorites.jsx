import React, { useEffect, useState } from "react";
import axios from "axios";
import CocktailCard from "../Components/CocktailCard";

const Favorites = ({ user }) => {
  const [favorites, setFavorites] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchFavorites() {
    const response = await axios.get(
      `http://localhost:5194/Favorite/GetFavoritesByEmail/${user.email}`
    );
    setFavorites(response.data)
  }

  async function removeFromFavorite(id) {
    const response = await axios.delete(
      `http://localhost:5194/Favorite/DeleteFavorite/${user.email}/${id}`
    );
    if (response.status === 200) {
      fetchFavorites();
    }
  }

  useEffect(() => {
    fetchFavorites();
    setLoading(false);
  }, []);
  return (
    <div className="favoriteDiv">
      <h1>Your favorites:</h1>
      {loading ? (
        <></>
      ) : (
        <>
          {favorites ? (
            <>{favorites.map(function (data){
              var cocktail = {
                strDrink : data.cocktailName,
                idDrink : data.cocktailId,
                strDrinkThumb : data.cocktailImg
              }
              return(
                <div className="individualFavorite">
                  <CocktailCard cocktail={cocktail}/>
                  <br></br>
                  <button className="unfavoriteButton" onClick={()=>{removeFromFavorite(cocktail.idDrink)}}>Unfavorite</button>
                </div>
              );
            })}</>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default Favorites;
