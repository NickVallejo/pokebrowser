import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PlayerProfile from './PlayerProfile';
import PlayerPokemon from './PlayerPokemon';
import PlayerInventory from './PlayerInventory';
import PlayerLogout from './PlayerLogout';

function PlayerMenu() {
  const windowOn = useSelector(state => state.ui.window)

  useEffect(() => {
    console.log('WINDOW ON', windowOn)
  }, [])
  return (
  <section className={`player-menu ${windowOn === 'playermenu' && 'menu-show'}`}>
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
