import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
  tab: string
}

const initialState: InitialState = {
  tab: 'a',
}

export const set_tab_Slice = createSlice({
  name: 'setTubSlice',
  initialState,
  reducers: {
    setTubData: (state, action: PayloadAction<string>) => {
      state.tab = action.payload
    },
  },
})

export const { setTubData } = set_tab_Slice.actions

export default set_tab_Slice.reducer
