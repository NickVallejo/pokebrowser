import { createSlice } from "@reduxjs/toolkit";

const initState = {balls: {pkballs: 0, grballs: 0, ultballs: 0}}

const inventorySlice = createSlice({
    name: 'inventory',
    initialState: initState,
    reducers: {
        setPokeballs(state, action){
            state.balls.pkballs = action.payload
        },
        addPokeball(state){
            state.balls.pkballs++
        },
        removePokeball(state){
            state.balls.pkballs--
        }
    }
})

export default inventorySlice