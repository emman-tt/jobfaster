import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  jobTitles: [],
  workEnvironment: [],
  jobLocation: [],
  salaryExpectation: null
}
export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    saveJobTitles: (state, action) => {
      state.jobTitles = action.payload
    },
    saveEnvironment: (state, action) => {
      state.workEnvironment = action.payload
    },
    saveJobLocation: (state, action) => {
      state.jobLocation = action.payload
    },
    saveSalary: (state, action) => {
      state.salaryExpectation = action.payload
    }
  }
})

export const { saveEnvironment, saveJobLocation, saveJobTitles, saveSalary } =
  jobSlice.actions
