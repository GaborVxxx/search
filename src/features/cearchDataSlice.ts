import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Drink } from '../interfaces/interfaces'

interface InitialState {
  searchData: Drink[]
}

const initialState: InitialState = {
  searchData: [],
}

export const search_data_Slice = createSlice({
  name: 'search_data_Slice',
  initialState,
  reducers: {
    setSearchDataList: (state, action: PayloadAction<Drink[]>) => {
      state.searchData = action.payload
    },
  },
})

export const { setSearchDataList } = search_data_Slice.actions

export default search_data_Slice.reducer
