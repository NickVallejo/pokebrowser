import React, {useEffect, useRef} from 'react';
import bubble from '../../assets/img/exclamation-box.png'
import { encounterBubbleAnim } from '../../store/action-creators/animations-encounters';

function PlayerBubble() {
  const bubbleBox = useRef()
  
  useEffect(() =>  {
    setTimeout(() => encounterBubbleAnim(bubbleBox), 150)   
  }, [])

  return <img ref={bubbleBox} className="player-bubble" src={bubble} alt="" />;
}

export default PlayerBubble;
