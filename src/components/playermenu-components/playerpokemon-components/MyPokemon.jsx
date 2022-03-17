import React, {useEffect} from 'react';
import MyPokemonStats from './MyPokemonStats';
import MyPokemonInfo from './MyPokemonInfo';

function MyPokemon({poke, flee}) {
  return (
    <div className='pokemon-card'>
        <MyPokemonInfo 
            flee={flee}
            id={poke.id} 
            date={poke.date} 
            name={poke.name} 
            src={poke.sprite.front}
        />
        <MyPokemonStats stats={poke.stats}/>
    </div>
  )
}

export default MyPokemon
