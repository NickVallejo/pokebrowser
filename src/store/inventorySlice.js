import { createSlice } from "@reduxjs/toolkit";

const initState = {balls: {pkballs: 20, grballs: 0, ultballs: 0}}

const inventorySlice = createSlice({
    name: 'inventory',
    initialState: initState,
    reducers: {
        addPokeball(state){
            state.balls.pkballs++
        },
        removePokeball(state){
            state.balls.pkballs--
        }
    }
})

export default inventorySlice