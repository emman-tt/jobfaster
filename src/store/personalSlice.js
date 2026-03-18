import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  contactDetails: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    jobTitle: ''
  },
  skillsAndTools: [],
  kindsOfWork: [],
  summaryType: 'Professional',
  education: [
    {
      id: 1,
      level: '',
      instituition: '',
      degree: '',
      startYear: '',
      endYear: '',
      gpa: ''
    }
  ],
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
    selectSummaryType: (state, action) => {
      state.summaryType = action.payload
    },
    saveSkillsAndTools: (state, action) => {
      state.skillsAndTools.push(action.payload)
    },
    deleteSkillsAndTools: (state, action) => {
      state.skillsAndTools = state.skillsAndTools.filter(
        item => item.toLowerCase() !== action.payload.toLowerCase()
      )
    },
    saveKindsOfWorks: (state, action) => {
      state.kindsOfWork = action.payload
    },
    saveEducation: (state, action) => {
      const { name, value, id } = action.payload
      const found = state.education.find(item => item.id == id)

      if (found) {
        found[name] = value
      }
    },
    removeEducationField: (state, action) => {
      state.education = state.education.filter(
        item => item.id != action.payload
      )
    },
    addEducationField: state => {
      const newField = {
        id: crypto.randomUUID(),
        level: '',
        instituition: '',
        degree: '',
        startYear: '',
        endYear: '',
        gpa: ''
      }

      state.education.push(newField)
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
  clearErrors,
  addEducationField,
  removeEducationField,
  deleteSkillsAndTools,selectSummaryType
} = personalSlice.actions
