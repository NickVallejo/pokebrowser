import React, {useEffect, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TradeResults from './TradeResults'
import { tradeActions } from '../../store'
import playerSrcReq from '../../helpers/requests/playerSrc-request'
import src from '../../assets/img/src.svg'
import TradeHeader from './TradeHeader'

function TradeMenu() {
    const srcRef = useRef()
    const srcResults = useSelector(state => state.trades.srcResults)
    const small = useSelector(state => state.ui.small)
    const windowOn = useSelector(state => state.ui.window)
    const dispatch = useDispatch()

    useEffect(() => {
        return dispatch(tradeActions.tradeResultsSearch({results: undefined}))
    }, [])

    const submitSearchHandler = async(e) => {
        if(e.keyCode == 13 && srcRef.current.value.length > 0){
            const playerSrcRes = await playerSrcReq(srcRef.current.value)
            dispatch(tradeActions.tradeResultsSearch({results: playerSrcRes.data}))
        }
    }

  return (
    <section className={`trade-menu ${windowOn === 'trademenu' && 'menu-show'}`}>
      <TradeHeader />
      <div className="player-src">
        <input ref={srcRef} onKeyDown={submitSearchHandler} type="text" placeholder="Searh for Players..." />
      </div>
      <TradeResults srcResults={srcResults} />
    </section>
  )
}

export default TradeMenu