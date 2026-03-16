import { createSlice } from '@reduxjs/toolkit'

const initialState = {
corrections:[]
}
export const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
saveCorrections:(state,action) => {
state.corrections = action.payload
}
  }
})

export const {saveCorrections} = aiSlice.actions

