import React from 'react'
import NotFoundGif from '../../assets/img/not-found.gif'
import { Link } from 'react-router-dom'

function NotFound({text}) {
  return (
    <section className="load-screen">
        <img className="notfound-img" src={NotFoundGif} alt="" />
        <h4 className="loading-txt">{text}</h4>
        <button className="pkb-btn sec"><Link to="/app">Return</Link></button>
    </section>
  )
}

export default NotFound