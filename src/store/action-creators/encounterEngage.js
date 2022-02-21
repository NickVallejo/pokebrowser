//add or remove movement controls depending on if  a pokemon  was encountered
export const stopStartPlayerMovement = (movePlayer, encounterStart) => {
    return (dispatch) => {
        encounterStart ? 
        document.removeEventListener("keydown", movePlayer) :
        document.addEventListener("keydown", movePlayer)
    }
}

export const encounterSliderTap  = (poundX, targetX, targetWidth) => {
    return (dispatch) => {
        //miss, ok, great, perfect
        const tap = poundX - targetX
        if(tap < -targetWidth || tap > targetWidth){
            return {value: 0, text: 'miss', color: 'red'}
        } else{
            console.log(tap)
            // console.log("TAP: " + tap, "TARGETWIDTH: " + -targetWidth/2)
            if((tap > -targetWidth/20 && tap <= 0) || (tap < targetWidth/20 && tap >= 0)){
                console.log('PERFECT')
                return {value: 30, text: 'perfect', color: 'darkturquoise'}
            }
            else if((tap > -targetWidth/3 && tap < 0) || (tap < targetWidth/7 && tap > 0)){
                console.log('GREAT')
                return {value: 20, text: 'great', color: 'greenyellow'}
            }
            else {
                console.log('OK')
                return {value: 10, text: 'ok', color: 'gold'}
            }

        }
    }
}

export const encounterSliderPlay = (pounder, slider, cr) => {
    return (dispatch) => {
        const maxWidth = parseInt(slider.current.style.maxWidth) 
        let swingCalc = Math.floor((255-cr)/6)
        let speedX = swingCalc < 10 ? 10 : swingCalc
        let posX = 0;
    
        const sliderSwing = () => {
            let pounderWidth = parseInt(pounder.current.style.width)
            let pounderPos = parseInt(pounder.current.style.left)
            if(pounderPos+pounderWidth >= maxWidth || pounderPos <= 0) speedX = speedX * (-1)
            posX += speedX
            pounder.current.style.left = `${posX}px`;
        }
    
        return setInterval(sliderSwing, 1000/60)
    }
  }

export const encounterRollForCatch = (poke, reducer, ball) => {
    return dispatch => {
        const maxCaptureRate = 255
        const hp = poke.stats[0].base_stat
        const percent = (100 - reducer) * 0.01
        const hpCurrent = hp * percent
        const rate = poke.capture_rate
        const ballMulti = 1
        const a = (hp*4 - hpCurrent)*rate*ballMulti
        const calculatedRate = Math.floor(a/(hp*2))
        const shakes = Math.floor(Math.random() * 3) + 1
        
        if(calculatedRate >= maxCaptureRate){return {caught: true, shakes}}

        const roll = Math.floor(Math.random() * maxCaptureRate) + 1
        
        if(roll <= calculatedRate) return {caught: true, shakes}
        else return {caught: false, shakes}
    }
}