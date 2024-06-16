import React, { useState } from 'react'
import CocktailsListed from '../Components/CocktailsListed';

const SearchByIngredient = () => {
  const [searchIngredient, setSearch] = useState("");
  const [cocktailList, setCocktailList] = useState(null);

  let startSearch = async () =>{
    const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=` + searchIngredient).then(response => response.json());
    setCocktailList(data.drinks);
  }

  return (
    <div className='searchTemplate'>
      <input type="text" placeholder='Search by ingredients' onChange={(e) =>{setSearch(e.target.value)}}/>
      <br></br>
      <button onClick={startSearch}>Search</button>
      {cocktailList ? <CocktailsListed cocktailList={cocktailList}/> : <></>}
    </div>
  )
}

export default SearchByIngredient
