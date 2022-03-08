import {gsap} from 'gsap'
import { useRef } from 'react'
import { SlowMo } from 'gsap/all'

gsap.registerPlugin(SlowMo);

const tapBounce = (target, pounder, pokeImg, color) => {
    gsap.to(target.current, {
        scale: 0.8,
        repeat: 1,
        yoyo: true,
        duration: 0.1,
        boxShadow: `0 0 50px 1px ${color}`,
    })

    gsap.to(pounder.current, {
        scale: 0.8,
        repeat: 1,
        yoyo: true,
        duration: 0.1
    })

    gsap.to(pokeImg.current, {
        rotation: 180,
        y: -100,
        repeat: 1,
        yoyo: true,
        duration: 0.1,
        ease: "bounce.out"
    })
}

export const encounterStartAnim = (screen) => {
    gsap.timeline()
    .to(screen.current, {
        opacity: 1,
        repeat: 3,
        yoyo: true,
        duration: 0.25,
        ease: "bounce.out"
    })
    .to(screen.current, {
        opacity: 1,
        duration: 0.25,
        ease: "bounce.out"
    })
}

export const encounterMenuAnim = (startMenu, duration) => {
    gsap.timeline()
    .to(startMenu.current,  {
        opacity: 1,
        duration: duration,
        ease: "bounce.out"
    })
}

export const encounterBubbleAnim = (bubbleBox) => {
        gsap.to(bubbleBox.current, {
            opacity: 1,
            y: -55,
            duration: 0.5,
            ease: "bounce.out"
        })
}

export const tryPokeAnim = (tryPokeBall, tryPokePoke) => {
    return new Promise(resolve => {
        gsap.timeline({onComplete: resolve})
        .to(tryPokeBall.current, {
            opacity: 1,
            duration: 0.5
        })
        .fromTo(tryPokeBall.current,  {
            y: -70,
            duration: 0.3,
            x: 0,
            rotate: 0,
            ease: "power.in"
        },
        {
            y: 50, 
            duration: 0.4,
            opacity: 1,
            x: 0,
            ease: "power.out"
        }
        ).to(tryPokeBall.current, {
            y: -14,
            duration: 2,
            ease: "slow(2)",
            rotate: 360    
        }).to(tryPokeBall.current, {
            y: 150,
            duration: 1,
            ease: "bounce.out",
        })
    
        setTimeout(() => {
            gsap.timeline()
            .to(tryPokePoke.current, {
                duration: 5,
                filter: "brightness(100) contrast(100)",
            }).to(tryPokePoke.current, {
                duration: 0.3,
                opacity: 0,
                delay: -3.5
            })
        }, 800)
    })
}

export const shakeBallAnim = (tryPokeBall, shakes) => {
    console.log('SHAKEY', shakes)
    return new Promise(resolve => {
        setTimeout(() => {
            gsap.timeline({repeat: shakes-1, onComplete: resolve})
            .fromTo(tryPokeBall.current, {
                rotate: 340,
                yoyo: true,
                duration: 0.75,
            },{
                rotate: 360,
                yoyo: true,
                duration: 0.75,
            }).to(tryPokeBall.current, {
                delay: 1,
                duration: 0.75
            })
        }, 1200)
    })
}

export const caughtPokeAnim = (tryPokeBall) => {
    return new Promise(resolve => {
        gsap.timeline({onComplete: resolve})
        .to(tryPokeBall.current, {
            yoyo: true,
            scale: 1.2,
            repeat: 1,
            duration: 0.05
        })
    })
}

export const escapedPokemonAnim = (tryPokeBall, tryPokePoke) => {
    return new Promise(resolve => {
        gsap.timeline({onComplete: resolve})
        .to(tryPokeBall.current, {
            scale: 1.5,
            filter: "brightness(100) contrast(100)",
            opacity: 0,
            duration: 1.3
        }).fromTo(tryPokePoke.current, 
        {
            opacity: 0,
            scale: 0.95
        },
        {
            filter: "none",
            opacity: 1,
            duration: 1,
            scale: 1,
            delay: 0.5
        })
    })
}

export default {tapBounce}