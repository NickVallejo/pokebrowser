import {configureStore} from '@reduxjs/toolkit'

//game slices
import player from './slices/game-slices/playerSlice'
import field from  './slices/game-slices/fieldSlice'
import inventory from './slices/game-slices/inventorySlice'
import encounter from './slices/game-slices/encounterSlice'
import mypokemon from './slices/game-slices/myPokemonSlice'
import usermeta from './slices/game-slices/metaSlice'

//trade slices
import trades from './slices/trade-slices/tradeSlice'

const store = configureStore({
    reducer: {
        player: player.reducer,
        field: field.reducer,
        inventory: inventory.reducer,
        encounter: encounter.reducer,
        mypokemon: mypokemon.reducer,
        trades: trades.reducer,
        usermeta: usermeta.reducer,
    }
})

export const playerActions = player.actions
export const fieldActions = field.actions
export const inventoryActions = inventory.actions
export const encounterActions = encounter.actions
export const myPokemonActions = mypokemon.actions
export const tradeActions = trades.actions
export const userMetaActions = usermeta.actions

export default store