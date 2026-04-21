import React, { useState } from 'react'
import {
  User,
  Mail,
  Trash2,
  Upload,
  Bell,
  ShieldCheck,
  Github,
  Linkedin
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const SectionHeading = ({ children }) => (
  <h2 className='text-base font-semibold text-slate-800 border-b border-slate-200 pb-2'>
    {children}
  </h2>
)

const Toggle = ({ active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-10 h-5 rounded-full transition-colors relative ${
      active ? 'bg-[#f17e27]' : 'bg-slate-200'
    }`}
  >
    <div
      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${
        active ? 'left-5' : 'left-0.5'
      }`}
    />
  </button>
)

const TabButton = ({ id, activeTab, setActiveTab, label, icon: Icon }) => (
  <button
    onClick={() => setActiveTab(id)}
    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
      activeTab === id
        ? 'bg-[#f17e27] text-white'
        : 'text-slate-500 hover:text-slate-700'
    }`}
  >
    <Icon size={16} />
    {label}
  </button>
)

export default function Settings () {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')

  const [notifications, setNotifications] = useState({
    email: {
      newJobs: true,
      resumeAnalysis: true,
      messages: true,
      newsletter: false,
      productUpdates: true
    },
    push: {
      jobAlerts: true,
      appStatus: false,
      messages: false,
      reminders: true
    }
  })

  const toggleNotification = (type, key) => {
    setNotifications(prev => ({
      ...prev,
      [type]: { ...prev[type], [key]: !prev[type][key] }
    }))
  }

  return (
    <section className='w-full h-screen bg-white overflow-y-auto [scrollbar-width:none] p-6'>
      <div className='max-w-3xl mx-auto space-y-6 pb-16'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-slate-900 font-IBM'>
              Settings
            </h1>
            <p className='text-xs text-slate-500 mt-0.5'>
              Manage your account and preferences
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <button
              onClick={() => navigate('/dashboard')}
              className='px-4 py-2 text-slate-600 text-sm font-medium hover:text-slate-900 transition-colors'
            >
              Cancel
            </button>
            <button className='px-4 py-2 bg-[#f17e27] hover:bg-[#e16d16] text-white text-sm font-medium rounded-lg transition-colors'>
              Save Changes
            </button>
          </div>
        </div>

        <div className='flex gap-1 p-1 bg-white rounded-lg border border-slate-200 w-fit'>
          <TabButton
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            id='profile'
            label='Profile'
            icon={User}
          />
          <TabButton
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            id='notifications'
            label='Notifications'
            icon={Bell}
          />
          <TabButton
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            id='security'
            label='Security'
            icon={ShieldCheck}
          />
        </div>

        {activeTab === 'profile' && (
          <div className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300'>
            <div className='space-y-4'>
              <SectionHeading>Profile Photo</SectionHeading>
              <div className='bg-white rounded-xl p-5 border border-slate-200 flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                  <div className='w-16 h-16 bg-[#fff7ed] rounded-xl flex items-center justify-center border border-dashed border-[#f17e27]/30'>
                    <span className='text-xl font-bold text-[#f17e27]'>EA</span>
                  </div>
                  <div>
                    <h3 className='text-sm font-semibold text-slate-800'>
                      Profile Photo
                    </h3>
                    <p className='text-xs text-slate-500'>
                      JPG, GIF or PNG. Max 2MB
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <button className='p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors'>
                    <Trash2 size={16} />
                  </button>
                  <button className='flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors'>
                    <Upload size={14} />
                    Upload
                  </button>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <SectionHeading>Personal Information</SectionHeading>
              <div className='bg-white rounded-xl p-5 border border-slate-200 space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-1.5'>
                    <label className='text-xs font-semibold text-slate-600'>
                      First Name
                    </label>
                    <input
                      type='text'
                      placeholder='Emmanuel'
                      className='w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#f17e27] focus:ring-1 focus:ring-[#f17e27]/20 outline-none transition-all text-sm text-slate-800'
                    />
                  </div>
                  <div className='space-y-1.5'>
                    <label className='text-xs font-semibold text-slate-600'>
                      Last Name
                    </label>
                    <input
                      type='text'
                      placeholder='Acquah'
                      className='w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#f17e27] focus:ring-1 focus:ring-[#f17e27]/20 outline-none transition-all text-sm text-slate-800'
                    />
                  </div>
                </div>

                <div className='space-y-1.5'>
                  <label className='text-xs font-semibold text-slate-600'>
                    Email Address
                  </label>
                  <div className='relative'>
                    <Mail
                      className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'
                      size={15}
                    />
                    <input
                      type='email'
                      placeholder='emmanuelacquah.dev@gmail.com'
                      className='w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#f17e27] focus:ring-1 focus:ring-[#f17e27]/20 outline-none transition-all text-sm text-slate-800'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <SectionHeading>Connected Accounts</SectionHeading>
              <div className='bg-white rounded-xl p-5 border border-slate-200 space-y-3'>
                {[
                  {
                    id: 'google',
                    name: 'Google',
                    email: 'emmanuelacquah.dev@gmail.com',
                    connected: true
                  },
                  {
                    id: 'github',
                    name: 'GitHub',
                    email: 'Not connected',
                    connected: false
                  },
                  {
                    id: 'linkedin',
                    name: 'LinkedIn',
                    email: 'emmanuelacquah',
                    connected: true
                  }
                ].map(account => (
                  <div
                    key={account.id}
                    className='flex items-center justify-between py-2'
                  >
                    <div className='flex items-center gap-3'>
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          account.id === 'google'
                            ? 'bg-red-50'
                            : account.id === 'github'
                            ? 'bg-slate-100'
                            : 'bg-blue-50'
                        }`}
                      >
                        {account.id === 'google' && (
                          <span className='text-red-500 text-xs font-bold'>
                            G
                          </span>
                        )}
                        {account.id === 'github' && (
                          <Github size={14} className='text-slate-700' />
                        )}
                        {account.id === 'linkedin' && (
                          <Linkedin size={14} className='text-blue-600' />
                        )}
                      </div>
                      <div>
                        <p className='text-sm font-medium text-slate-800'>
                          {account.name}
                        </p>
                        <p className='text-xs text-slate-500'>
                          {account.email}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300'>
            <div className='space-y-4'>
              <SectionHeading>Email Notifications</SectionHeading>
              <div className='bg-white rounded-xl border border-slate-200 overflow-hidden'>
                <div className='divide-y divide-slate-100'>
                  {[
                    {
                      key: 'newJobs',
                      title: 'New Job Matches',
                      desc: 'Get notified when new jobs matching your profile are posted'
                    },
                    {
                      key: 'resumeAnalysis',
                      title: 'Resume Analysis',
                      desc: 'Alerts when your resume is processed by our AI'
                    },
                    {
                      key: 'messages',
                      title: 'Messages',
                      desc: 'Notifications for recruiter messages and replies'
                    },
                    {
                      key: 'newsletter',
                      title: 'Newsletters',
                      desc: 'Weekly digest of career trends and job market tips'
                    },
                    {
                      key: 'productUpdates',
                      title: 'Product Updates',
                      desc: 'News about new product features and updates'
                    }
                  ].map(item => (
                    <div
                      key={item.key}
                      className='p-4 flex items-center justify-between hover:bg-slate-50 transition-colors'
                    >
                      <div>
                        <p className='text-sm font-medium text-slate-800'>
                          {item.title}
                        </p>
                        <p className='text-xs text-slate-500'>{item.desc}</p>
                      </div>
                      <Toggle
                        active={notifications.email[item.key]}
                        onClick={() => toggleNotification('email', item.key)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <SectionHeading>Push Notifications</SectionHeading>
              <div className='bg-white rounded-xl border border-slate-200 overflow-hidden'>
                <div className='divide-y divide-slate-100'>
                  {[
                    {
                      key: 'jobAlerts',
                      title: 'New Job Alerts',
                      desc: 'Push notifications for urgent job openings'
                    },
                    {
                      key: 'appStatus',
                      title: 'Application Status',
                      desc: 'Instant updates on your job applications'
                    },
                    {
                      key: 'messages',
                      title: 'Messages',
                      desc: 'Push notifications for recruiter messages'
                    },
                    {
                      key: 'reminders',
                      title: 'Reminders',
                      desc: 'Push notifications for interviews and tasks'
                    }
                  ].map(item => (
                    <div
                      key={item.key}
                      className='p-4 flex items-center justify-between hover:bg-slate-50 transition-colors'
                    >
                      <div>
                        <p className='text-sm font-medium text-slate-800'>
                          {item.title}
                        </p>
                        <p className='text-xs text-slate-500'>{item.desc}</p>
                      </div>
                      <Toggle
                        active={notifications.push[item.key]}
                        onClick={() => toggleNotification('push', item.key)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
