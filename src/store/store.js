import { personalSlice } from './personalSlice'
import { configureStore } from '@reduxjs/toolkit'
import { modalSlice } from './modalSlice'
import { dashboardSlice } from './dashboardSlice'
import { aiSlice } from './aiSlice'
import { previewSlice } from './previewSlice'
import { notificationSlice } from './notificationSlice'
import { preferencesSlice } from './preferencesSlice'
import { emailSlice } from './emailSlice'
import { workSlice } from './workSlice'
import { educationSlice } from './educationSlice'
import { credentialsSlice } from './credentialsSlice'
import { editorSlice } from './editorSlice'

export const store = configureStore({
  reducer: {
    personal: personalSlice.reducer,
    work: workSlice.reducer,
    education: educationSlice.reducer,
    credentials: credentialsSlice.reducer,
    modal: modalSlice.reducer,
    dashboard: dashboardSlice.reducer,
    ai: aiSlice.reducer,
    preview: previewSlice.reducer,
    notification: notificationSlice.reducer,
    email: emailSlice.reducer,
    editor: editorSlice.reducer,
    preferences: preferencesSlice.reducer
  }

})
