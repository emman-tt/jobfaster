import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showCertificates: false,
  certificates: [
    {
      id: 1,
      name: '',
      issuer: '',
      year: '',
      url: ''
    }
  ],
  projects: [
    {
      id: 1,
      name: '',
      description: '',
      url: '',
      techStack: '',
      points: []
    }
  ],
  showProjects: false
}

export const additionalSlice = createSlice({
  name: 'additional',
  initialState,
  reducers: {
    setShowProject (state, action) {
      state.showProjects = action.payload
    },
    setShowCertificate (state, action) {
      state.showCertificates = action.payload
    },
    saveCertificates (state, action) {
      const { id, value, option } = action.payload
      const found = state.certificates.find(item => item.id == id)
      if (found) {
        found[option] = value
      }
    },
    saveProjectPoints (state, action) {
      const { id, value } = action.payload
      const found = state.projects.find(item => item.id == id)
      if (found) {
        found.points = value
      }
    },
    saveProjectField (state, action) {
      const { id, value, option } = action.payload
      const found = state.projects.find(item => item.id == id)
      if (found) {
        found[option] = value
      }
    },
    addExtraField: (state, action) => {
      state.projects = [...state.projects, action.payload]
    },
    addCertificateField: (state, action) => {
      state.certificates = [...state.certificates, action.payload]
    },
    removeField: (state, action) => {
      state.projects = state.projects.filter(item => item.id !== action.payload)
    },
    removeCertificateField: (state, action) => {
      state.certificates = state.certificates.filter(
        item => item.id !== action.payload
      )
    }
  }
})

export const {
  setShowProject,
  saveProjectPoints,
  saveProjectField,
  addExtraField,
  addCertificateField,
  removeField,
  removeCertificateField,
  saveCertificates,
  setShowCertificate
} = additionalSlice.actions
