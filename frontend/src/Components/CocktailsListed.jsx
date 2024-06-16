import React from 'react'
import CocktailCard from './CocktailCard'

const CocktailsListed = ({cocktailList}) => {
  return (
    <div className='cocktailList'>
      {cocktailList.map((cocktail)=> <CocktailCard cocktail={cocktail}/>)}
    </div>
  )
}

export default CocktailsListed
