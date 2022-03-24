import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import src from '../../assets/img/src.svg'
import { uiActions } from '../../store';

function PlayerProfile() {
  const username = useSelector(state => state.usermeta.user.username)
  const small = useSelector(state => state.ui.small)
  const dispatch = useDispatch()

  const switchHandler = () => dispatch(uiActions.switchMenu('trademenu'))

  return (
      <div className="menu-tab">
          <h3 className="menu-tab__title">Trainer {username}</h3>
          {small && <img className="src-icon" src={src} onClick={switchHandler} /> }
      </div>
  )
}

export default PlayerProfile;
