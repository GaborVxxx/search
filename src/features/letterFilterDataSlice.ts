import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {Drink} from "../interfaces/interfaces";

interface InitialState {
    searchData: Drink[]
}

const initialState: InitialState = {
    searchData : [],
}

export const letter_data_Slice = createSlice({
    name:'search_data_Slice',
    initialState,
    reducers :{
        setLetterDataList: (state, action:PayloadAction<Drink[]>) => {
            if(state.searchData.length === 0) {
                state.searchData = action.payload
            } else {
                state.searchData = action.payload
            }
        }
    }
})

export const {setLetterDataList} = letter_data_Slice.actions

export default letter_data_Slice.reducer