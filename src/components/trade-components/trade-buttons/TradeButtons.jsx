import React, {useEffect, useState} from 'react'
import TradeButton from './TradeButton'

function TradeButtons({active_trade, _id}) {
    const [buttonState, setButtonState] = useState(false)
    const [loading, setLoading] = useState(true)

    const tradeRequestHandler = async method => {
        let body

        switch(method){
            case 'DELETE':
                body = {tradeId: active_trade.tradeId}
                break
            case 'POST':
                body = {userId: _id}
                break
        }

        try{
            const tradeReq = await fetch('http://localhost:4000/api/trades', {
                method,
                headers: {
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json',
                },
                body: JSON.stringify(body)
            })

            const tradeRes = await tradeReq.json()
            console.log(tradeRes)

        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
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
    }, [])

if(!loading){
    if(buttonState === 'inactive'){
        return(
            <div className="trade-user__btns">
                <TradeButton text="Request Trade" method="POST" btnRequest={tradeRequestHandler} />
            </div>
        )
    }

    else if(buttonState === 'active'){
        return(
            <div className="trade-user__btns">
                <button className="enter-trade__btn">Enter Trade</button>
                <TradeButton text="Cancel Trade" method="DELETE" btnRequest={tradeRequestHandler} />
            </div>
        )
    }

    else if(buttonState === 'requestor-pending'){
        return(
            <div className="trade-user__btns">
                <button disabled className="pending-trade__btn">Trade Pending</button>
                <TradeButton text="Cancel Trade" method="DELETE" btnRequest={tradeRequestHandler} />
            </div>
        )
    }

    else if(buttonState === 'acceptor-pending'){
        return(
            <div className="trade-user__btns">
                <button className="accept-trade__btn">Accept Trade</button>
                <TradeButton text="Reject Trade" method="DELETE" btnRequest={tradeRequestHandler} />
            </div>
        )
    } else{
        <div className="trade-user__btns">
            <h3>in the else :/</h3>
        </div>
    }
} else{
    return <h3>Loading</h3>
}
}

export default TradeButtons