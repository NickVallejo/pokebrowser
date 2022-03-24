import React from 'react';
import PlayerProfile from './PlayerProfile';
import PlayerPokemon from './PlayerPokemon';
import PlayerInventory from './PlayerInventory';
import PlayerLogout from './PlayerLogout';

function PlayerMenu() {
  return (
  <section className="player-menu">
      <PlayerProfile />
      <div className="player-stats">
      <PlayerLogout />
      <PlayerInventory />
      </div>
      <PlayerPokemon />
  </section>
  );
}

export default PlayerMenu;
