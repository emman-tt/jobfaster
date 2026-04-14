import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  contactDetails: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    jobTitle: ''
  },
  onlineLinks: [],
  summary: '',
  errors: {}
}
export const personalSlice = createSlice({
  name: 'personal',
  initialState,
  reducers: {
    saveContactDetails: (state, action) => {
      const { name, value } = action.payload
      state.contactDetails[name] = value
    },
    saveOnlineLinks: (state, action) => {
      state.onlineLinks = action.payload
    },
    saveSummary: (state, action) => {
      state.summary = action.payload
    },
    saveErrors: (state, action) => {
      state.errors = action.payload
    }
  }
})

export const {
  saveContactDetails,
  saveOnlineLinks,

  saveSummary,
  saveErrors
} = personalSlice.actions
