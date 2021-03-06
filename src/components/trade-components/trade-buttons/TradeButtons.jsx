import React, {useEffect, useState} from 'react'
import TradeButton from './TradeButton'
import { useDispatch, useSelector } from 'react-redux'
import { tradeActions } from '../../../store'
import { Link } from 'react-router-dom'
import tradeReq from '../../../helpers/requests/trade-request'


function TradeButtons({active_trade, _id}) {
    const [buttonState, setButtonState] = useState(false)
    const [loading, setLoading] = useState(true)
    const srcResults = useSelector(state => state.trades.srcResults)
    const dispatch = useDispatch()

    const tradeRequestHandler = async method => {
        console.log('trade request modify 1')
        const tradeRes = await tradeReq(method, undefined, active_trade, _id)
        if(!tradeRes.success){
            alert(`Toast: ${tradeRes.data}`)
        } else{
            console.log('Trade Results modified 2', 'ID I SENT', _id)
            dispatch(tradeActions.tradeResultsModify({_id, trade: tradeRes.data.modified_trade}))
        }
    }

    useEffect(() => {
        console.log('ACTIVE TRADE', active_trade)
        if(active_trade.status == 'inactive'){
            setButtonState('inactive')
        }

        else if(active_trade.status == 'active'){
            setButtonState('active')
        }

        else if(active_trade.status == 'pending'){
            if(active_trade.iSent){
                setButtonState('requestor-pending')
            } else{
                setButtonState('acceptor-pending')
            }
        }
        
        setLoading(false)
    }, [srcResults, active_trade])

if(!loading){
    if(buttonState === 'inactive'){
        return(
            <div className="trade-user__btns">
                <TradeButton className="pkb-btn prim long" text="Request Trade" method="POST" btnRequest={tradeRequestHandler} />
            </div>
        )
    }

    else if(buttonState === 'active'){
        return(
            <div className="trade-user__btns">
                <button className="pkb-btn prim"><Link to={`/trades/room/${active_trade.roomId}?_id=${active_trade.tradeId}`}>Enter Trade</Link></button>
                <TradeButton className="pkb-btn ter" text="Cancel Trade" method="DELETE" btnRequest={tradeRequestHandler} />
            </div>
        )
    }

    else if(buttonState === 'requestor-pending'){
        return(
            <div className="trade-user__btns">
                <button disabled className="pkb-btn sec">Trade Pending</button>
                <TradeButton className="pkb-btn ter" text="Cancel Trade" method="DELETE" btnRequest={tradeRequestHandler} />
            </div>
        )
    }

    else if(buttonState === 'acceptor-pending'){
        return(
            <div className="trade-user__btns">
                <TradeButton className="pkb-btn sec" prim text="Accept Trade" method="PUT" btnRequest={tradeRequestHandler} />
                <TradeButton className="pkb-btn ter" text="Reject Trade" method="DELETE" btnRequest={tradeRequestHandler} />
            </div>
        )
    } else{
        <div className="trade-user__btns">
            <h3>Load Error</h3>
        </div>
    }
} else{
    return <h3>Loading...</h3>
}
}

export default TradeButtons