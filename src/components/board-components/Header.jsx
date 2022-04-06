import React, {useState, useEffect} from 'react'
import github from '../../assets/img/github.svg'
import onIcon from '../../assets/img/volume-on.svg'
import offIcon from '../../assets/img/volume-off.svg'

function Header() {
    const [soundOn, setSoundOn] = useState(true)
    const soundOnEvent = new Event('soundOn')
    const soundOffEvent = new Event('soundOff')

    const toggleSound = () => setSoundOn(prev => !prev)    
    useEffect(() => {
        soundOn ? document.dispatchEvent(soundOnEvent) : 
        document.dispatchEvent(soundOffEvent)
    }, [soundOn])

  return (
    <header className="app-header">
        <img className="sound-icon icon" src={soundOn ? onIcon : offIcon} alt="" onClick={toggleSound} />
        <a href="https://github.com/NickVallejo"><img className="git-icon icon" src={github} alt="" /></a>
    </header>
  )
}

export default Header