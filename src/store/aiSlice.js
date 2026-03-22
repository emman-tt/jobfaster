import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  corrections: [
    {
      id: 1,
      suggestion:
        'Add specific metrics to your internship at XAVS LABS. Mention the percentage increase in rendering speed for large datasets or the number of complex components you built to demonstrate scale.',
      fixContext:
        'Built and maintained complex React UI components including tables, charts, filters, and real-time data views.',
      fixLocation:
        'Work Experience - Frontend Developer Intern role at XAVS LABS'
    },
    {
      id: 2,
      suggestion:
        'Focus on the results of your API integration. Instead of just stating you integrated them, mention how this improved the user checkout speed or reduced data fetch latency.',
      fixContext:
        'Integrated frontend components with REST APIs to support product listings, cart flows, and user actions.',
      fixLocation:
        'Work Experience - Frontend Developer Intern role at SWAGGPA (Startup)'
    },
    {
      id: 3,
      suggestion:
        "Replace the passive 'Worked as' with a high-impact action verb like 'Engineered', 'Architected', or 'Developed' to start your bullet point with more energy.",
      fixContext:
        'Worked as a Frontend Developer Intern on a data-intensive business analytics dashboard.',
      fixLocation:
        'Work Experience - Frontend Developer Intern role at XAVS LABS'
    },
    {
      id: 8,
      suggestion:
        'Your header is missing a phone number and a LinkedIn profile link. Adding these is essential for recruiters to contact you and view your professional endorsements.',
      fixContext: 'emmanuelaquarius2006@gmail.com | github.com/emman-tt',
      fixLocation: 'Header section'
    },
    {
      id: 9,
      suggestion:
        'Provide specific start and end dates (e.g., Month Year - Month Year) for your internship roles to provide a clear timeline of your professional development.',
      fixContext: 'Frontend Developer Intern — XAVS LABS',
      fixLocation:
        'Work Experience - Frontend Developer Intern role at XAVS LABS'
    }
  ],
  correctionsAnswers: [],
  layoutId: 2
}
export const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    saveCorrections: (state, action) => {
      state.corrections = action.payload
    },
    saveCorrectionAnswers: (state, action) => {
      state.correctionsAnswers = action.payload
    },
    changeLayout (state, action) {
      state.layoutId = action.payload
    }
  }
})

export const { saveCorrections, saveCorrectionAnswers, changeLayout } =
  aiSlice.actions
