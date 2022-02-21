import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import MyPokemon from './playerpokemon-components/MyPokemon';

function PlayerPokemon() {
  const playerPokes = useSelector(state => state.mypokemon.pokemon)

  return (
      <div className="player-pokemon">
          {playerPokes.map(poke => (
              <MyPokemon key={poke.id} poke={poke} />
          ))}
      </div>
  )
}

export default PlayerPokemon;
