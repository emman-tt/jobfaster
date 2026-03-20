import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  experience: [
    {
      id: 1,
      jobTitle: '',
      startMonth: null,
      startYear: null,
      endMonth: null,
      endYear: null,
      points: [],
      location: '',
      company: ''
    }
  ],
  errors: []
}
export const experienceSlice = createSlice({
  name: 'experience',
  initialState,
  reducers: {
    saveExperience: (state, action) => {
      const { id, value, option } = action.payload
      const found = state.experience.find(item => item.id == id)
      if (found) {
        found[option] = value
      }
    },
    saveExperiencePoints: (state, action) => {
      const { id, value } = action.payload
      const found = state.experience.find(item => item.id == id)
      if (found) {
        found.points = value
      }
    },
    addExtraField: (state, action) => {
      state.experience = [...state.experience, action.payload]
    },
    removeField: (state, action) => {
      console.log(action.payload)
      state.experience = state.experience.filter(
        item => item.id !== action.payload
      )
    },
    saveErrors: (state, action) => {
      state.errors = action.payload
    }
  }
})

export const {
  saveExperience,
  saveExperiencePoints,
  addExtraField,
  saveErrors,
  removeField
} = experienceSlice.actions
