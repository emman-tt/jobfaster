import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  experiences: [
    {
      id: 1,
      company: '',
      position: '',
      location: '',
      startYear: '',
      endYear: '',
      accomplishments: []
    }
  ],
  projects: [
    {
      id: 1,
      name: '',
      description: '',
      techStack: [],
      link: '',
      github: ''
    }
  ]
}

export const workSlice = createSlice({
  name: 'work',
  initialState,
  reducers: {
    updateExperience: (state, action) => {
      const { id, data } = action.payload
      const foundIndex = state.experiences.findIndex(exp => exp.id === id)
      if (foundIndex !== -1) {
        state.experiences[foundIndex] = {
          ...state.experiences[foundIndex],
          ...data
        }
      } else {
        state.experiences.push({ id, ...data })
      }
    },
    reArrange (state, action) {
      const { category, value } = action.payload
      state[category] = value
    },
    addExperience: (state, action) => {
      const newExp = {
        id: Date.now(),
        company: '',
        position: '',
        location: '',
        startYear: '',
        endYear: '',
        accomplishments: []
      }
      state.experiences.push(newExp)
    },
    removeExperience: (state, action) => {
      state.experiences = state.experiences.filter(
        exp => exp.id !== action.payload
      )
    },
    addAccomplishment: (state, action) => {
      const { expId, text } = action.payload
      const exp = state.experiences.find(e => e.id === expId)
      if (exp) {
        exp.accomplishments.push({ id: Date.now(), text })
      }
    },
    removeAccomplishment: (state, action) => {
      const { expId, accId } = action.payload
      const exp = state.experiences.find(e => e.id === expId)
      if (exp) {
        exp.accomplishments = exp.accomplishments.filter(
          acc => acc.id !== accId
        )
      }
    },

    updateProject: (state, action) => {
      const { id, data } = action.payload
      const foundIndex = state.projects.findIndex(p => p.id === id)
      if (foundIndex !== -1) {
        state.projects[foundIndex] = { ...state.projects[foundIndex], ...data }
      } else {
        state.projects.push({ id, ...data })
      }
    },
    addProject: state => {
      const newProject = {
        id: Date.now(),
        name: '',
        description: '',
        techStack: [],
        link: '',
        github: ''
      }
      state.projects.push(newProject)
    },
    removeProject: (state, action) => {
      state.projects = state.projects.filter(p => p.id !== action.payload)
    },
    addTech: (state, action) => {
      const { projectId, name } = action.payload
      const project = state.projects.find(p => p.id === projectId)
      if (project) {
        project.techStack.push({ id: Date.now(), name })
      }
    },
    removeTech: (state, action) => {
      const { projectId, techId } = action.payload
      const project = state.projects.find(p => p.id === projectId)
      if (project) {
        project.techStack = project.techStack.filter(t => t.id !== techId)
      }
    }
  }
})

export const {
  updateExperience,
  addExperience,
  removeExperience,
  addAccomplishment,
  removeAccomplishment,
  updateProject,
  addProject,
  removeProject,
  addTech,
  removeTech,
  reArrange
} = workSlice.actions
