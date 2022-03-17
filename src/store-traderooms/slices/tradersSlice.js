import { createSlice } from "@reduxjs/toolkit";

const initState = {traders: []}

const tradersSlice = createSlice({
    name: 'traders',
    initialState: initState,
    reducers: {
        setTraders(state, action){
            let {users, me} = action.payload

            if (users[0].id != me._id && users.length > 1){
                users = [users[1], users[0]]
            }

            users.forEach(user => {
                state.traders.push(user)
            })

        },
        newOffer(state, action){
            const {id, poke} = action.payload
            const index = state.traders.findIndex(trader => trader.id === id)
            state.traders[index].offer = poke
        },
        newResponse(state, action){
            const {id, response} = action.payload
            const index = state.traders.findIndex(trader => trader.id === id)
            state.traders[index].response = response
        },
        abortTrade(state, action){
            state.traders.forEach(trader => {
                trader.confirmed = false
                trader.response = undefined
            })
        },
        confirmTrade(state, action){
            const {id} = action.payload
            const index = state.traders.findIndex(trader => trader.id === id)
            state.traders[index].confirmed = true
        },
        cleanup(state, action){
            state.traders = initState.traders
        }
    }
})

export default tradersSlice