import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import logger from "redux-logger";
import search_data_Slice from "../features/cearchDataSlice";
import set_tab_Slice from "../features/tabSlice";
import letter_data_Slice from "../features/letterFilterDataSlice";


let middleWareList = getDefaultMiddleware({
    serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
})

let middlewareList

if (process.env.NODE_ENV !== 'production') {
    middlewareList = [...middleWareList, logger]
} else {
    middlewareList = [...middleWareList]
}

const reducers = combineReducers({
    searchData: search_data_Slice,
    tab:set_tab_Slice,
    letterData: letter_data_Slice,

})

/** I set up persist store but not in use. As app not require it. **/
const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: middlewareList,
    devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

