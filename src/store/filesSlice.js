import { createSlice } from '@reduxjs/toolkit'
import { ResumeHtml } from '../assets/templates/ResumeHtml'
import { roughData } from '../utils/roughData'
const initialState = {
  programs: [
    {
      id: 1,
      type: 'folder',
      name: 'Tech Job Applications 2025',
      size: 4.2,
      files: [
        {
          id: 101,
          type: 'file',
          extension: 'pdf',
          name: 'Google_Senior_Developer.pdf',
          size: 0.8,
          content: roughData,
          layoutId: 3,
          createdAt: '2025-03-20T10:00:00Z'
        },
        {
          id: 102,
          type: 'file',
          extension: 'pdf',
          name: 'Microsoft_Frontend_Lead.pdf',
          size: 0.7,
          content: roughData,
          layoutId: 1,
          createdAt: '2025-03-18T14:30:00Z'
        },
        {
          id: 103,
          type: 'file',
          extension: 'docx',
          name: 'Amazon_Technical_Resume.docx',
          size: 1.2,
          content: roughData,
          layoutId: 3,
          createdAt: '2025-03-15T09:15:00Z'
        }
      ]
    },

    {
      id: 2,
      type: 'folder',
      name: 'Startups & VC',
      size: 2.8,
      files: [
        {
          id: 201,
          type: 'file',
          extension: 'pdf',
          name: 'Stripe_Product_Manager.pdf',
          size: 0.6,
          content: roughData,
          layoutId: 2,
          createdAt: '2025-03-22T11:00:00Z'
        },
        {
          id: 202,
          type: 'file',
          extension: 'pdf',
          name: 'Notion_Growth_Lead.pdf',
          size: 0.9,
          content: roughData,
          layoutId: 4,
          createdAt: '2025-03-19T16:45:00Z'
        }
      ]
    },

    {
      id: 3,
      type: 'folder',
      name: 'Cover Letters',
      size: 1.5,
      files: [
        {
          id: 301,
          type: 'file',
          extension: 'docx',
          name: 'Google_Cover_Letter.docx',
          size: 0.3,
          content: roughData,
          layoutId: null,
          createdAt: '2025-03-20T12:00:00Z'
        },
        {
          id: 302,
          type: 'file',
          extension: 'docx',
          name: 'Microsoft_Cover_Letter.docx',
          size: 0.3,
          content: roughData,
          layoutId: null,
          createdAt: '2025-03-18T10:30:00Z'
        }
      ]
    },

    {
      id: 4,
      type: 'folder',
      name: 'Archived Resumes',
      size: 0,
      files: [],
      createdAt: '2025-03-10T08:00:00Z'
    },

    {
      id: 501,
      type: 'file',
      extension: 'pdf',
      name: 'Sarah_Johnson_Master_Resume.pdf',
      size: 1.4,
      content: roughData,
      layoutId: 5,
      createdAt: '2025-03-24T09:30:00Z'
    },
    {
      id: 502,
      type: 'file',
      extension: 'pdf',
      name: 'Product_Manager_Tech_Resume.pdf',
      size: 1.1,
      content: roughData,
      layoutId: 1,
      createdAt: '2025-03-22T14:00:00Z'
    },
    {
      id: 503,
      type: 'file',
      extension: 'docx',
      name: 'Executive_Bio.docx',
      size: 0.5,
      content: roughData,
      layoutId: 2,
      createdAt: '2025-03-19T11:20:00Z'
    },
    {
      id: 504,
      type: 'file',
      extension: 'pdf',
      name: 'RudyAI_Technical_Resume.pdf',
      size: 0.8,
      content: roughData,
      layoutId: 3,
      createdAt: '2025-03-15T16:00:00Z'
    },
    {
      id: 505,
      type: 'file',
      extension: 'pdf',
      name: 'MTN_Product_Lead.pdf',
      size: 1.2,
      content: roughData,
      layoutId: 4,
      createdAt: '2025-03-12T10:00:00Z'
    },
    {
      id: 506,
      type: 'file',
      extension: 'word',
      name: 'Tilios_Application_Letter.docx',
      size: 0.6,
      content: roughData,
      layoutId: 3,
      createdAt: '2025-03-10T13:45:00Z'
    }
  ]
}
export const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    uploadResume: (state, action) => {
      state.programs.push(action.payload)
    }
  }
})

export const { uploadResume } = filesSlice.actions
