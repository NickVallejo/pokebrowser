import React, {useEffect, useState} from 'react';
import MyPokemonStats from './MyPokemonStats';
import MyPokemonInfo from './MyPokemonInfo';

function MyPokemon({poke, revokePoke, offerPoke, onField, theOffer, me}) {

  //prevents players from trying to offer the poke component that is currently on the trading field
  const offerPokeHandler = () => {!onField && offerPoke(poke)}

  return (
    <div className={`pokemon-card ${theOffer && 'offered-poke'}`} onClick={offerPokeHandler}>
        {onField && me && <div className="return-poke" onClick={revokePoke}><span>X</span></div>}
        <MyPokemonInfo 
            id={poke.id} 
            name={poke.name} 
            src={poke.sprite.front}
        />
    </div>
  )
}

export default MyPokemon
