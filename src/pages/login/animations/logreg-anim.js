import {gsap} from 'gsap'

export const logoIntroAnim = (logo, txt) => {
    gsap.timeline()
    .to(logo.current, {
        opacity: 1,
        scale: 1,
        duration: 1.3,
        ease: "power.in"
    })
    .to(txt.current, {
        opacity: 1,
        duration: 0.7
    })
}

export const logregIntroAnim = box => {
    gsap.timeline()
    .to(box.current, {
        opacity: 1,
        duration: 1.5
    })
}