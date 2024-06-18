import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FocusedCocktail = ({ loggedIn, user }) => {
  const { id } = useParams();
  const [cocktailDetails, setCocktailDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState(null);
  const [commentWritten, setCommentWritten] = useState("");

  async function handleComment() {
    let comment = {
      cocktailId: id,
      userName: user,
      commentText: commentWritten,
    };
  
    try {
      console.log('Sending request with comment:', comment);
  
      const response = await axios.post(
        "http://localhost:5194/Comment/PostComment",
        comment,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
  
      console.log('Response received:', response);
    } catch (error) {
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  }

  useEffect(() => {
    async function fetchCocktail() {
      const searchUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const data = await fetch(searchUrl).then((response) => response.json());
      const cocktail = data.drinks[0];

      let ingredients = [];
      let measures = [];

      for (let index = 1; index < 16; index++) {
        if (cocktail[`strIngredient${index}`]) {
          ingredients.push(
            <th className="focusedTableSection">
              {cocktail[`strIngredient${index}`]}
            </th>
          );
        }
        if (cocktail[`strMeasure${index}`]) {
          measures.push(
            <th className="focusedTableSection">
              {cocktail[`strMeasure${index}`]}
            </th>
          );
        }
      }

      let tmpDetails = {
        name: cocktail.strDrink,
        glass: cocktail.strGlass,
        image: cocktail.strDrinkThumb,
        alcoholic: cocktail.strAlcoholic,
        ingredients: ingredients,
        measures: measures,
        instructions: cocktail.strInstructions,
      };
      setCocktailDetails(tmpDetails);
      setLoading(false);
    }

    async function fetchComments() {
      const response = await axios.get(
        `http://localhost:5194/Comment/GetCommentsById?cocktailId=${id}`
      );
      setComments(response.data);
    }

    fetchCocktail();
    fetchComments();
  }, []);

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <>
          <div id="focusedDiv">
            <h1>{cocktailDetails.name}</h1>
            <p>{cocktailDetails.alcoholic}</p>
            <p>Glass to use: {cocktailDetails.glass}</p>
            <img src={cocktailDetails.image} alt="" id="focusedImage" />
            <table id="focusedTable">
              <tr>{cocktailDetails.ingredients}</tr>
              <tr>{cocktailDetails.measures}</tr>
            </table>
            <p>{cocktailDetails.instructions}</p>
          </div>
          <div className="commentDiv">
            {loggedIn ? (
              <>
                <input
                  type="text"
                  placeholder="Add your own comment!"
                  className="commentInput"
                  onChange={(e) => {
                    setCommentWritten(e.target.value);
                  }}
                />
                <br />
                <button onClick={handleComment}>Send comment</button>
              </>
            ) : (
              <></>
            )}
            {comments.map(function (data) {
              return (
                <div className="individualComment">
                  <h3>{data.userName}</h3>
                  <p>{data.text}</p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default FocusedCocktail;
