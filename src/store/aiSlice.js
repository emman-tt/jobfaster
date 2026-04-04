import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  corrections: [],
  correctionsAnswers: [],
  layoutId: 1,
  job: {
    description: '',
    company: '',
    hiringManager: '',
    source: '',
    location: '',
    title: '',
    tone: 'Formal',
    email: '',
    includeCoverLetter: false
  },
  uploadedUserFileData: {
    layoutId: 1,
    data: {}
  }
}
export const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    saveCorrections: (state, action) => {
      state.corrections = action.payload
    },
    saveJobDetails (state, action) {
      const { category, value } = action.payload

      state.job[category] = value
    },
    saveCorrectionAnswers: (state, action) => {
      state.correctionsAnswers = action.payload
    },
    changeLayout (state, action) {
      state.layoutId = action.payload
    },
    saveUserFileData (state, action) {
      const { option, value } = action.payload
      state.uploadedUserFileData[option] = value
    }
  }
})

export const {
  saveCorrections,
  saveJobDetails,
  saveCorrectionAnswers,
  changeLayout,
  saveUserFileData
} = aiSlice.actions
