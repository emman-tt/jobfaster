import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  certifications: [],
  achievements: [],
  skills: []
}

export const credentialsSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {
    updateCertification: (state, action) => {
      const { id, data } = action.payload
      const foundIndex = state.certifications.findIndex(cert => cert.id === id)
      if (foundIndex !== -1) {
        state.certifications[foundIndex] = {
          ...state.certifications[foundIndex],
          ...data
        }
      } else {
        state.certifications.push({ id, ...data })
      }
    },
    addCertification: (state, action) => {
      const newCert = {
        id: Date.now(),
        name: '',
        organization: '',
        year: '',
        hasExpiry: false,
        expiryYear: ''
      }
      state.certifications.push(newCert)
    },
    removeCertification: (state, action) => {
      state.certifications = state.certifications.filter(
        cert => cert.id !== action.payload
      )
    },

    updateAchievement: (state, action) => {
      const { id, data } = action.payload
      const foundIndex = state.achievements.findIndex(ach => ach.id === id)
      if (foundIndex !== -1) {
        state.achievements[foundIndex] = {
          ...state.achievements[foundIndex],
          ...data
        }
      } else {
        state.achievements.push({ id, ...data })
      }
    },
    addAchievement: (state, action) => {
      const newAchievement = {
        id: Date.now(),
        achievement: action.payload.achievement,
        context: action.payload.context || '',
        year: action.payload.year || ''
      }
      state.achievements.push(newAchievement)
    },
    removeAchievement: (state, action) => {
      state.achievements = state.achievements.filter(
        ach => ach.id !== action.payload
      )
    },

    updateSkill: (state, action) => {
      const { id, data } = action.payload
      const foundIndex = state.skills.findIndex(skill => skill.id === id)
      if (foundIndex !== -1) {
        state.skills[foundIndex] = { ...state.skills[foundIndex], ...data }
      } else {
        state.skills.push({ id, ...data })
      }
    },
    addSkill: (state, action) => {
      const newSkill = {
        id: Date.now(),
        name: ''
      }
      state.skills.push(newSkill)
    },
    removeSkill: (state, action) => {
      state.skills = state.skills.filter(skill => skill.id !== action.payload)
    },
    reArrange: (state, action) => {
      const { category, value } = action.payload
      if (category === 'skills') {
        state.skills = value
      } else if (category === 'certifications') {
        state.certifications = value
      } else if (category === 'achievements') {
        state.achievements = value
      }
    },
    loadResumeData: (state, action) => {
      const { skills, certifications, achievements } = action.payload
      if (skills) state.skills = skills
      if (certifications) state.certifications = certifications
      if (achievements) state.achievements = achievements
    }
  }
})

export const {
  updateCertification,
  addCertification,
  removeCertification,
  updateAchievement,
  addAchievement,
  removeAchievement,
  updateSkill,
  addSkill,
  removeSkill,
  reArrange,
  loadResumeData
} = credentialsSlice.actions
