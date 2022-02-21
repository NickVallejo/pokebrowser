import React from 'react';
import Release from './Release';

function MyPokemonInfo({id, name, date, src}) {
  return (
    <div className='pokemon-card__info'>
        <img className='pokemon-card__img' src={src} />
        <h5 className='pokemon-card__name'>{name}</h5>
        <Release id={id}/>
        <span className='pokemon-card__date'>{date}</span>
    </div>
  )
}

export default MyPokemonInfo;
