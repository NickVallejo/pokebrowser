import React, { useEffect, useCallback, useRef, useState } from 'react'
import {io} from 'socket.io-client'
import { tradersActions } from '../../store-traderooms';
import { useDispatch, useSelector } from 'react-redux';
import TraderBox from './traderoom-components/TraderBox';
import TradeConfirmation from './traderoom-components/TradeConfirmation';

function TradeRoomActive({roomId, enteredUser, host}) {
    const socketObj = useRef(io('http://localhost:4000'))
    const socket = socketObj.current
    const traders = useSelector(state => state.traders.traders)
    const [tradeConfirm, setTradeConfirm] = useState(false)
    const dispatch = useDispatch()

    const connect = useCallback(() => {
        socket.on('connection', () => {
            dispatch(tradersActions.cleanup())
            socket.emit('join-room', {roomId, user: enteredUser})
    
            socket.on('player-joined', users => {
                dispatch(tradersActions.cleanup())
                dispatch(tradersActions.setTraders({users, me: enteredUser}))
            })
        });

        socket.on('disconnected', users => {
            dispatch(tradersActions.cleanup())
            dispatch(tradersActions.setTraders({users, me: enteredUser}))
        })

        socket.on('new-offer', () => {
            socket.emit('response', undefined)
          })
        
        socket.on('offer', user => {
            dispatch(tradersActions.newOffer({id: user.id, poke: user.poke}))
        })

        socket.on('response', data => {
            dispatch(tradersActions.newResponse({id: data.id, response: data.response}))
        })

        socket.on('abort-trade', () => {
            dispatch(tradersActions.abortTrade())
        })

        socket.on('confirm-trade', id => {
            dispatch(tradersActions.confirmTrade({id}))
        })

        socket.on('trade-processed', users => {
            alert('Trade Complete!')
            setTradeConfirm(false)
            dispatch(tradersActions.cleanup())
            dispatch(tradersActions.setTraders({users, me: enteredUser}))
        })
    })

    useEffect(() => {
        connect()
        return () => socket.disconnect()
    }, [])

    useEffect(() => {
        console.log('TRADERS AFTER PROCESS', traders)
        if(traders.length === 2 && traders[0].response === true && traders[1].response === true){
            setTradeConfirm(true)
        } else{
            setTradeConfirm(false)
        }
    }, [traders])

  return (
      <div className="trader-wrap">
          <div className="trader-boxes">
            {traders.map((trader, index) => (
                <TraderBox 
                key={trader.id} 
                user={trader} 
                me={enteredUser._id === trader.id}
                socket={socket}
                traders={traders}
                index={index} />
            ))}
          </div>
          {tradeConfirm && <TradeConfirmation userId={enteredUser._id} host={host} traders={traders} socket={socket} />}
      </div>
  )
}

export default TradeRoomActive