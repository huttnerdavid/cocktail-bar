import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({setLogin, setUser}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {Email: email, Password: password};

        try{
            const response = await axios.post("http://localhost:5194/Auth/Login", user);
            if(response.status === 200){
                setLogin(true);
                setUser(response.data.userName);
                navigate("/");
            }
        }
        catch(error){
            alert("Login unsuccesfull!");
        }
    }

  return (
    <div className="authDiv">
        <p>Login</p>
        <input type="text" placeholder="email" onChange={(e)=>{setEmail(e.target.value)}}/><br/>
        <input type="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}}/><br/>
        <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Login
