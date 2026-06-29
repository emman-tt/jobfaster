import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  educations: [
    {
      id: 1,
      school: '',
      degree: '',
      field: '',
      startYear: '',
      endYear: '',
      highlights: []
    }
  ],
  languages: [
    {
      id: 1,
      language: '',
      proficiency: 'Professional'
    }
  ]
}

export const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {
    updateEducation: (state, action) => {
      const { id, data } = action.payload
      const foundIndex = state.educations.findIndex(edu => edu.id === id)
      if (foundIndex !== -1) {
        state.educations[foundIndex] = { ...state.educations[foundIndex], ...data }
      } else {
        state.educations.push({ id, ...data })
      }
    },
    addEducation: state => {
      const newEducation = {
        id: Date.now(),
        school: '',
        degree: '',
        field: '',
        startYear: '',
        endYear: '',
        highlights: []
      }
      state.educations.push(newEducation)
    },
    removeEducation: (state, action) => {
      state.educations = state.educations.filter(edu => edu.id !== action.payload)
    },
    addHighlight: (state, action) => {
      const { eduId, text } = action.payload
      const edu = state.educations.find(e => e.id === eduId)
      if (edu) {
        edu.highlights.push({ id: Date.now(), text })
      }
    },
    removeHighlight: (state, action) => {
      const { eduId, highlightId } = action.payload
      const edu = state.educations.find(e => e.id === eduId)
      if (edu) {
        edu.highlights = edu.highlights.filter(h => h.id !== highlightId)
      }
    },

    saveLanguage: (state, action) => {
      const { name, value, id } = action.payload
      const found = state.languages.find(lang => lang.id === id)
      if (found) {
        found[name] = value
      }
    },
    addLanguage: state => {
      const newLanguage = {
        id: Date.now(),
        language: '',
        proficiency: 'Professional'
      }
      state.languages.push(newLanguage)
    },
    removeLanguage: (state, action) => {
      state.languages = state.languages.filter(lang => lang.id !== action.payload)
    },
    updateLanguageProficiency: (state, action) => {
      const { id, language, proficiency } = action.payload
      const found = state.languages.find(lang => lang.id === id)
      if (found) {
        if (language !== undefined) found.language = language
        if (proficiency !== undefined) found.proficiency = proficiency
      }
    },
    reArrange: (state, action) => {
      const { category, value } = action.payload
      if (category === 'education') {
        state.educations = value
      }
    },
    loadResumeData: (state, action) => {
      const { educations, languages } = action.payload
      if (educations) state.educations = educations
      if (languages) state.languages = languages
    }
  }
})

export const {
  updateEducation,
  addEducation,
  removeEducation,
  addHighlight,
  removeHighlight,
  saveLanguage,
  addLanguage,
  removeLanguage,
  updateLanguageProficiency,
  reArrange,
  loadResumeData
} = educationSlice.actions
