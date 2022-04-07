import firstEvos from '../../assets/pokemon/first-evo.json'
import secondEvos from '../../assets/pokemon/second-evo.json'
import thirdEvos from '../../assets/pokemon/third-evo.json'
import legendaryEvos from '../../assets/pokemon/legendary-evo.json'
import mythicEvos from '../../assets/pokemon/mythical-evo.json'
import {v4 as uuid} from 'uuid'
const pokemonArrays = {firstEvos, secondEvos, thirdEvos, legendaryEvos, mythicEvos}

const configSprite = (shiny, gender, sprites) => {

    const maleShiny = ()  => {
        return {front: sprites.front_shiny, back: sprites.back_shiny}
    }

    const femaleShiny = ()  => {
        if(sprites.front_shiny_female !== null && sprites.back_shiny_female !== null){
            return {front: sprites.front_shiny_female, back: sprites.back_shiny_female}
        } else{
            return maleShiny()
        }
    }

    const male = () =>  {
        return {front: sprites.front_default, back: sprites.back_default}
    }

    const female = ()  => {
        if(sprites.front_female !== null && sprites.back_female !== null){
            return {front: sprites.front_female, back: sprites.back_female}
        } else{
            return male()
        }
    }

    if(shiny){
        if(gender === 'm'){
            return maleShiny()
        } else if(gender === 'f'){
            return femaleShiny()
        }
    } else{
        if(gender === 'm'){
            return male()
        } else if(gender === 'f'){
            return female()
        }
    }
}

const pokemonReturn = (pokemon, shiny) => {
    const poke =  {
        id: uuid(),
        name: pokemon.name,
        date: new Date().toISOString().split('T', 1)[0],
        evo_chain: pokemon.evo_chain,
        evo_stage: pokemon.evo_stage,
        capture_rate: pokemon.capture_rate,
        text: pokemon.flavour_text,
        gen: pokemon.gen.name,
        gender: Math.floor(Math.random() * 8) + 1 <= pokemon.gender_rate  ? 'f'  : 'm',
        myth_or_legend: pokemon.myth_or_legend,
        stats: pokemon.stats,
        types: pokemon.types.map(type => type.name),
    }
    poke.sprite = configSprite(shiny, poke.gender, pokemon.sprites)
    return poke
}

const generateEncounter = (array)  =>  {
    if(array === 'legendaryEvos'){
        const mythicRoll = Math.floor(Math.random() * 2) + 1
        console.log('rolling legendary', mythicRoll)
        if(mythicRoll === 1) array = 'mythicEvos'
    }

    const pokeArray = pokemonArrays[array]
    const pokeArrayRoll = Math.floor(Math.random() * pokeArray.length)
    const shinyPokeRoll = Math.floor(Math.random() * 3000) + 1
    const shiny = shinyPokeRoll === 1 ? true : false
    const pokemonRolled = pokeArray[pokeArrayRoll]
    const pokemon = pokemonReturn(pokemonRolled, shiny)
    return pokemon
}

export const rollEncounter = () => {
    return (dispatch) => {
        const encounterRoll = Math.floor(Math.random() * 15) + 1
        if(encounterRoll === 1){
            const pokeTableRoll = Math.floor(Math.random() * 1000) + 1
            switch(true){
                case pokeTableRoll > 250:
                    return generateEncounter('firstEvos')
                case pokeTableRoll > 50:
                    return generateEncounter('secondEvos')
                case pokeTableRoll > 1:
                    return generateEncounter('thirdEvos')
                case pokeTableRoll === 1:
                    return generateEncounter('legendaryEvos')
            }
        } else{
            return false
        }
    }
}