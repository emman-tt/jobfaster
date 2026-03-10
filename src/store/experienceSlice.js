import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  experience: [
    {
      id: 1,
      summary: '',
      toolsAndSoftware: '',
      metricsAndValues: '',
      majorChallengeSolved: '',
      teamAbilities: '',
      finalResult: ''
    },
    {
      id: 2,
      summary: '',
      toolsAndSoftware: '',
      metricsAndValues: '',
      majorChallengeSolved: '',
      teamAbilities: '',
      finalResult: ''
    },
    {
      id: 3,
      summary: '',
      toolsAndSoftware: '',
      metricsAndValues: '',
      majorChallengeSolved: '',
      teamAbilities: '',
      finalResult: ''
    }
  ]
}
export const experienceSlice = createSlice({
  name: 'experience',
  initialState,
  reducers: {
    saveExperience: (state, action) => {
      const { id, value, name } = action.payload

      const section = state.experience.find(item => item.id === id)
      if (section) {
        section[name] = value
      }
    },
    addExtraField: (state, action) => {
      state.experience = [...state.experience, action.payload]
    }
  }
})

export const { saveExperience,addExtraField } = experienceSlice.actions
