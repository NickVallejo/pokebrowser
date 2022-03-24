import React from 'react'
import { useState, useEffect } from 'react'
import TradeUser from './TradeUser'
import { useDispatch } from 'react-redux'
import { tradeActions } from '../../store'

function TradeResults({ srcResults }) {
    const [results, setResults] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        if (srcResults && srcResults.length > 0) {
            setResults(srcResults.map(user => {
                return <TradeUser
                    key={user._id}
                    user={user}
                />
            }))
        } else if (srcResults && srcResults.length < 1) {
            return setResults(<p>No results found...</p>)
        }
    }, [srcResults])

    useEffect(() => () => dispatch(tradeActions.cleanupResults()), [])

    return (
        <div className="trade-wrap">
            <div className="player-display">{results}</div>
        </div>
    )
}

export default TradeResults