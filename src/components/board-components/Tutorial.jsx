import React, { useEffect } from 'react'
import arrowkeys from '../../assets/img/arrow-keys.png'
import playerone from '../../assets/img/player-male/pm-down-1.png'
import pancham from '../../assets/img/pancham.png'
import { useDispatch, useSelector } from 'react-redux'
import { uiActions } from '../../store'

function Tutorial() {

  const show = useSelector(state => state.ui.showTut)
  const dispatch = useDispatch()

  useEffect(() => setTimeout(() => {
      dispatch(uiActions.toggleTut(true))
  }, 1000), [])

  const closeTutorial = () => dispatch(uiActions.toggleTut(false))
  
    return (
    <div className={`tutorial-overlay ${show && "show-tutorial"}`}>
        <div className="tutorial-box">
            <i className="fa-solid fa-circle-xmark close-tutorial" onClick={closeTutorial}></i>
            <h2 className="tutorial-title">Welcome to Pokebrowser!</h2>
            <p className="tutorial-txt">Thanks so much for checking out this project. Countless hours were spent
            getting this game to a presentable state. I hope you think it's cool! </p>
            <div className="tutorial-box__tips">
                <div className="tip">
                <div className="img-wrap"><img src={arrowkeys} alt="" /></div>
                    <p>Use the arrow keys to move your trainer.</p>
                </div>
                <div className="tip">
                <div className="img-wrap"><img src={pancham} alt="" /></div>
                    <p>View and release pokemon on the left menu.</p>
                </div>
                <div className="tip">
                    <div className="img-wrap"><img src={playerone} alt="" /></div>
                    <p>Search for players to trade on the right menu.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Tutorial