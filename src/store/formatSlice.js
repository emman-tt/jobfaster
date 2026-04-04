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


  styless: {
    fontType: 'calibri',
    name: {
      size: 24,
      weight: 'font-bold',
      style: 'normal',
      case: 'none',
      spacing: 10,
      color: 'text-slate-800'
    },

    // Section Headers
    sectionHeader: {
      size: 13,
      weight: 'font-bold',
      style: 'normal',
      case: 'uppercase',
      spacing: 2,
      color: 'text-slate-800'
    },

    //  Company/School (Bold)
    company: {
      size: 12, // 12px
      weight: 'font-bold',
      style: 'normal',
      case: 'none',
      color: 'text-slate-800',
      spacing: 0
    },

    //  Job Title/Role (Italic)
    jobTitle: {
      size: 12,
      weight: 'font-normal',
      style: 'normal',
      case: 'none',
      color: 'text-slate-500',
      spacing: 1
    },

    // Bullets & Skills & Degree (Regular)
    bodyText: {
      size: 12,
      weight: 'font-normal',
      style: 'normal',
      case: 'none',
      spacing: 0,
      color: 'text-slate-600'
    },

    // Dates
    date: {
      size: 11,
      weight: 'font-normal',
      style: 'italic',
      case: 'none',
      spacing: 0,
      color: 'text-slate-400'
    },
    //  Contact Info (Location, Phone, Email)
    contact: {
      size: 12,
      weight: 'font-normal',
      style: 'normal',
      case: 'none',
      spacing: 0,
      color: 'text-slate-400'
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
    selectFontType: (state, action) => {
      state.styless.fontType = action.payload
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

    updateGroupStyle: (state, action) => {
      const { category, field, value } = action.payload
      if (state.styless[category]) {
        state.styless[category][field] = value
      }
    }
  }
})

export const {
  selectFileType,
  selectFontType,
  saveBulletCount,
  toggleEducationDatesShow,
  saveOnlineLinks,
  saveErrors,
  saveHobbies,
  updateGroupStyle
} = formatSlice.actions
