import { createSlice } from '@reduxjs/toolkit'
import { ResumeHtml } from '../assets/templates/ResumeHtml'
import { roughData, frontendResumeData } from '../utils/roughData'

const initialState = {
  programs: [
    {
      id: 1,
      type: 'folder',
      name: 'Tech Job Applications 2025',
      size: 4.2,
      createdAt: '2025-03-10T08:00:00Z',
      files: [
        {
          id: 101,
          type: 'file',
          source: 'builder',
          extension: 'pdf',
          name: 'Google_Senior_Developer',
          size: 0.8,
          content: roughData,
          layoutId: 3,
          createdAt: '2025-03-20T10:00:00Z'
        }
      ]
    },

    {
      id: 2,
      type: 'folder',
      name: 'Startups & VC',
      size: 2.8,
      createdAt: '2025-03-10T08:00:00Z',
      files: [
        {
          id: 'af7d0ec7',
          type: 'file',
          layoutId: null,
          source: 'upload',
          extension: 'pdf',
          name: 'Emmanuel Resume.pdf',

          size: 226937,
          content:
            'https://res.cloudinary.com/drpnhajh9/image/upload/v1775417800/Jobfaster/1775417796836-Emmanuel%20Resume.pdf',
          createdAt: '2026-04-05T19:36:41.075Z'
        },
        {
          id: 'a77d0ecv',
          type: 'file',
          layoutId: null,
          source: 'upload',
          extension: 'pdf',
          name: 'Emmanuel Resume.pdf',

          size: 226937,
          content:
            'https://res.cloudinary.com/drpnhajh9/image/upload/v1775417800/Jobfaster/1775417796836-Emmanuel%20Resume.pdf',
          createdAt: '2026-04-05T19:36:41.075Z'
        }
      ]
    },
    {
      id: 101,
      type: 'file',
      source: 'builder',
      extension: 'pdf',
      name: 'Google_Senior_Developer',
      size: 0.8,
      content: roughData,
      layoutId: 3,
      createdAt: '2025-03-20T10:00:00Z'
    },
    {
      id: 3,
      type: 'folder',
      name: 'Cover Letters',
      size: 1.5,
      createdAt: '2025-03-10T08:00:00Z',
      files: [
        {
          id: 'a77d0ec3',
          type: 'file',
          layoutId: null,
          source: 'upload',
          extension: 'pdf',
          name: 'Emmanuel Resume.pdf',

          size: 226937,
          content:
            'https://res.cloudinary.com/drpnhajh9/image/upload/v1775417800/Jobfaster/1775417796836-Emmanuel%20Resume.pdf',
          createdAt: '2026-04-05T19:36:41.075Z'
        }
      ]
    },

    {
      id: 4,
      type: 'folder',
      name: 'Archived Resumes',
      size: 0,
      createdAt: '2025-03-10T08:00:00Z',
      files: []
    },
    {
      id: 'a77d0ec7',
      type: 'file',
      layoutId: null,
      source: 'upload',
      extension: 'pdf',

      name: 'Emmanuel Resume.pdf',
      download:
        'https://res.cloudinary.com/drpnhajh9/image/upload/v1775417800/Jobfaster/1775417796836-Emmanuel%20Resume.pdf',
      size: 226937,
      content:
        'https://res.cloudinary.com/drpnhajh9/image/upload/v1775417800/Jobfaster/1775417796836-Emmanuel%20Resume.pdf',
      createdAt: '2026-04-05T19:36:41.075Z'
    }
  ]
}
export const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    saveProgram: (state, action) => {
      state.programs.push(action.payload)
    }
  }
})

export const { saveProgram } = filesSlice.actions
