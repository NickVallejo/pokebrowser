import React from 'react'
import TradeButtons from './trade-buttons/TradeButtons'

function TradeUser({user}) {
    const {_id, username, active_trade} = user
  
    return (
    <div className="trade-user__box" name={_id}>
        <h6>{username}</h6>
        <TradeButtons active_trade={active_trade} _id={_id}/>
    </div>    
  )
}

export default TradeUser