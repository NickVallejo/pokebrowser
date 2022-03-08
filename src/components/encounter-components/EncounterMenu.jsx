import React, {useState, useEffect, useRef} from 'react';
import { useSelector,  useDispatch } from 'react-redux';
import { encounterActions } from '../../store';
import EncounterPoke from './EncounterPoke';
import BallMenu from './BallMenu';
import { encounterMenuAnim } from '../../store/action-creators/animations-encounters';
import { encounterIsPlayerRetrying } from '../../store/action-creators/thunks-encounters';

function EncounterMenu({poke, playerInv, retry}) {
  const dispatch = useDispatch()
  const runEncounter = () => dispatch(encounterActions.stopEncounter())
  const max = useSelector(state => state.mypokemon.max)
  const pokes = useSelector(state => state.mypokemon.pokemon)
  const [engage, setEngage] = useState(false)
  const startMenu = useRef()

  useEffect(() => {
    const {duration, timeOut} = dispatch(encounterIsPlayerRetrying(retry))

    setTimeout(() => {
      encounterMenuAnim(startMenu, duration)
    }, timeOut)  

    if(pokes.length < max && playerInv.balls.pkballs > 0 ){
      setEngage(true)
    }
  }, [])

  if(engage){
    return <div ref={startMenu} className="enc-menu">
        <EncounterPoke poke={poke}/>
        <div className="enc-menu__options">
        <div className="enc-menu__good">
          <BallMenu playerInv={playerInv} />
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

export default EncounterMenu;
