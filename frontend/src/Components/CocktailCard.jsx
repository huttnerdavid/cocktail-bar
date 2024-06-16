import React from 'react'
import { Link } from "react-router-dom";

const CocktailCard = ({cocktail}) => {
  const linkTo = `/cocktail/${cocktail.idDrink}`
  return (
    <Link to={linkTo}>
      <div className='cocktailCard'>
        <p>Name: {cocktail.strDrink}</p>
        <img src={cocktail.strDrinkThumb} />
      </div>
    </Link>
    
  )
}

export default CocktailCard
