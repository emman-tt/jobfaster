import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  font: 'font-inter',
  weight: 500,
  size: 14,
  height: 1.2,
  align: 'left',
  templateId: 'classic'
}

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    saveTemplateId (state, action) {
      state.templateId = action.payload
    },
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

export const {
  setFont,
  setWeight,
  setSize,
  saveTemplateId,
  setHeight,
  setAlign
} = editorSlice.actions
