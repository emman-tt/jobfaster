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
    },
    loadResumeData: (state, action) => {
      const { contactDetails, onlineLinks, summary } = action.payload
      if (contactDetails) state.contactDetails = contactDetails
      if (onlineLinks) state.onlineLinks = onlineLinks
      if (summary !== undefined) state.summary = summary
    },
    resetPersonal: () => initialState
  }
})

export const {
  saveContactDetails,
  saveOnlineLinks,
  saveSummary,
  saveErrors,
  loadResumeData,
  resetPersonal
} = personalSlice.actions
