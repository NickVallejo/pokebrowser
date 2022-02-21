import React from 'react';

function EncounterPoke({poke, pokeImg}) {
  return <div className="encpoke-box">
        <img ref={pokeImg} className="encpoke-sprite" src={poke.sprite.front} alt=""/>
        <h3 className="encpoke-name">{poke.name}</h3>
  </div>;
}

export default EncounterPoke;
