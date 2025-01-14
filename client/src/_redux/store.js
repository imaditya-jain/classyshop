import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth.slices.js'

const store = configureStore({
    reducer: {
        auth: authReducer
    }
})

export default store