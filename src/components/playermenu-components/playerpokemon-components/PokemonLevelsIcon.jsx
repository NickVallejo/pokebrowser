import React from 'react'
import levels from '../../../assets/img/levels.svg'

function PokemonLevelsIcon({toggleLevels, iconClicked}) {
  return (
    <img className={`pokemon-card__levels ${iconClicked && 'levels-clicked'}`} src={levels} alt="" onClick={toggleLevels}/>
  )
}

export default PokemonLevelsIcon