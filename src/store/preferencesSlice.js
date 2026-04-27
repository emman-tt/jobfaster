import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  resume: {
    template: 'classic',
    paperSize: 'letter',
    font: 'inter',
    fontSize: '12pt',
    lineSpacing: '1.5'
  },
  ai: {
    tone: 'professional',
    autoOptimize: false,
    addMetrics: 'ask',
    strengthenVerbs: 'ask'
  },
  appearance: {
    theme: 'light',
    sidebar: 'expanded',
    compactMode: false
  },
  export: {
    format: 'pdf',
    fileNaming: 'resume_name',
    includeCoverLetter: false
  },
  notifications: {
    aiComplete: true,
    weeklyDigest: true,
    appStatus: false,
    marketing: false
  },
  editor: {
    autoSave: true,
    charCount: false,
    atsScore: true,
    spellCheck: true
  }
}

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setResumeTemplate: (state, action) => {
      state.resume.template = action.payload
    },
    setPaperSize: (state, action) => {
      state.resume.paperSize = action.payload
    },
    setDefaultFont: (state, action) => {
      state.resume.font = action.payload
    },
    setDefaultFontSize: (state, action) => {
      state.resume.fontSize = action.payload
    },
    setLineSpacing: (state, action) => {
      state.resume.lineSpacing = action.payload
    },
    setAiTone: (state, action) => {
      state.ai.tone = action.payload
    },
    setAutoOptimize: (state, action) => {
      state.ai.autoOptimize = action.payload
    },
    setAddMetrics: (state, action) => {
      state.ai.addMetrics = action.payload
    },
    setStrengthenVerbs: (state, action) => {
      state.ai.strengthenVerbs = action.payload
    },
    setTheme: (state, action) => {
      state.appearance.theme = action.payload
    },
    setSidebar: (state, action) => {
      state.appearance.sidebar = action.payload
    },
    setCompactMode: (state, action) => {
      state.appearance.compactMode = action.payload
    },
    setExportFormat: (state, action) => {
      state.export.format = action.payload
    },
    setFileNaming: (state, action) => {
      state.export.fileNaming = action.payload
    },
    setIncludeCoverLetter: (state, action) => {
      state.export.includeCoverLetter = action.payload
    },
    setAiCompleteNotification: (state, action) => {
      state.notifications.aiComplete = action.payload
    },
    setWeeklyDigestNotification: (state, action) => {
      state.notifications.weeklyDigest = action.payload
    },
    setAppStatusNotification: (state, action) => {
      state.notifications.appStatus = action.payload
    },
    setMarketingNotification: (state, action) => {
      state.notifications.marketing = action.payload
    },
    setAutoSave: (state, action) => {
      state.editor.autoSave = action.payload
    },
    setCharCount: (state, action) => {
      state.editor.charCount = action.payload
    },
    setAtsScore: (state, action) => {
      state.editor.atsScore = action.payload
    },
    setSpellCheck: (state, action) => {
      state.editor.spellCheck = action.payload
    }
  }
})

export const {
  setResumeTemplate,
  setPaperSize,
  setDefaultFont,
  setDefaultFontSize,
  setLineSpacing,
  setAiTone,
  setAutoOptimize,
  setAddMetrics,
  setStrengthenVerbs,
  setTheme,
  setSidebar,
  setCompactMode,
  setExportFormat,
  setFileNaming,
  setIncludeCoverLetter,
  setAiCompleteNotification,
  setWeeklyDigestNotification,
  setAppStatusNotification,
  setMarketingNotification,
  setAutoSave,
  setCharCount,
  setAtsScore,
  setSpellCheck
} = preferencesSlice.actions
