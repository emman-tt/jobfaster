import React from 'react'
import { useSelector } from 'react-redux'
import { FileText, FolderOpen, BriefcaseBusiness, Mail, Sparkles, Bookmark } from 'lucide-react'
import SettingRow from './components/SettingRow'
import Toggle from './components/Toggle'

const activities = [
  { key: 'fileUploads', title: 'File Uploads', desc: 'When you upload files to your account', icon: FileText },
  { key: 'folderCreation', title: 'Folder Creation', desc: 'When you create new folders', icon: FolderOpen },
  { key: 'jobApplications', title: 'Job Applications', desc: 'When you apply for jobs', icon: BriefcaseBusiness },
  { key: 'emailSending', title: 'Email Sending', desc: 'When you send application emails', icon: Mail },
  { key: 'resumeTailoring', title: 'Resume Tailoring', desc: 'When AI optimizes your resume', icon: Sparkles },
  { key: 'jobTracking', title: 'Job Tracking', desc: 'When you save or update tracked jobs', icon: Bookmark }
]

export default function Activity({ activity, toggleActivity }) {
  const { appearance } = useSelector(state => state.preferences)
  return (
    <div className='animate-in fade-in slide-in-from-bottom-4 duration-300'>
      <SettingRow
        label='Activity Tracking'
        description='Choose which activities you want to be tracked and logged.'
        border={false}
      >
        <div className='space-y-3 max-w-xl'>
          {activities.map(item => {
            const Icon = item.icon
            return (
              <div
                key={item.key}
                className={`flex items-center justify-between p-4 rounded-xl border ${
                  appearance.theme === 'dark' ? 'bg-[#2A2A2A] border-0' : 'bg-white border-slate-100 shadow-sm'
                }`}
              >
                <div className='flex items-center gap-3'>
                  <div className={`p-2 rounded-lg ${appearance.theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}`}>
                    <Icon size={16} className='text-[#f17e27]' />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${appearance.theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                      {item.title}
                    </p>
                    <p className={`text-xs ${appearance.theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
                <Toggle
                  active={activity[item.key]}
                  onChange={() => toggleActivity(item.key)}
                />
              </div>
            )
          })}
        </div>
      </SettingRow>
    </div>
  )
}
