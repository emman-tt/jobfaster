import { jobSlice } from './jobSlice'
import { personalSlice } from './personalSlice'
import { formatSlice } from './formatSlice'
import { configureStore } from '@reduxjs/toolkit'
import { experienceSlice } from './experienceSlice'
import { filesSlice } from './filesSlice'
import { modalSlice } from './modalSlice'
import { dashboardSlice } from './dashboardSlice'
import { aiSlice } from './aiSlice'
import { previewSlice } from './previewSlice'
import { onboardingSlice } from './onboardingSlice'
import { notificationSlice } from './notificationSlice'

export const store = configureStore({
  reducer: {
    job: jobSlice.reducer,
    format: formatSlice.reducer,
    personal: personalSlice.reducer,
    experience: experienceSlice.reducer,
    files: filesSlice.reducer,
    modal: modalSlice.reducer,
    dashboard: dashboardSlice.reducer,
    ai: aiSlice.reducer,
    preview: previewSlice.reducer,
    onboarding: onboardingSlice.reducer,
    notification: notificationSlice.reducer
  }
})
