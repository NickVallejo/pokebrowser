import { createSlice } from "@reduxjs/toolkit";

const initState = {
    encPoke: false, 
    engPoke: false, 
    tryPoke: false, 
    healthReducer: 0, 
    ball: false, 
    retry: false,
    catchText: false
}

const encounterSlice = createSlice({
    name: 'encounter',
    initialState: initState,
    reducers: {
        startEncounter(state, action){
            state.encPoke = action.payload.pkmn
        },
        stopEncounter(state, action){
            state.engPoke = initState.engPoke
            state.tryPoke = initState.tryPoke
            state.encPoke = initState.encPoke
            state.healthReducer = initState.healthReducer
            state.ball = initState.ball
            state.retry = initState.retry
            state.catchText = initState.catchText
        },
        engageEncounter(state, action){
            state.engPoke = true
            state.ball = action.payload.selectBall
        },
        attemptCatch(state, action){
            state.engPoke = false
            state.tryPoke = true
            state.healthReducer += action.payload.healthReducer
        },
        retryCatch(state, action){
            state.engPoke = initState.engPoke
            state.tryPoke = initState.tryPoke
            state.healthReducer = initState.healthReducer
            state.ball = initState.ball
            state.catchText = initState.catchText
            state.retry = true
        },
        setCatchText(state, action){
            state.catchText = action.payload
        }
    }
})

export default encounterSlice