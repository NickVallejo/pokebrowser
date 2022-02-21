import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {playerActions} from '../../store'
import { stopStartPlayerMovement } from '../../store/action-creators/encounterEngage';
import { plM } from '../../helpers/player-male';
import PlayerBubble from './PlayerBubble';

//player increase by 100px on y or x axis
function Player() {
  const dispatch = useDispatch()
  const playerFieldPosition = useSelector(state => state.player.field)
  const playerArrayPosition = useSelector(state => state.player.array)
  const fieldSize = useSelector(state => state.field.size)
  const fieldArray = useSelector(state => state.field.array)
  const poke = useSelector(state => state.encounter.encPoke)
  const [playerImg, setPlayerImg] = useState(plM.down[0])

  const moveCycle = (move) => {
    setPlayerImg(plM[move][1])
    setTimeout(() => {
      setPlayerImg(plM[move][0])
    }, 100)
    setTimeout(() => {
      setPlayerImg(plM[move][2])
    }, 200)
    setTimeout(() => {
      setPlayerImg(plM[move][0])
    }, 300)
  }

  const movePlayer = useCallback((e) => {
    const key = e.keyCode
    switch(key){
        case 39:
          moveCycle('right')
          dispatch(playerActions.setPlayerArrayLocation({axis: "x",  dir: 1, fieldSize}))
          break;
        case 38:
          moveCycle('up')
          dispatch(playerActions.setPlayerArrayLocation({axis: "y",  dir: -1, fieldSize}))
          break;
        case 40:
            moveCycle('down')
            dispatch(playerActions.setPlayerArrayLocation({axis: "y",  dir: 1, fieldSize}))
          break;
        case 37:
            moveCycle('left')
            dispatch(playerActions.setPlayerArrayLocation({axis: "x",  dir: -1, fieldSize}))
          break;
    }
}, [fieldSize, dispatch])

  useEffect(() => {
    poke ?
      dispatch(stopStartPlayerMovement(movePlayer, true)) :
      dispatch(stopStartPlayerMovement(movePlayer, false))
  }, [poke])

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
