import React, { useState } from 'react'
import CocktailsListed from '../Components/CocktailsListed';

const SearchByLetter = () => {
  const [searchLetter, setSearch] = useState("");
  const [cocktailList, setCocktailList] = useState(null);

  let startSearch = async () =>{
    const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=` + searchLetter).then(response => response.json());
    setCocktailList(data.drinks);
  }

  return (
    <div className='searchTemplate'>
      <input type="text" maxLength="1" placeholder='Search by first letter/number' onChange={(e) =>{setSearch(e.target.value)}}/>
      <br></br>
      <button onClick={startSearch}>Search</button>
      {cocktailList ? <CocktailsListed cocktailList={cocktailList}/> : <></>}
    </div>
  )
}

export default SearchByLetter
