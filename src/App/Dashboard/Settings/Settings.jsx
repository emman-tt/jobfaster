import React, { useEffect, useState } from 'react'
import { User, Bell, Activity as ActivityIcon } from 'lucide-react'
import { data, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import Profile from './Profile'
import Notifications from './Notifications'
import Activity from './Activity'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  updateActivity,
  updateNotification,
  updateProfile
} from '../../../services/settings'
import { fetchSettingsData, getUser } from '../../../services/user'

const SectionHeader = ({ title, description, children }) => {
  const { appearance } = useSelector(state => state.preferences)
  return (
    <div className='flex items-center justify-between py-6'>
      <div className='space-y-1'>
        <h1
          className={`text-2xl font-bold font-satoshi ${
            appearance.theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}
        >
          {title}
        </h1>
        <p
          className={`text-sm ${
            appearance.theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {description}
        </p>
      </div>
      {children}
    </div>
  )
}

const TabButton = ({ id, activeTab, setActiveTab, label, icon: Icon }) => {
  const { appearance } = useSelector(state => state.preferences)
  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
        activeTab === id
          ? 'bg-[#f17e27] text-white shadow-sm'
          : appearance.theme === 'dark'
          ? 'text-slate-400 hover:text-white'
          : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  )
}

export default function Settings () {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const queryClient = useQueryClient()
  const { appearance } = useSelector(state => state.preferences)
  const [draftChanges, setDraftChanges] = useState({})
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['settings'],
    queryFn: () => fetchSettingsData()
  })

  const currentActivity = {
    ...data?.activity,
    ...draftChanges
  }

  const updateMutation = useMutation({
    mutationFn: ({ tab, data }) => {
      if (tab == 'profile') {
        return updateProfile(data)
      }
      if (tab == 'notification') {
        return updateNotification(data)
      }
      if (tab == 'activity') {
        return updateActivity(data)
      }
      return console.warn('unknown tab used', tab)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['settings'] })
  })

  function handleSave (changes) {
    updateMutation.mutate({ activeTab, changes })
  }

  return (
    <section
      className={`w-full h-screen overflow-y-auto [scrollbar-width:none] p-6 lg:p-12 ${
        appearance.theme === 'dark' ? 'bg-[#151515]' : 'bg-white'
      }`}
    >
      <div className='max-w-4xl mx-auto'>
        <SectionHeader
          title='Settings'
          description='Manage your account and preferences.'
        >
          <div className='flex items-center gap-2'>
            <button
              onClick={() => navigate('/dashboard')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                appearance.theme === 'dark'
                  ? 'text-slate-300 hover:bg-slate-800'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className='px-4 py-2 bg-[#f17e27] hover:bg-[#e16d16] text-white text-sm font-medium rounded-lg transition-colors'
            >
              Save Changes
            </button>
          </div>
        </SectionHeader>

        <div
          className={`flex gap-1 p-1 rounded-xl w-fit mb-8 ${
            appearance.theme === 'dark'
              ? 'bg-[#202020]'
              : 'bg-slate-100/80 border border-slate-200'
          }`}
        >
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
            id='activity'
            label='Activity'
            icon={ActivityIcon}
          />
        </div>

        {/* {activeTab === 'profile' && (
          <Profile
            profile={profile}
            setProfile={setProfile}
            handleUpdate={handleUpdate}
          />
        )} */}
        {/* {activeTab === 'notifications' && (
          <Notifications
            notifications={notifications}
            toggleNotification={toggleNotification}
          />
        )} */}
        {/* {activeTab === 'activity' && (
          <Activity activity={activity} toggleActivity={toggleActivity} />
        )} */}
      </div>
    </section>
  )
}
