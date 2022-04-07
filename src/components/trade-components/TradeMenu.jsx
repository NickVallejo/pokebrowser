import React, {useEffect, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TradeResults from './TradeResults'
import { tradeActions } from '../../store'
import playerSrcReq from '../../helpers/requests/playerSrc-request'
import TradeHeader from './TradeHeader'
import TradeSearchRefresh from './TradeSearchRefresh'
import httpReq from '../../helpers/requests/use-http'

function TradeMenu() {
    const srcRef = useRef()
    const srcResults = useSelector(state => state.trades.srcResults)
    const small = useSelector(state => state.ui.small)
    const windowOn = useSelector(state => state.ui.window)
    const dispatch = useDispatch()

    useEffect(() => {
        return dispatch(tradeActions.tradeResultsSearch({results: undefined}))
    }, [])

    const submitSearchHandler = async(e, refresh=false) => {
        const src = srcRef.current.value
        if((e.keyCode == 13 && src.length > 0) || (refresh && src.length > 0)){
            // const playerSrcRes = await playerSrcReq(srcRef.current.value)
            const playerSrcRes = await httpReq(`http://localhost:4000/api/players?src=${src}`, 'GET', {
              'Content-Type': 'application/x-www-form-urlencoded', 
          })
            dispatch(tradeActions.tradeResultsSearch({results: playerSrcRes.data}))
        }
    }

  return (
    <section className={`trade-menu ${windowOn === 'trademenu' && 'menu-show'}`}>
      <TradeHeader />
      <div className="player-src">
        <input ref={srcRef} onKeyDown={submitSearchHandler} type="text" placeholder="Searh for Players..." />
        <TradeSearchRefresh submitSearchHandler={submitSearchHandler} />
      </div>
      <TradeResults srcResults={srcResults} />
    </section>
  )
}

export default TradeMenu