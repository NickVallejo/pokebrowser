import React from 'react';
import PlayerProfile from './PlayerProfile';
import PlayerPokemon from './PlayerPokemon';
import PlayerInventory from './PlayerInventory';

function PlayerMenu() {
  return (
  <section className="player-menu">
      <div className="player-stats">
      <PlayerProfile />
      <PlayerInventory />
      </div>
      <PlayerPokemon />
  </section>
  );
}

export default PlayerMenu;
