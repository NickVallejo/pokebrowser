import React, { useEffect, useState } from 'react'
import MyPokemon from './traderpokemon-components/MyPokemon'
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
        <div className="menu-tab">
          <h3 className="trader-box__title">{user.user}</h3>
        </div>

        <div className="trader-box__details">
          <div className="acc-dec">
            <div className={`accept ${me && 'trade-hovers'} pkb-btn prim trade-btn ${user.response === true && "accept-on"} ${!respond && me && "no-respond"}`} onClick={acceptOffer}><i className="fa-solid fa-check fa-3x"></i></div>
            <div className={`reject ${me && 'trade-hovers'} pkb-btn ter trade-btn ${user.response === false && "reject-on"} ${!respond && me && "no-respond"}`} onClick={rejectOffer}><i className="fa-solid fa-xmark fa-3x"></i></div>
          </div>
          {me && <button className="leave pkb-btn sec"><Link to={me && "/app"}>Leave Room</Link></button>}
        </div>

        <div className="trader-pokemon">
          <div className="pokemon-list">
            {user.pokemon.map(poke => (
              <MyPokemon key={poke.id} poke={poke} offerPoke={offerPoke} theOffer={poke.id===user.offer.id}/>
            ))}
          </div>
        </div>
      </div>
      <div className="trader-field">
        {user.offer && <MyPokemon key={user.offer.id} me={me} revokePoke={revokePoke} poke={user.offer} onField={true}/>}
      </div>
    </div>
  )
}

export default TraderBox