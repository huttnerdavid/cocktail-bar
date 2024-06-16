import React, { useState } from 'react'
import CocktailsListed from '../Components/CocktailsListed';

const SearchByName = () => {
  const [searchName, setSearch] = useState("");
  const [cocktailList, setCocktailList] = useState(null);

  let startSearch = async () =>{
    const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=` + searchName).then(response => response.json());
    setCocktailList(data.drinks);
  }

  return (
    <div className='searchTemplate'>
      <input type="text" placeholder='Search by name of cocktail' onChange={(e) =>{setSearch(e.target.value)}}/>
      <br></br>
      <button onClick={startSearch}>Search</button>
      {cocktailList ? <CocktailsListed cocktailList={cocktailList}/> : <></>}
    </div>
  )
}

export default SearchByName
