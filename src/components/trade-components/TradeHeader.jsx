import React from 'react'
import src from '../../assets/img/src.svg'
import { useSelector, useDispatch } from 'react-redux'
import { uiActions } from '../../store';


function TradeHeader() {
    const small = useSelector(state => state.ui.small)
    const dispatch = useDispatch()

    const switchHandler = () => dispatch(uiActions.switchMenu('playermenu'))
  return (
    <div className="menu-tab">
        <h3 className="menu-tab__title">Find Trades</h3>
        {small && <img className="src-icon" src={src} onClick={switchHandler} /> }
    </div>
  )
}

export default TradeHeader