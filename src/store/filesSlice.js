import { createSlice } from '@reduxjs/toolkit'
import { ResumeHtml } from '../assets/templates/ResumeHtml'
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
          size: 0.5,
          content: ResumeHtml[0].content
        },
        {
          id: 2,
          type: 'file',
          extension: 'pdf',
          name: 'IOS resume',
          size: 0.4,
          content: ResumeHtml[1].content
        },
        {
          id: 3,
          type: 'file',
          extension: 'pdf',
          name: 'IOS resume',
          size: 0.4,
          content: ResumeHtml[2].content
        }
      ]
    },
    {
      id: 1,
      type: 'file',
      extension: 'pdf',
      name: 'RudyAi',
      size: 0.5,
      content: ResumeHtml[3].content
    },
    {
      id: 2,
      type: 'file',
      extension: 'word',
      name: 'Tilios application',
      size: 0.9,
      content: ResumeHtml[4].content
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
          size: 0.5,
          content: ResumeHtml[7].content

        },
        {
          id: 2,
          type: 'file',
          extension: 'word',
          name: 'IOS resume',
          size: 0.4,
          content: ResumeHtml[5].content
        },
        {
          id: 3,
          type: 'file',
          extension: 'pdf',
          name: 'IOS resume',
          size: 0.4,
          content: ResumeHtml[6].content
        }
      ]
    },
    {
      id: 6,
      type: 'file',
      extension: 'pdf',
      name: 'Mtn resume',
      size: 1.4,
      content: ResumeHtml[4].content
    }
  ]
}
export const filesSlice = createSlice({
  name: 'files',
  initialState
})
