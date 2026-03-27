import { createSlice } from '@reduxjs/toolkit'

const initial = {
  previewType: ''
}
export const previewSlice = createSlice({
  name: 'preview',
  initialState: initial,
  reducers: {
    setPreviewType (state, action) {
      state.previewType = action.payload
    }
  }
})
