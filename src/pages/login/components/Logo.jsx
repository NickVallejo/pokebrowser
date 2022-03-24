import React, {useEffect, useRef} from 'react'
import Pokebrowser from '../../../assets/img/pokebrowser.png'
import ReactLogo from '../../../assets/img/react-logo.png'
import { logoIntroAnim } from '../animations/logreg-anim'


function Logo() {
  const logoRef = useRef()
  const logoTxt = useRef()

  useEffect(() => logoIntroAnim(logoRef, logoTxt), [])

  return (
    <div className="pokelogo-wrap">
    <img ref={logoRef} className="poke-logo" src={Pokebrowser} alt="" />
      <div ref={logoTxt} className="react-tag">
        <img className="react-tag__img" src={ReactLogo} alt="" />
        <h6 className="react-tag__txt">A React Project</h6>
      </div>
    </div>
  )
}

export default Logo