import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  modals: {
    resume: false,
    cover: false,
    uploadResume: false,
    uploadFile: false,
    folder: false,
    correction: false,
    saveResume: false,
    selectResume: false,
    chooseTemplate: false,
    showTemplates: false,
    fileDetails: false
  },
  selectedFile: null
}
export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModals: (state, action) => {
      state.modals[action.payload] = !state.modals[action.payload]
    },
    openFileDetails: (state, action) => {
      state.modals.fileDetails = true
      state.selectedFile = action.payload
    },
    closeFileDetails: (state) => {
      state.modals.fileDetails = false
      state.selectedFile = null
    }
  }
})

export const { toggleModals, openFileDetails, closeFileDetails } = modalSlice.actions
