import React, {useEffect, useState} from 'react';
import patchBg from '../assets/patch.png';
import {useDispatch} from 'react-redux'
import { byeItem } from '../store/action-creators/itemAnimations';
import { rollEncounter } from '../store/action-creators/encounterGenerator';
import { encounterActions } from '../store';
import pokeball from '../assets/img/pokeball.png'

function Patch({fieldSize, pokeballPatch, playerPatch, row, col}) {
  const dispatch = useDispatch()
  const [fizzle, setFizzle] = useState(false)

  //if fizzle is triggered, delete item and add item to inv if player ate it
  useEffect(() => {
    if(fizzle){
      setTimeout(() => setFizzle(false), 250)
      setTimeout(() => dispatch(byeItem(playerPatch, row, col)), 250)
    }
  }, [fizzle, playerPatch, row, col])

  //if item on patch: set fizzle timer, if player & item: player eats item
  useEffect(() => {
    //if player, but no patch, roll encounter
    if(playerPatch && !pokeballPatch) {
      const pkmn = dispatch(rollEncounter())
      pkmn && dispatch(encounterActions.startEncounter({pkmn}))
    }
    //if pokeball but no player, start pkball dissapear timer 
    else if(pokeballPatch && !playerPatch) {setTimeout(() => setFizzle(true), 10000)}
    //if pokeball and player, player eats pkball
    else if(playerPatch && pokeballPatch) {setFizzle(true)}
  }, [playerPatch, pokeballPatch])

  return <div className="patch" style={{
    backgroundImage: `url(${patchBg})`,
    width: `calc((100%/${fieldSize}) - 10px)`,
    height: `calc((100%/${fieldSize}) - 10px)`
    }}>
    {pokeballPatch && <img src={pokeball} className={`pkball fizzle-${fizzle}`} />}
  </div>;
}

export default Patch;
