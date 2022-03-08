import React, {useEffect} from 'react'
import TradeButtons from './trade-buttons/TradeButtons'

function TradeUser({user, srcResults}) {
    const {_id, username, active_trade} = user

    return (
    <div className="trade-user__box">
        <h6>{username}</h6>
        <TradeButtons active_trade={active_trade} _id={_id}/>
    </div>    
  )
}

export default TradeUser