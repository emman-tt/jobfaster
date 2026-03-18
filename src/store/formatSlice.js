import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showEducationDates: false,
  onlineLinks: [],

  fileType: 'PDF',
  relevantBulletCount: 4,
  lessRelevantBulletCount: 2,
  MetricsStlyes: {
    font: 'Italic',
    fontWeight: 'font-600',
    italic: true
  },
  hobbies: '',
  styles: {
    headerStyles: {
      font: 'Inter',
      size: 20,
      align: 'center'
    },
    bulletStyles: {
      font: 'Inter',
      size: 14,
      bulletingType: 'disc'
    },
    bodyStyles: {
      font: 'Inter',
      size: 11,
      align: 'left'
    }
  },
  errors: {}
}
export const formatSlice = createSlice({
  name: 'format',
  initialState,
  reducers: {
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
    },
    saveOnlineLinks: (state, action) => {
      state.onlineLinks = action.payload
    },
    saveErrors: (state, action) => {
      state.errors = action.payload
    },
    saveHobbies: (state, action) => {
      state.hobbies = action.payload
    },
    saveStyles: (state, action) => {
      const { category, value } = action.payload
      if (category === 'header') {
        state.styles.headerStyles = value
      } else if (category === 'bullet') {
        state.styles.bulletStyles = value
      } else {
        state.styles.bodyStyles = value
      }
    }
  }
})

export const {
  selectFileType,
  saveBulletCount,
  toggleEducationDatesShow,
  saveOnlineLinks,
  saveErrors,
  saveStyles,
  saveHobbies
} = formatSlice.actions
