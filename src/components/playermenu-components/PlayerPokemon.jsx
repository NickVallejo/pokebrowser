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
          <div className="player-pokemon__list">
            {playerPokes.map(poke => (
                <MyPokemon key={poke.id} poke={poke} flee={true}/>
            ))}
          </div>
      </div>
  )
}

export default PlayerPokemon;
