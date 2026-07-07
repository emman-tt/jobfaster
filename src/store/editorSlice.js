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
  editingId: null,
  hasUnsavedChanges: false,
  editorSource: null,
  editingFileName: null,
  savedTemplateId: null
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
    },
    setUnsavedChanges: (state, action) => {
      state.hasUnsavedChanges = action.payload
    },
    setEditorSource: (state, action) => {
      state.editorSource = action.payload
    },
    clearEditorSource: (state) => {
      state.editorSource = null
      state.editingFileName = null
    },
    setEditingFileName: (state, action) => {
      state.editingFileName = action.payload
    },
    saveSavedTemplateId: (state, action) => {
      state.savedTemplateId = action.payload
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
  setContrast,
  setUnsavedChanges,
  setEditorSource,
  clearEditorSource,
  setEditingFileName,
  saveSavedTemplateId
} = editorSlice.actions
