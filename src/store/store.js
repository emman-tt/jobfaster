import { personalSlice } from './personalSlice'
import { formatSlice } from './formatSlice'
import { configureStore } from '@reduxjs/toolkit'
import { filesSlice } from './filesSlice'
import { modalSlice } from './modalSlice'
import { dashboardSlice } from './dashboardSlice'
import { aiSlice } from './aiSlice'
import { previewSlice } from './previewSlice'
import { notificationSlice } from './notificationSlice'
import { emailSlice } from './emailSlice'
import { workSlice } from './workSlice'
import { educationSlice } from './educationSlice'
import { credentialsSlice } from './credentialsSlice'

export const store = configureStore({
  reducer: {
    format: formatSlice.reducer,
    personal: personalSlice.reducer,
    work: workSlice.reducer,
    education: educationSlice.reducer,
    credentials: credentialsSlice.reducer,

    files: filesSlice.reducer,
    modal: modalSlice.reducer,
    dashboard: dashboardSlice.reducer,
    ai: aiSlice.reducer,
    preview: previewSlice.reducer,
    notification: notificationSlice.reducer,
    email: emailSlice.reducer,
  }
})
