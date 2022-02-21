import { createSlice } from "@reduxjs/toolkit";

const initState = {pokemon: [], max: 300}

const myPokemonSlice = createSlice({
    name: 'mypokemon',
    initialState: initState,
    reducers: {
        addPokemon(state, action){
            state.pokemon.push(action.payload.poke)
        },
        removePokemon(state, action){
            const id = action.payload.id
            const index = state.pokemon.findIndex(poke => poke.id === id)
            state.pokemon.splice(index, 1)
        }
    }
})

export default myPokemonSlice