import {configureStore} from '@reduxjs/toolkit'

//game slices
import traders from './slices/tradersSlice'

const traderStore = configureStore({
    reducer: {
        traders: traders.reducer,
    }
})

export const tradersActions = traders.actions

export default traderStore