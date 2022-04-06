import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MyPokemon from './playerpokemon-components/MyPokemon';
import { myPokemonActions } from '../../store';

function PlayerPokemon() {
  const dispatch = useDispatch()
  const playerPokes = useSelector(state => state.mypokemon.pokemon)
  const userData = useSelector(state => state.usermeta.user)
  const [statPoke, setStatPoke] = useState(false)

  const pickStatePoke = (id) => {
    setStatPoke(prevPoke => {
      if(prevPoke === id) return false
      else return id
    })
  }

  useEffect(() => {
    if(userData.pokemon)
    dispatch(myPokemonActions.setPokemonOnLoad({pokemon: userData.pokemon}))
  }, [])

  return (
      <div className="player-pokemon">
          <div className="player-pokemon__list">
            {playerPokes.map(poke => (
                <MyPokemon 
                key={poke.id} 
                id={poke.id} 
                poke={poke} 
                flee={true}
                statPoke={statPoke} 
                pickStatPoke={pickStatePoke}/>
            ))}
          </div>
      </div>
  )
}

export default PlayerPokemon;
