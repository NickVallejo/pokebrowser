import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import processTradeReq from '../../../helpers/requests/tradeProcess-request'

function TradeConfirmation({userId, traders, socket, host}) {
    
    const navigate = useNavigate()
    const confirmTrade = () => socket.emit('confirm-trade')
    const abortTrade = () => socket.emit('abort-trade')

    useEffect(() => {
        console.log('TRDAERS ON CONFIRMATIN MOUNT', traders)
    })

    useEffect(async() => {
        if(traders.length === 2 && traders[0].confirmed && traders[1].confirmed){
            if(host){
                const tradeRes = await processTradeReq({
                    trader1: {
                        id: traders[0].id, 
                        pokeId: traders[0].offer.id
                    },
                    trader2: {
                        id: traders[1].id, 
                        pokeId: traders[1].offer.id
                    }
                })
                if(tradeRes.success) socket.emit('trade-processed', (data) => {
                    if(!data.success){
                        alert('Something went wrong! Disbanding room...')
                        navigate('/app', {replace: true})
                    }
                })
            }
        }
    }, [traders])

  return (
    <div className="trade-confirm__overlay">
        <div className="trade-confirm__box">
            <h3>Good to go?</h3>
            <div className="trade-confirm__review">
                <img src={traders[0].offer.sprite.front} />
                <span>for</span>
                <img src={traders[1].offer.sprite.front} />
            </div>
            <h6 className="trade-confirm__who-accepted">
                {traders.map(trader => (
                    trader.confirmed && <p key={trader.id}>{trader.id === userId ? 'you' : trader.user} confirmed</p>
                ))}
            </h6>
            <button className='pkb-btn prim' onClick={confirmTrade}>Confirm</button>
            <button className='pkb-btn ter' onClick={abortTrade}>Reject</button>
        </div>
    </div>
  )
}

export default TradeConfirmation