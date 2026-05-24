import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  MoreVertical,
  Check,
  Globe,
  Layout,
  Monitor,
  Download
} from 'lucide-react'
import {
  setTheme,
  setSidebar,
  setCompactMode,
  setExportFormat,
  setFileNaming
} from '../../store/preferencesSlice'

import systemThemeImg from '../../assets/img/systemMode.png'
import lightThemeImg from '../../assets/img/lightMode.png'
import darkThemeImg from '../../assets/img/darkMode.png'

const SectionHeader = ({ title, description }) => {
  const { appearance } = useSelector(state => state.preferences)
  return (
    <div className='flex items-center justify-between py-4 sm:py-6'>
      <div className='space-y-1'>
        <h1
          className={`text-xl sm:text-2xl font-bold font-satoshi ${
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
    </div>
  )
}

const SettingRow = ({ label, description, children, border = true }) => {
  const { appearance } = useSelector(state => state.preferences)
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 py-6 sm:py-8 ${
        border
          ? `border-t ${
              appearance.theme === 'dark'
                ? 'border-zinc-800'
                : 'border-slate-100'
            }`
          : ''
      }`}
    >
      <div className='md:col-span-4 space-y-1'>
        <h3
          className={`text-sm font-semibold ${
            appearance.theme === 'dark' ? 'text-slate-200' : 'text-slate-700'
          }`}
        >
          {label}
        </h3>
        <p
          className={`text-xs ${
            appearance.theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {description}
        </p>
      </div>
      <div className='md:col-span-8'>{children}</div>
    </div>
  )
}

const ThemeCard = ({ type, label, active, onClick, image }) => {
  const { appearance } = useSelector(state => state.preferences)
  return (
    <div className='space-y-3 cursor-pointer group' onClick={onClick}>
      <div
        className={`relative aspect-4/3 rounded-xl border-2 transition-all overflow-hidden ${
          active
            ? 'border-[#f17e27]'
            : appearance.theme === 'dark'
            ? 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
            : 'border-zinc-200 bg-zinc-50 hover:border-zinc-300'
        }`}
      >
        <img src={image} alt={label} className='w-full h-full object-cover' />
        {active && (
          <div className='absolute top-2 right-2 w-5 h-5 bg-[#f17e27] rounded-full flex items-center justify-center text-white shadow-sm'>
            <Check size={12} strokeWidth={3} />
          </div>
        )}
      </div>
      <span
        className={`text-sm font-medium block text-center ${
          active
            ? 'text-[#f17e27]'
            : appearance.theme === 'dark'
            ? 'text-slate-400'
            : 'text-slate-600'
        }`}
      >
        {label}
      </span>
    </div>
  )
}

const Toggle = ({ active, onChange }) => (
  <button
    onClick={() => onChange(!active)}
    className={`w-11 h-6 rounded-full transition-all
        
         relative ${
           active ? 'bg-[#f17e27]' : 'bg-slate-200 dark:bg-zinc-800'
         }`}
  >
    <div
      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all ${
        active ? 'left-6' : 'left-1'
      }`}
    />
  </button>
)

const RadioOption = ({ label, checked, onChange }) => {
  const { appearance } = useSelector(state => state.preferences)
  return (
    <label className='flex items-center gap-3 cursor-pointer group'>
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
          checked
            ? 'border-[#f17e27]'
            : appearance.theme === 'dark'
            ? 'border-zinc-700'
            : 'border-slate-300'
        }`}
      >
        {checked && <div className='w-2.5 h-2.5 rounded-full bg-[#f17e27]' />}
      </div>
      <span
        className={`text-sm ${
          checked
            ? appearance.theme === 'dark'
              ? 'text-white'
              : 'text-slate-900'
            : appearance.theme === 'dark'
            ? 'text-slate-400'
            : 'text-slate-600'
        }`}
      >
        {label}
      </span>
      <input
        type='radio'
        className='hidden'
        checked={checked}
        onChange={onChange}
      />
    </label>
  )
}

export default function Prefrences () {
  const dispatch = useDispatch()
  const { appearance, export: exportPref } = useSelector(
    state => state.preferences
  )

  return (
    <section
      className={`w-full h-screen overflow-y-auto [scrollbar-width:none] p-4 sm:p-6 lg:p-12 ${
        appearance.theme === 'dark' ? 'bg-[#151515]' : 'bg-white'
      }`}
    >
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <SectionHeader
          title='Appearance'
          description='Customize how the platform looks and feels on your device.'
        />

        {/* Interface Theme */}
        <SettingRow
          label='Interface theme'
          description='Select or customize your UI theme.'
        >
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl'>
            <ThemeCard
              type='light'
              label='Light'
              active={appearance.theme === 'light'}
              onClick={() => dispatch(setTheme('light'))}
              image={lightThemeImg}
            />
            <ThemeCard
              type='dark'
              label='Dark'
              active={appearance.theme === 'dark'}
              onClick={() => dispatch(setTheme('dark'))}
              image={darkThemeImg}
            />
          </div>
        </SettingRow>

        {/* Accessibility / Compact Mode */}
        <SettingRow
          label='Compact mode'
          description='Reduce spacing to show more content at once. Ideal for smaller screens.'
        >
          <div
            className={`flex items-center justify-between p-3 sm:p-4 rounded-xl border ${
              appearance.theme == 'dark' ? 'bg-[#2A2A2A] border-0' : 'bg-white'
            } border-slate-100`}
          >
            <div className='flex items-center gap-3'>
              <div
                className={`p-2  ${
                  appearance.theme == 'dark' ? 'bg-gray-600' : ' bg-gray-50'
                }  rounded-lg shadow-sm text-[#f17e27]`}
              >
                <Layout size={18} />
              </div>
              <div>
                <p
                  className={`text-sm font-medium ${
                    appearance.theme === 'dark'
                      ? 'text-white'
                      : 'text-slate-900'
                  }`}
                >
                  Enable Compact Mode
                </p>
              </div>
            </div>
            <Toggle
              active={appearance.compactMode}
              onChange={val => dispatch(setCompactMode(val))}
            />
          </div>
        </SettingRow>

        {/* Region & Language Section Placeholder */}
        <div className='mt-8 sm:mt-12 mb-4 sm:mb-6'>
          <h2
            className={`text-base sm:text-lg font-bold font-satoshi ${
              appearance.theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            General Preferences
          </h2>
          <p
            className={`text-sm ${
              appearance.theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Default settings for your account activities.
          </p>
        </div>

        {/* Language Selection */}
        <SettingRow
          label='Display Language'
          description='Choose the language used throughout the application.'
        >
          <div className='flex items-center gap-3 w-full sm:w-72'>
            <div
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border w-full cursor-pointer ${
                appearance.theme === 'dark'
                  ? 'bg-[#2A2A2A] border-0 text-white'
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <Globe size={16} className='text-slate-400' />
              <span className='text-sm flex-1'>English (United States)</span>
              <Check size={14} className='text-[#f17e27]' />
            </div>
          </div>
        </SettingRow>

        {/* Export Defaults */}
        <SettingRow
          label='Default Export Format'
          description='Set the default format for your resume downloads.'
        >
          <div className='flex flex-wrap gap-3'>
            {['PDF', 'DOCX', 'JSON'].map(format => (
              <button
                key={format}
                onClick={() => dispatch(setExportFormat(format.toLowerCase()))}
                className={`px-4 py-2 cursor-pointer rounded-lg text-sm font-medium border transition-all ${
                  exportPref.format === format.toLowerCase()
                    ? 'border-[#f17e27] bg-[#f17e27] text-white shadow-none shadow-[#f17e27]/20'
                    : appearance.theme === 'dark'
                    ? ' border-0  bg-[#2A2A2A] text-zinc-400 hover:border-zinc-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                {format}
              </button>
            ))}
          </div>
        </SettingRow>

        {/* File Naming */}
        <SettingRow
          label='File Naming Convention'
          description='How your downloaded files will be named by default.'
        >
          <select
            value={exportPref.fileNaming}
            onChange={e => dispatch(setFileNaming(e.target.value))}
            className={`w-full sm:w-72 px-8 py-2.5 rounded-lg border outline-none text-sm transition-all ${
              appearance.theme == 'dark'
                ? 'bg-[#2A2A2A] border-0 text-white '
                : 'bg-white border-slate-200 text-slate-700 '
            }`}
          >
            <option value='resume_name'>Resume_{'{name}'}</option>
            <option value='name_resume'>{'{name}'}_Resume</option>
            <option value='date_name'>
              {'{date}'}_{'{name}'}
            </option>
            <option value='custom'>Custom Pattern</option>
          </select>
        </SettingRow>
      </div>
    </section>
  )
}
