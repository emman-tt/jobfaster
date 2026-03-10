import { jobSlice } from './jobSlice'
import { personalSlice } from './personalSlice'
import { formatSlice } from './formatSlice'
import { configureStore } from '@reduxjs/toolkit'
import { experienceSlice } from './experienceSlice'
export const store = configureStore({
  reducer: {
    job: jobSlice.reducer,
    format: formatSlice.reducer,
    personal: personalSlice.reducer,
    experience: experienceSlice.reducer
  }
})
