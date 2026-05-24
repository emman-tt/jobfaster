import React from 'react'
import { useSelector } from 'react-redux'

export default function Toggle({ active, onChange }) {
  const { appearance } = useSelector(state => state.preferences)
  return (
    <button
      onClick={() => onChange(!active)}
      className={`w-11 h-6 rounded-full transition-all relative ${
        active
          ? 'bg-[#f17e27]'
          : appearance.theme === 'dark'
            ? 'bg-zinc-700'
            : 'bg-slate-200'
      }`}
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all ${
          active ? 'left-6' : 'left-1'
        }`}
      />
    </button>
  )
}
