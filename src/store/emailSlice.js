import { createSlice } from '@reduxjs/toolkit'
import { Dumbbell } from 'lucide-react'

const initialState = {
  emailDetails: {}
}
export const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    saveEmailDetails (state, action) {
      const { category, value } = action.payload
      state.emailDetails[category] = value
    },
    dumpEmailDetails (state, action) {
      state.emailDetails = action.payload
    }
  }
})

export const { saveEmailDetails ,dumpEmailDetails} = emailSlice.actions
