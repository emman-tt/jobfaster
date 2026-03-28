import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    emailDetails:{

    }
}
export const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    saveEmailDetails (state, action) {
        state.emailDetails = action.payload
    }
  }
})


export const {saveEmailDetails} = emailSlice.actions