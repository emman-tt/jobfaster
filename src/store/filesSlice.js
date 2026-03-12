import { createSlice } from '@reduxjs/toolkit'
import { ResumeHtml } from '../App/Dashboard/Preview/ResumeHtml'
const initialState = {
  programs: [
    {
      id: 5,
      type: 'folder',
      name: 'Astroverse',
      size: 3.4,
      files: []
    },
    {
      id: 4,
      type: 'folder',
      name: 'Astroverse',
      size: 3.4,
      files: [
        {
          id: 1,
          type: 'file',
          extension: 'pdf',
          name: 'Kali server application',
          size: 0.5
        },
        {
          id: 2,
          type: 'file',
          extension: 'pdf',
          name: 'IOS resume',
          size: 0.4
        },
        {
          id: 3,
          type: 'file',
          extension: 'pdf',
          name: 'IOS resume',
          size: 0.4
        }
      ]
    },
    {
      id: 1,
      type: 'file',
      extension: 'pdf',
      name: 'RudyAi',
      size: 0.5
    },
    {
      id: 2,
      type: 'file',
      extension: 'word',
      name: 'Tilios application',
      size: 0.9
    },
    {
      id: 3,
      type: 'folder',
      name: 'Astroverse',
      size: 3.4,
      files: [
        {
          id: 1,
          type: 'file',
          extension: 'pdf',
          name: 'Kali server application',
          size: 0.5
        },
        {
          id: 2,
          type: 'file',
          extension: 'word',
          name: 'IOS resume',
          size: 0.4
        },
        {
          id: 3,
          type: 'file',
          extension: 'pdf',
          name: 'IOS resume',
          size: 0.4
        }
      ]
    },
    {
      id: 4,
      type: 'file',
      extension: 'pdf',
      name: 'Mtn resume',
      size: 1.4
    }
  ]
}
export const filesSlice = createSlice({
  name: 'files',
  initialState
})
