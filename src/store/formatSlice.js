import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showEducationDates: false,
  onlineLinks: [],
  summaryType: 'Professional',
  fileType: 'PDF',
  relevantBulletCount: 4,
  lessRelevantBulletCount: 2,
  bulletPointsMetricsAndCompanyAndResults: 'Italic,font-600'
}
export const formatSlice = createSlice({
  name: 'format',
  initialState,
  reducers: {
    selectSummaryType: (state, action) => {
      state.summaryType = action.payload
    },
    selectFileType: (state, action) => {
      state.fileType = action.payload
    },
    toggleEducationDatesShow: (state, action) => {
      state.showEducationDates = action.payload
    },
    saveBulletCount: (state, action) => {
      const { category, value } = action.payload
      category === 'relevant'
        ? (state.relevantBulletCount = value)
        : (state.lessRelevantBulletCount = value)
    }
    // saveOnlineLinks: (state, action) => {
    //   state.onlineLinks = action.payload
    // }
  }
})

export const {
  selectFileType,
  selectSummaryType,
  saveBulletCount,
  toggleEducationDatesShow
} = formatSlice.actions
