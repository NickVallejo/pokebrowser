import React, {useRef, useState} from 'react'
import TradeUser from './TradeUser'

function TradeMenu() {
    const srcRef = useRef()
    const [srcResults, setSrcResults] = useState()

    const submitSearch = async() => {
        try{
            const srcReq = await fetch(`http://localhost:4000/api/players?src=${srcRef.current.value}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', 
                },
            })

            if(srcReq.status === 200){
                const srcRes = await srcReq.json()
                console.log('src results', srcRes)
                setSrcResults(srcRes)
            } else{
                throw new Error('Internal Server Error')
            }
    
        } catch(err){
            console.log(err)
        }
    }

  return (
    <section className="trade-menu">
        <h3>Trades</h3>
        <div className="player-src">
            <input ref={srcRef} type="text" />
            <button onClick={submitSearch}>Search</button>
        </div>
        <div className="player-display">
            {srcResults && srcResults.map(user => {
                return <TradeUser key={user._id} user={user} />
            })}
        </div>
    </section>
  )
}

export default TradeMenu