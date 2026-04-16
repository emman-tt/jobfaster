import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showHeader: true,
  showRightbar: false,
  editor: {
    templateId: 1
  }
}

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    toggleHeader: (state, action) => {
      state.showHeader = action.payload
    },
    toggleRightbar: (state, action) => {
      state.showRightbar = action.payload
    },
    saveTemplateId (state, action) {
      state.editor.templateId = action
    }
  }
})

export const { toggleHeader, toggleRightbar, saveTemplateId } =
  dashboardSlice.actions
