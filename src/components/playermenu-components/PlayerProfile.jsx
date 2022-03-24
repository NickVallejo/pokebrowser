import React from 'react';
import { useSelector } from 'react-redux';

function PlayerProfile() {
  const username = useSelector(state => state.usermeta.user.username)

  return (
      <div className="menu-tab">
          <h3 className="menu-tab__title">Trainer {username}</h3>
      </div>
  )
}

export default PlayerProfile;
