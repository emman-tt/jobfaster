import React from 'react'
import { useSelector } from 'react-redux'

export default function SettingRow({ label, description, children, border = true }) {
  const { appearance } = useSelector(state => state.preferences)
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-12 gap-6 py-8 ${
        border
          ? `border-t ${
              appearance.theme === 'dark'
                ? 'border-slate-800'
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
          className={`text-xs pr-4 ${
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
