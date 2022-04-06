import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import pokeball from '../../assets/img/pokeball.png'
import { inventoryActions } from '../../store';

function PlayerInventory() {
  const dispatch = useDispatch()
  const balls = useSelector(state => state.inventory.balls)
  const userData = useSelector(state => state.usermeta.user)

  useEffect(() => {
    if(userData)
    dispatch(inventoryActions.setPokeballs(userData.pokeballs))
  }, [])

  return <div className='player-inventory'>
    <div className="ball-box">
      <img src={pokeball} className="ball" />
      <span className="ball-count">{balls.pkballs}x</span>
    </div>
  </div>;
}

export default PlayerInventory;
