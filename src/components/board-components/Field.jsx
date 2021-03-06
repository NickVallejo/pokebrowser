import React, {useRef, useEffect, useCallback} from 'react';
import Patch from './Patch';
import Player from '../player-components/Player';
import Encounter from '../encounter-components/Encounter';
import {useSelector, useDispatch} from 'react-redux'
import { fieldActions } from '../../store';
import { playerActions } from '../../store';

function Field() {
  const dispatch = useDispatch()
  const playerArrayPosition = useSelector(state => state.player.array)
  const fieldArray = useSelector(state => state.field.array)
  const fieldSize = useSelector(state => state.field.size)
  const pokeballPositions = useSelector(state => state.field.pokeballPositions)
  const poke = useSelector(state => state.encounter.encPoke)
  const pokeballInterval = useRef()

  const pokeballSpawner = useCallback(() => {
    const pokeballRoll = Math.floor(Math.random() * 5) + 1
    if(pokeballRoll === 1){
      const pokeballPatchX = Math.floor(Math.random() * fieldSize)
      const pokeballPatchY = Math.floor(Math.random() * fieldSize)
      dispatch(fieldActions.newPokeballPosition({x: pokeballPatchX, y: pokeballPatchY}))
    }
  })

  const checkIfPokeballPatch = (row, col)  => {
    if(
      Object.keys(pokeballPositions).length > 0 && 
      row.toString()+col.toString() in pokeballPositions){
      return true
    }
    return false
  }

  const checkIfPlayerPatch = (row, col) => {
    if(row === playerArrayPosition.y && col === playerArrayPosition.x) return true
    return false
  }

  useEffect(() => {
    dispatch(fieldActions.newPositionOnField({x: playerArrayPosition.x, y: playerArrayPosition.y}))
  }, [playerArrayPosition])

  useEffect(() => {
    if(poke) {
      clearInterval(pokeballInterval.current)
      pokeballInterval.current = null
    }
    else if(!pokeballInterval.current) {
      pokeballInterval.current = setInterval(pokeballSpawner, 2000)
    }
  }, [poke])

  useEffect(() => {
    return () => {
      clearInterval(pokeballInterval.current)
      pokeballInterval.current = null
      dispatch(playerActions.cleanupPlayerLocation())
    }
  }, [])

  return <div className="field" style={{width: `${fieldSize}00px`, height:  `${fieldSize}00px`}}>
    <Player/>
      {poke && <Encounter/>}
      {
          fieldArray && fieldArray.map((row, rowIndex) => {
            return row.map((col, colIndex) => {
                return <Patch 
                key={`${rowIndex}-${colIndex}`} 
                row={rowIndex} 
                col={colIndex} 
                fieldSize={fieldSize}
                pokeballPatch={checkIfPokeballPatch(rowIndex, colIndex)}
                playerPatch={checkIfPlayerPatch(rowIndex, colIndex)}
                />
            })
          })
      }
  </div>;
}

export default Field;

