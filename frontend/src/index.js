import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import { useCookies } from 'react-cookie';
import './index.css';
import Layout from './Components/Layout';
import Home from './Pages/Home';
import SearchCocktailsPage from './Pages/SearchCocktailsPage';
import FocusedCocktail from './Pages/FocusedCocktail';
import SearchByIngredient from './Pages/SearchByIngredient';
import SearchByLetter from './Pages/SearchByLetter';
import SearchByName from './Pages/SearchByName';
import Login from './Pages/Login';
import Register from './Pages/Register';

export default function App() {
  // const [user, setUser] = useState(null);
  const [cookies, setCookie] = useCookies(["loggedIn"]);
  const [user, setUser] = useCookies(["user"]);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout setLogin={setCookie} loggedIn={cookies.loggedIn}/>}>
          <Route index element={<Home />} />
          <Route path="/cocktails" element={<SearchCocktailsPage />} >
            <Route path="/cocktails/byingredient" element={<SearchByIngredient/>}/>
            <Route path="/cocktails/byletter" element={<SearchByLetter/>}/>
            <Route path="/cocktails/byname" element={<SearchByName/>}/>
          </Route>
          <Route path="/cocktail/:id" element={<FocusedCocktail loggedIn={cookies.loggedIn} user={cookies.user}/>}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login setLogin={setCookie} setUser={setUser}/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);