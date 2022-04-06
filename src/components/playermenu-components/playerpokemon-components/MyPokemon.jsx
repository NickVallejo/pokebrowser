import React from 'react';
import MyPokemonStats from './MyPokemonStats';
import MyPokemonInfo from './MyPokemonInfo';
import PokemonLevelsIcon from './PokemonLevelsIcon';

function MyPokemon({poke, id, flee, statPoke, pickStatPoke}) {

  const toggleLevels = () => pickStatPoke(id)

  return (
    <div className='pokemon-card'>
        <PokemonLevelsIcon toggleLevels={toggleLevels} iconClicked={statPoke === id}/>
        <MyPokemonInfo 
            flee={flee}
            id={poke.id} 
            date={poke.date} 
            name={poke.name} 
            src={poke.sprite.front}
        />
        {statPoke === id && <MyPokemonStats stats={poke.stats}/>}
    </div>
  )
}

export default MyPokemon
