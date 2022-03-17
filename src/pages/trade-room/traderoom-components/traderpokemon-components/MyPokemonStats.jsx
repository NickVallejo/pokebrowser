import React from 'react';
import { useEffect } from 'react';
import Stat from './Stat';

function MyPokemonStats({stats}) {

  return (
    <div className="pokemon-card__stats">
        {stats.map(stat => (
            <Stat key={stat.stat.name} stat={stat}/>
        ))}
    </div>
    )
}

export default MyPokemonStats;
