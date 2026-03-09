import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  contactDetails: {
    fullName: '',
    email: '',
    phone: 0,
    location: ''
  },
  skillsAndTools: [],
  kindsOfWork: [],
  education: [],
  errors: {}
}
export const personalSlice = createSlice({
  name: 'personal',
  initialState,
  reducers: {
    saveContactDetails: (state, action) => {
      state.contactDetails = { ...state.contactDetails, ...action.payload }
    },
    saveSkillsAndTools: (state, action) => {
      state.skillsAndTools = action.payload
    },
    saveKindsOfWorks: (state, action) => {
      state.kindsOfWork = action.payload
    },
    saveEducation: (state, action) => {
      state.education = action.payload
    },
    saveErrors: (state, action) => {
      state.errors = action.payload
    }
  }
})

export const {
  saveContactDetails,
  saveSkillsAndTools,
  saveKindsOfWorks,
  saveEducation,
  saveErrors,
  clearErrors
} = personalSlice.actions
