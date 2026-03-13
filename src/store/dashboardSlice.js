import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showHeader: true,
  showRightbar: false
}

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    toggleHeader: (state, action) => {
      state.showHeader = action.payload
    },
    toggleRightbar: (state, action) => {
      state.showRightbar = action.payload
    }
  }
})

export const { toggleHeader,toggleRightbar } = dashboardSlice.actions
