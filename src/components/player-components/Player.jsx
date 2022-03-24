import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { encounterTogglePlayerMovement } from '../../store/action-creators/thunks-encounters';
import { plM } from '../../helpers/player-male';
import PlayerBubble from './PlayerBubble';
import { playerMove, playerToggleMovement } from '../../store/action-creators/thunks-players';

//player increase by 100px on y or x axis
function Player() {
  const dispatch = useDispatch()
  const playerFieldPosition = useSelector(state => state.player.field)
  const fieldSize = useSelector(state => state.field.size)
  const poke = useSelector(state => state.encounter.encPoke)
  const [playerImg, setPlayerImg] = useState(plM.down[0])
  const frames = [1, 0, 2, 0]

  const moveCycle = (move) => {
    let counter = 0

    const moveFrames = () => {
      if(counter < 4){
        setPlayerImg(plM[move][frames[counter]])
        counter++
        setTimeout(() => moveFrames(), 100)
      }
    }

    moveFrames()
  }

  const playerMoveHandler = useCallback((e) => {
    dispatch(playerMove(moveCycle, fieldSize, e.keyCode))
}, [fieldSize, dispatch])

  useEffect(useCallback(() => {
    poke ?
      dispatch(playerToggleMovement(playerMoveHandler, true)) :
      dispatch(playerToggleMovement(playerMoveHandler, false))
  }, [poke]))
  
  return (
  <div 
  className="player" 
  style={{left: playerFieldPosition.x,  top: playerFieldPosition.y}}>
  {poke && <PlayerBubble />}
  <img src={playerImg} alt="" />
  </div>
  );
}

export default Player;
