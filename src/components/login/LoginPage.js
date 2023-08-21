import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../Firebase";
import { AuthContext } from "../../context/AuthContext";
import "./login.css"

import React, { useContext, useState } from 'react'
import { HashContext } from "../../context/HashContext";
import axios from "axios"
import {BackEnd_Url} from "../../services/config"

function LoginPage() {

  const [credentials , setCredentials] = useState({
    email : "",
    username : "",
    password:""
  });


  // Destructure properties from AuthContext
  const { user: authUser, dispatch: authDispatch, email, photoUrl } = useContext(AuthContext);

  // Destructure properties from HashContext
  const { user: hashUser, error, loading, dispatch: hashDispatch } = useContext(HashContext);
  const navigate = useNavigate();

  const signIn = () => {
    auth.signInWithPopup(provider)
    .then(async (result) =>  {
        const user = result.user
        authDispatch({type:"LOGIN_SUCCESS" , authUser:user.displayName , email:user.email , photoUrl:user.photoURL})
        // try {
        //     const res = await axios.post(`${BackEnd_Url}/api/auth/storeGoogleUser` , {
        //       email: user.email,
        //       username: user.displayName,
        //     })
        // } catch (err) {
        //   hashDispatch({type:"LOGIN_FAILURE" , payload:err})
        // }
        navigate("/home");
    })
    .catch((error) => (console.log(error)))
}

const handleChange = e => {
  setCredentials(prev => ({...prev , [e.target.id] : e.target.value}))
  //console.log(credentials);
}


const handleLogin = async e => {
  e.preventDefault();
  hashDispatch({type : "LOGIN_START"})
  try {
    const res = await axios.post(`${BackEnd_Url}/api/auth/login` , credentials)
    console.log("hello" , res);
    hashDispatch({type:"LOGIN_SUCCESS" , payload : res.data , id : res.data._id})
    console.log(res.data);
    navigate("/home" , {state:{id:res.data._id}})
  } catch (err) {
    hashDispatch({type:"LOGIN_FAILURE" , payload:err.response.data.message})
    console.log(error);
  }
}

const handleRegister = async (e) => {
  e.preventDefault();
  hashDispatch({type:"LOGIN_START"})
  try {
    const res = await axios.post(`${BackEnd_Url}/api/auth/register` , credentials)
    hashDispatch({type:"LOGIN_SUCCESS" , payload:res.data , id : res.data._id})
    console.log(hashUser);
    navigate("/home" , {state:{id:res.data._id}})
  } catch(err) {
    hashDispatch({type:"LOGIN_FAILURE" , payload:err.response.data.message})
    console.log(error);
  }

}



  return (
    <div className="login">
      <div className="mainContainer">
        <div className="container">
          <p className="login_text">Google Forms</p>
          {error && <span style={{color:"Red"}}>* {error}</span>}
          <form id="login-form">
            <input className="text" type="text" id="email" placeholder="Email" required autoComplete="off" onChange={(e) => {handleChange(e)}}/>
            <input className="text" type="text" id="username" placeholder="Username" required autoComplete="off" onChange={(e) => {handleChange(e)}}/>
            <input className="password" type="password" id="password" placeholder="Password" autoComplete="off" required onChange={(e) => {handleChange(e)}}/>
            <div className="signIn">
              <button disabled={loading} className="loginButton" type="submit" onClick={handleLogin}>Login</button>
              <div className="or-divider login-or">Or</div>
              <button disabled={loading} className="loginButton" type="submit" onClick={handleRegister}>Register</button>
            </div>
          </form>
        </div>
      </div>
      {/* <div className="or-divider">Or</div>
      <div className="google-login"> 
        <div className="google-container">
          <button className="signInButton" onClick={signIn}><img src="/images/google-icon.png" className="google-icon" />Sign In with Google</button>
        </div>
      </div> */}
      
    </div>
    
  )
}

export default LoginPage