import React, {useState, useEffect, useRef} from 'react';
import { useSelector,  useDispatch } from 'react-redux';
import { encounterActions } from '../../store';
import EncounterPoke from './EncounterPoke';
import { encounterMenuAnim } from '../../store/action-creators/encounterAnimations';
import pokeball from '../../assets/img/pokeball.png'
import greatball from '../../assets/img/greatball.png'
import ultraball from '../../assets/img/ultraball.png'

function EngageMenu({poke, playerInv, retry}) {
  const dispatch = useDispatch()
  const runEncounter = () => dispatch(encounterActions.stopEncounter())
  const engageEncounter = () => dispatch(encounterActions.engageEncounter())
  const max = useSelector(state => state.mypokemon.max)
  const pokes = useSelector(state => state.mypokemon.pokemon)
  const ballSelect = useSelector(state => encounterActions.ball)
  const [engage, setEngage] = useState(false)
  const startMenu = useRef()

  useEffect(() => {
    console.log(ballSelect)
  }, [ballSelect])

  const chooseBallThenEngage = (e) => {
    switch(e.key){
      case '1':
        if(playerInv.balls.pkballs > 0){
          dispatch(encounterActions.engageEncounter({selectBall: 'pkball'}))
        }
        break;
      case '2':
        if(playerInv.balls.grballs > 0){
          dispatch(encounterActions.engageEncounter({selectBall: 'grball'}))
        }
        break;
      case '3':
        if(playerInv.balls.ultballs > 0){
          dispatch(encounterActions.engageEncounter({selectBall: 'ultball'}))
        }
        break;
      default: return
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', chooseBallThenEngage)
    if(!retry){
      const duration = 1
      setTimeout(() => {
        encounterMenuAnim(startMenu, duration)
      }, 2000)  
    } else{
      const duration = 0
      encounterMenuAnim(startMenu, duration)
    }
    
    if(pokes.length < max && playerInv.balls.pkballs > 0 ){
      setEngage(true)
    }

    return () => {
      document.removeEventListener('keydown', chooseBallThenEngage)
    }
  }, [])

  if(engage){
    return <div ref={startMenu} className="enc-menu">
        <EncounterPoke poke={poke}/>
        <div className="enc-menu__options">
        <div className="enc-menu__good">
          <div className="ball-menu">
            <div className="ball">
              <h3>1</h3>
              <img src={pokeball} alt="" />
              <span>{playerInv.balls.pkballs}x</span>
            </div>
            <div className="ball">
              <h3>2</h3>
              <img src={greatball} alt="" />
              <span>0x</span>
            </div>
            <div className="ball">
              <h3>3</h3>
              <img src={ultraball} alt="" />
              <span>0x</span>
            </div>
          </div>
          <button className="enc-menu__run" onClick={runEncounter}>Run!</button>
        </div>
        </div>
    </div>
  } else{
    return <div ref={startMenu} className="enc-menu">
    <EncounterPoke poke={poke}/>
    <div className="enc-menu__options">
      <div className="enc-menu__bad">
        {pokes.length >= max && <p className="enc-menu__noengage">You have no more space to hold pokemon!</p>}
        {playerInv.balls.pkballs <= 0 && <p className="enc-menu__noengage">You have no pokeballs!</p>}
        <button className="enc-menu__run" onClick={runEncounter}>Run!</button>
      </div>
    </div>
</div>
}
}

export default EngageMenu;
