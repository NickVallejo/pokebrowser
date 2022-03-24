import React from 'react'
import loaderBall from '../../assets/img/loader-ball.gif'

function Loading() {
  return (
    <div className="load-screen">
        <img className="loading-img" src={loaderBall} alt="" />
        <h4 className="loading-txt">Loading...</h4>
    </div>
  )
}

export default Loading