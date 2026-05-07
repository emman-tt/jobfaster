import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  font: 'font-inter',
  weight: 500,
  size: 14,
  height: 1.2,
  align: 'left',
  theme: 'monochrome',
  contrast: 1,
  templateId: 'classic',
  isPreview: false,
  modal: null,
  editingId: null
}

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    saveTemplateId (state, action) {
      state.templateId = action.payload
    },
    togglePreview (state) {
      state.isPreview = !state.isPreview
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
    },
    setModal: (state, action) => {
      state.modal = action.payload
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    },
    setContrast: (state, action) => {
      state.contrast = action.payload
    }
  }
})

export const {
  setFont,
  setWeight,
  setSize,
  saveTemplateId,
  setHeight,
  setAlign,
  togglePreview,
  setModal,
  setTheme,
  setContrast
} = editorSlice.actions
