import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showFinale: false
}

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    toggleFinale: (state, action) => {
      state.showFinale = action.payload
    }
  }
})

export const { toggleFinale } = onboardingSlice.actions
