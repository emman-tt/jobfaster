import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showHeader: true
}

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    toggleHeader: (state, action) => {
      state.showHeader = action.payload
    }
  }
})

export const { toggleHeader } = dashboardSlice.actions
