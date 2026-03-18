import { createSlice } from '@reduxjs/toolkit'

const initial = {
  name: 'John Smith',
  title: 'Senior Software Engineer',
  contact: {
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA'
  }
}
export const previewSlice = createSlice({
  name: 'preview',
  initialState: initial
})
