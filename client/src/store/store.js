import {configureStore} from '@reduxjs/toolkit'
import AuthReducer from '../features/AuthReducer'
import UserReducer from '../features/userReducer'

const store=configureStore({
    reducer:{
        auth:AuthReducer,
        user:UserReducer,
    }
})

export default store

