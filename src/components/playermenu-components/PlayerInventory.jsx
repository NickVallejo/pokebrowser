import React from 'react';
import { useSelector } from 'react-redux';
import pokeball from '../../assets/img/pokeball.png'

function PlayerInventory() {
  const balls = useSelector(state => state.inventory.balls)
  return <div className='player-inventory'>
    <div className="ball-box">
      <img src={pokeball} className="ball" />
      <span className="ball-count">{balls.pkballs}x</span>
    </div>
  </div>;
}

export default PlayerInventory;
