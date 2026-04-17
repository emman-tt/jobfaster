import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  font: 'Inter',
  weight: 500,
  size: 14,
  height:1.5,
  align: 'left'
}

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setFont: (state, action) => {
      state.font = action.payload
    },
    setWeight: (state, action) => {
      state.weight = action.payload
    },
    setSize: (state, action) => {
      state.size = action.payload
    },
    setHeight: (state, action) => {
      state.height = action.payload
    },
    setAlign: (state, action) => {
      state.align = action.payload
    }
  }
})

export const { setFont, setWeight, setSize, setHeight, setAlign } =
  editorSlice.actions
