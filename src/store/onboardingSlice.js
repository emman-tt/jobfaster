import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showFinale: false,
  zoom: {
    value: false,
    amount: 50
  }
}

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    toggleFinale: (state, action) => {
      state.showFinale = action.payload
    },
    toggleZoom (state) {
      state.zoom.value = !state.zoom.value
    },
    controlZoom (state, action) {
      if (action.payload === 'reset') {
        state.zoom.amount = 20
      } else if (action.payload === 'increase' && state.zoom.amount <= 100) {
        state.zoom.amount += 20
      } else if (action.payload === 'decrease' && state.zoom.amount >= 0) {
        state.zoom.amount -= 20
      }
    }
  }
})

export const { toggleFinale, controlZoom, toggleZoom } = onboardingSlice.actions
