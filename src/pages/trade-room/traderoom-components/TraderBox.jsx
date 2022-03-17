import React, { useEffect, useState } from 'react'
import MyPokemon from './traderpokemon-components/MyPokemon'
import accept from '../../../assets/img/trades/accept.svg'
import reject from '../../../assets/img/trades/reject.svg'
import { Link } from 'react-router-dom'

function TraderBox({user, me, socket, index, traders}) {
  const [respond, setRespond] = useState(false)

  const acceptOffer = () => {
    if(!respond) return
    const response = user.response === true ? undefined : true
    socket.emit('response', response)
  }

  const rejectOffer = () => {
    if(!respond) return
    const response = user.response === false ? undefined : false
    socket.emit('response', response)
  }
    
  useEffect(() => {
    if(me && traders[0] && traders[1]){
      const trader = traders.find(trader => trader.id !== user.id)
      console.log('CHECKING FOR RESPONSE PRIVS', traders)
      if(trader && trader.offer){
        setRespond(true)
      } else{
        setRespond(false)
      }
    }
  }, [traders])

  const offerPoke = (poke) => {
    //don't offer poke if it's the one currently on field, or not from my traderbox
    if(!me || poke.id === user.offer.id || traders.length < 2) return
    socket.emit('offer', poke)
  }

  const revokePoke = () => {
    if(!me) return
    socket.emit('offer', false)
  }

  return (
    <div className="trader-box__section" name={index+1}>
      <div className="trader-box">
        <h3>{user.user}</h3>
        <div className="acc-dec">
          <div className={`accept trade-btn ${user.response === true && "accept-on"}`} onClick={acceptOffer}><img src={accept} /></div>
          <div className={`reject trade-btn ${user.response === false && "reject-on"}`} onClick={rejectOffer}><img src={reject} /></div>
        </div>
        <button className="leave"><Link to={me && "/app"}>Leave</Link></button>
        <div className="player-pokemon">
          {user.pokemon.map(poke => (
            <MyPokemon key={poke.id} poke={poke} offerPoke={offerPoke} theOffer={poke.id===user.offer.id}/>
          ))}
        </div>
      </div>
      <div className="trader-field">
        {user.offer && <MyPokemon key={user.offer.id} revokePoke={revokePoke} poke={user.offer} onField={true}/>}
      </div>
    </div>
  )
}

export default TraderBox