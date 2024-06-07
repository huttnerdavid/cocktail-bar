import React from 'react'

const CocktailDetailed = ({cocktail}) => {
   let currentCocktail = cocktail.drinks[0];
  return (
    <div>
      <h2>Name: {currentCocktail.strDrink}</h2>
      <img src={currentCocktail.strDrinkThumb} />
    </div>
  )
}

export default CocktailDetailed
