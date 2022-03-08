import React from 'react';
import PlayerProfile from './PlayerProfile';
import PlayerPokemon from './PlayerPokemon';
import PlayerInventory from './PlayerInventory';
import PlayerLogout from './PlayerLogout';

function PlayerMenu() {
  return (
  <section className="player-menu">
      <div className="player-stats">
      <PlayerProfile />
      <PlayerLogout />
      <PlayerInventory />
      </div>
      <PlayerPokemon />
  </section>
  );
}

export default PlayerMenu;
