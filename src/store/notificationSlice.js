import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showNotification: {
    tailor: false
  }
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    toggleNotification (state, action) {
      const { category, value } = action.payload
      state.showNotification[category] = value
    }
  }
})

export const { toggleNotification } = notificationSlice.actions
