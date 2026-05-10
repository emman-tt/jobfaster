import React from 'react'
import { useSelector } from 'react-redux'
import { Mail } from 'lucide-react'
import SettingRow from './components/SettingRow'
import Toggle from './components/Toggle'
export default function Notifications({ data: notifications, toggleNotification }) {
  const { appearance } = useSelector(state => state.preferences)

  return (
    <div className='animate-in fade-in slide-in-from-bottom-4 duration-300'>
      <SettingRow
        label='Notifications'
        description='Manage your email notification preferences.'
        border={false}
      >
        <div className='space-y-3 max-w-xl'>
          {[
            { key: 'aiOptimizationComplete', title: 'AI Optimization Complete', desc: 'When resume tailoring finishes' },
            { key: 'emailSentFailed', title: 'Email Sent / Failed', desc: 'Application email status' },
            { key: 'newJobs', title: 'Job Matches', desc: 'New jobs matching your profile' }
          ].map(item => (
            <div
              key={item.key}
              className={`flex items-center justify-between p-4 rounded-xl border ${
                appearance.theme === 'dark' ? 'bg-[#2A2A2A] border-0' : 'bg-white border-slate-100 shadow-sm'
              }`}
            >
              <div className='min-w-0 mr-4'>
                <p className={`text-sm font-medium ${appearance.theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                  {item.title}
                </p>
                <p className={`text-xs ${appearance.theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  {item.desc}
                </p>
              </div>
              <div className='flex items-center shrink-0'>
                <label className='flex items-center gap-2 cursor-pointer'>
                  <Mail size={14} className={appearance.theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} />
                  <Toggle
                    active={notifications[item.key]}
                    onChange={() => toggleNotification(item.key)}
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </SettingRow>
    </div>
  )
}
