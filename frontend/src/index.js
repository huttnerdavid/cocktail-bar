import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
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
  const [loggedIn, setLogin] = useState(false);
  const [user, setUser] = useState(null);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout setLogin={setLogin} loggedIn={loggedIn}/>}>
          <Route index element={<Home />} />
          <Route path="/cocktails" element={<SearchCocktailsPage />} >
            <Route path="/cocktails/byingredient" element={<SearchByIngredient/>}/>
            <Route path="/cocktails/byletter" element={<SearchByLetter/>}/>
            <Route path="/cocktails/byname" element={<SearchByName/>}/>
          </Route>
          <Route path="/cocktail/:id" element={<FocusedCocktail loggedIn={loggedIn} user={user}/>}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login setLogin={setLogin} setUser={setUser}/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);