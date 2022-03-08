import React, {useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TradeUser from './TradeUser'
import { tradeActions } from '../../store'
import playerSrcReq from '../../helpers/requests/playerSrc-request'

function TradeMenu() {
    const srcRef = useRef()
    const srcResults = useSelector(state => state.trades.srcResults)
    const dispatch = useDispatch()

    useEffect(() => {
        return dispatch(tradeActions.tradeResultsSearch({results: undefined}))
    }, [])

    const submitSearchHandler = async() => {
        const playerSrcRes = await playerSrcReq(srcRef.current.value)
        dispatch(tradeActions.tradeResultsSearch({results: playerSrcRes.data}))
    }

  return (
    <section className="trade-menu">
        <h3>Trades</h3>
        <div className="player-src">
            <input ref={srcRef} type="text" />
            <button onClick={submitSearchHandler}>Search</button>
        </div>
        <div className="player-display">
            {srcResults && srcResults.map(user => {
                return <TradeUser 
                key={user._id} 
                user={user} 
                />
            })}
        </div>
    </section>
  )
}

export default TradeMenu