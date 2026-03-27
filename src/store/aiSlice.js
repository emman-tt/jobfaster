import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  corrections: [],
  correctionsAnswers: [],
  layoutId: 2,
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
      console.log(category,value)
      state.job[category] = value
    },
    saveCorrectionAnswers: (state, action) => {
      state.correctionsAnswers = action.payload
    },
    changeLayout (state, action) {
      state.layoutId = action.payload
    }
  }
})

export const {
  saveCorrections,
  saveJobDetails,
  saveCorrectionAnswers,
  changeLayout
} = aiSlice.actions
