import React, { useState, useCallback } from 'react';
import { encounterSliderTap } from '../../../store/action-creators/thunks-encounters';
import { useDispatch, useSelector } from 'react-redux';
import TapValues from './TapValues';
import SliderBar from './SliderBar';
import encounterAnims from '../../../store/action-creators/animations-encounters'

function EncounterSlider({target, pounder, slider, pokeImg}) {
  const dispatch = useDispatch()
  const [healthReducer, setHealthReducer] = useState(0)
  const [taps, setTaps] = useState(0)
  const [tapValue, setTapValue] = useState([])
  const poke = useSelector(state => state.encounter.encPoke)

  //taps the slider and increases recorded taps by 1 (max 3)
  const fieldQuicktime = useCallback(e => {
    if(e.code === "Space"){
        const poundX = pounder.current.getBoundingClientRect().x
        const targetX = target.current.getBoundingClientRect().x
        const targetWidth = target.current.getBoundingClientRect().width
        const num = dispatch(encounterSliderTap(poundX, targetX, targetWidth))
        encounterAnims.tapBounce(target, pounder, pokeImg, num.color)

        setTapValue(prevVals => {
          const newVals = Array.from(prevVals)
          newVals.push(num.text)
          return newVals
        })
        setHealthReducer(prevReducer => {
          const newReducer = prevReducer += num.value
          return newReducer
        })
        setTaps(prevTaps => {
          const newTap = prevTaps+=1
          return newTap
        })
    }
}, [])

  return (
    <section className="enc-slider__wrap">
      <TapValues 
      tapValue={tapValue}/>
      <SliderBar 
      healthReducer={healthReducer} 
      captureRate={poke.capture_rate} 
      fieldQuicktime={fieldQuicktime} 
      taps={taps}
      slider={slider}
      target={target}
      pounder={pounder}
      />
      <h4 className="info-txt">Press Spacebar to tap!</h4>
    </section>
  )
}

export default EncounterSlider;
