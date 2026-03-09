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
    }
  ]
}
export const experienceSlice = createSlice({
  name: 'experience',
  initialState,
  reducers: {
    saveSummary: (state, action) => {
      const { id, value } = action.payload
      const field = state.experience.find(item => item.id === id)
      field.summary = value
    },
    saveTools: (state, action) => {
      const { id, value } = action.payload
      const field = state.experience.find(item => item.id === id)
      field.toolsAndSoftware = value
    },
    saveMetrics: (state, action) => {
      const { id, value } = action.payload
      const field = state.experience.find(item => item.id === id)
      field.metricsAndValues = value
    },
    saveChallenges: (state, action) => {
      const { id, value } = action.payload
      const field = state.experience.find(item => item.id === id)
      field.majorChallengeSolved = value
    },
    saveTeamWork: (state, action) => {
      const { id, value } = action.payload
      const field = state.experience.find(item => item.id === id)
      field.teamAbilities = value
    },
    saveFinalResult: (state, action) => {
      const { id, value } = action.payload
      const field = state.experience.find(item => item.id === id)
      field.finalResult = value
    }
  }
})

export const {
  saveChallenges,
  saveFinalResult,
  saveMetrics,
  saveSummary,
  saveTeamWork,
  saveTools
} = experienceSlice.actions
