import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MyPokemon from './playerpokemon-components/MyPokemon';
import { myPokemonActions } from '../../store';

function PlayerPokemon() {
  const dispatch = useDispatch()
  const playerPokes = useSelector(state => state.mypokemon.pokemon)
  const userData = useSelector(state => state.usermeta.user)

  useEffect(() => {
    if(userData.pokemon)
        dispatch(myPokemonActions.setPokemonOnLoad({pokemon: userData.pokemon}))
  }, [])

  return (
      <div className="player-pokemon">
          {playerPokes.map(poke => (
              <MyPokemon key={poke.id} poke={poke} />
          ))}
      </div>
  )
}

export default PlayerPokemon;
