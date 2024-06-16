import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const FocusedCocktail = () => {
  let {id} = useParams();
  const [cocktailDetails, setCocktailDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchCocktail(){
      const searchUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const data = await fetch(searchUrl).then(response => response.json());
      const cocktail = data.drinks[0];

      let ingredients = [];
      let measures = [];

      for (let index = 1; index < 16; index++) {
        if (cocktail[`strIngredient${index}`]) {
          ingredients.push(<th className='focusedTableSection'>{cocktail[`strIngredient${index}`]}</th>);
        }
        if (cocktail[`strMeasure${index}`]) {
          measures.push(<th className='focusedTableSection'>{cocktail[`strMeasure${index}`]}</th>);
        }
      }

      let tmpDetails = {
        name: cocktail.strDrink,
        glass: cocktail.strGlass,
        image: cocktail.strDrinkThumb,
        alcoholic: cocktail.strAlcoholic,
        ingredients: ingredients,
        measures: measures,
        instructions: cocktail.strInstructions
      }
      setCocktailDetails(tmpDetails);
      setLoading(false);
    }

    fetchCocktail();
  }, []);

  

  return (
    <>
      {loading ? <></> : 
      <div id='focusedDiv'>
        <h1>{cocktailDetails.name}</h1>
        <p>{cocktailDetails.alcoholic}</p>
        <p>Glass to use: {cocktailDetails.glass}</p>
        <img src={cocktailDetails.image} alt="" id='focusedImage'/>
        <table id='focusedTable'>
          <tr>
            {cocktailDetails.ingredients}
          </tr>
          <tr>
            {cocktailDetails.measures}
          </tr>
        </table>
        <p>{cocktailDetails.instructions}</p>
      </div>}
    </>
  )
}

export default FocusedCocktail
