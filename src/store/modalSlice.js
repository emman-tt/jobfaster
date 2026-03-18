import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  modals: {
    resume: false,
    cover: false,
    uploadResume: false,
    uploadFile: false,
    folder:false,
    correction:false
  }
}
export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModals: (state, action) => {
      state.modals[action.payload] = !state.modals[action.payload]
    }
  }
})

export const { toggleModals } = modalSlice.actions
