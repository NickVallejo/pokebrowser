import {configureStore} from '@reduxjs/toolkit'
import player from './playerSlice'
import field from  './fieldSlice'
import inventory from './inventorySlice'
import encounter from './encounterSlice'
import mypokemon from './myPokemonSlice'

const store = configureStore({
    reducer: {
        player: player.reducer,
        field: field.reducer,
        inventory: inventory.reducer,
        encounter: encounter.reducer,
        mypokemon: mypokemon.reducer,
    }
})

export const playerActions = player.actions
export const fieldActions = field.actions
export const inventoryActions = inventory.actions
export const encounterActions = encounter.actions
export const myPokemonActions = mypokemon.actions

export default store