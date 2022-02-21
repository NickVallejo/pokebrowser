import React, {useEffect, useRef} from 'react';
import bubble from '../../assets/img/player-bubble.svg'
import { encounterBubbleAnim } from '../../store/action-creators/encounterAnimations';

function PlayerBubble() {
  const bubbleBox = useRef()
  
  useEffect(() =>  {
      encounterBubbleAnim(bubbleBox,)
  }, [])

  return <img ref={bubbleBox} className="player-bubble" src={bubble} alt="" />;
}

export default PlayerBubble;
