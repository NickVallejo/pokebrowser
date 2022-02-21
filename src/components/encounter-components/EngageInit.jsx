import React, {useRef} from 'react';
import EncounterSlider from './slider-components/EncounterSlider';
import EncounterPoke from './EncounterPoke';

function EngageInit({poke}) {
  const target = useRef()
  const pounder = useRef()
  const slider = useRef()
  const pokeImg = useRef()

  return <div className="enc-engage">
        <EncounterPoke poke={poke} pokeImg={pokeImg}/>
        <EncounterSlider 
        target={target} 
        pounder={pounder} 
        slider={slider} 
        pokeImg={pokeImg}/>
  </div>;
}

export default EngageInit;
