import React from 'react'
import Header from "../header/Header"
import Template from "../template/Template"
import Home from "../home/Home"
import { useLocation } from 'react-router-dom'


function MainPage() {
  const location = useLocation();
  const id = location.state.id
  return (
    <div>
        <Header />
        <Template UserId={id}/>
        <Home UserId={id}/>
    </div>
  )
}

export default MainPage