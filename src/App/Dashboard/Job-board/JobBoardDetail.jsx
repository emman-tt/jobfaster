import React, { useState, useEffect } from 'react'
import { MapPin, Building2, DollarSign, Briefcase, Globe, Trash2, Save, Edit2, ArrowRight } from 'lucide-react'
import { useSelector } from 'react-redux'

export default function JobBoardDetail({ job, onSave, onDelete, isSaving, isDeleting }) {
  const { appearance } = useSelector(state => state.preferences)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    if (job) {
      setFormData({
        id: job.id,
        jobTitle: job.jobTitle || '',
        employerName: job.employerName || '',
        employerWebsite: job.employerWebsite || '',
        jobLocation: job.jobLocation || '',
        jobEmploymentType: job.jobEmploymentType || '',
        jobSalaryString: job.jobSalaryString || '',
        jobDescription: job.jobDescription || '',
        status: job.status || 'saved'
      })
    }
  }, [job])

  function handleChange(e) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSave() {
    onSave(formData)
    setIsEditing(false)
  }

  function inputClass() {
    return `w-full px-3 py-2 rounded-lg text-sm transition-all outline-none ${
      isEditing
        ? 'border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-[#f17e27]/20 focus:border-[#f17e27]'
        : 'border border-transparent bg-transparent hover:bg-gray-100 focus:bg-white focus:border-gray-300'
    } ${appearance.theme === 'dark' && isEditing ? '!bg-[#202020] !border-slate-600 text-white' : ''}`
  }

  if (!job) return null

  return (
    <div className={`w-full h-full flex flex-col ${appearance.theme === 'dark' ? 'bg-[#2a2a2a] text-white' : 'bg-white text-slate-900'}`}>
      {/* Grip bar for mobile */}
      <div className='h-6 left-0 right-0 bg-inherit sticky top-0 w-full sm:hidden z-10 flex items-center justify-center'>
        <div className='w-8 h-1 rounded-full bg-slate-300' />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {/* Header */}
        <div className="p-6 pb-4 pt-2 sm:pt-6">
          <div className="flex gap-4 items-start">
            <div className="w-16 h-16 shrink-0 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
              {job.employerLogo ? (
                <img src={job.employerLogo} alt="" className="w-full h-full object-contain" />
              ) : (
                <span className="text-2xl font-bold text-gray-400">{job.employerName?.[0]}</span>
              )}
            </div>
            
            <div className="flex-1 space-y-2">
              <input
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className={`text-xl font-bold font-IBM ${inputClass()}`}
                placeholder="Job Title"
              />
              <div className="flex gap-2 items-center">
                <Building2 className="w-3.5 h-3.5 text-gray-400" />
                <input
                  name="employerName"
                  value={formData.employerName}
                  onChange={handleChange}
                  className={`text-sm font-medium text-[#f17e27] ${inputClass()}`}
                  placeholder="Company Name"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tags / Meta */}
        <div className="px-6 grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <input
              name="jobLocation"
              value={formData.jobLocation}
              onChange={handleChange}
              className={inputClass()}
              placeholder="Location"
            />
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-gray-400" />
            <input
              name="jobEmploymentType"
              value={formData.jobEmploymentType}
              onChange={handleChange}
              className={inputClass()}
              placeholder="Employment Type"
            />
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <input
              name="jobSalaryString"
              value={formData.jobSalaryString}
              onChange={handleChange}
              className={inputClass()}
              placeholder="Salary"
            />
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-400" />
            <input
              name="employerWebsite"
              value={formData.employerWebsite}
              onChange={handleChange}
              className={inputClass()}
              placeholder="Website"
            />
          </div>
        </div>

        {/* Description */}
        <div className="px-6 pb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1 mb-2">Description</p>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            className={`w-full min-h-[120px] resize-y leading-relaxed ${inputClass()}`}
            placeholder="Job description..."
          />
        </div>
      </div>

      {/* Actions - always at bottom */}
      <div className="shrink-0 p-6 pt-4 flex  sm:flex-row gap-3 border-t sm:border-t-0 border-gray-100">
        {job.jobApplyLink && (
          <a
            href={job.jobApplyLink}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-[#f17e27] hover:bg-[#e16d16] text-white text-xs font-bold rounded-xl shadow-lg shadow-orange-100/50 transition-all active:scale-[0.98]"
          >
            <ArrowRight className="w-4 h-4" />
            APPLY NOW
          </a>
        )}
        
        <button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          disabled={isSaving}
          className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all active:scale-[0.98] border ${
            appearance.theme === 'dark'
              ? 'border-slate-600 text-slate-300 hover:bg-slate-800'
              : 'border-gray-200 text-slate-600 hover:bg-gray-50'
          }`}
        >
          {isSaving ? 'Saving...' : isEditing ? <><Save className="w-4 h-4" /> SAVE</> : <><Edit2 className="w-4 h-4" /> EDIT</>}
        </button>

        <button
          onClick={() => onDelete(job.id)}
          disabled={isDeleting}
          className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all active:scale-[0.98] border border-rose-100 text-rose-500 hover:bg-rose-50 ${
            appearance.theme === 'dark' && 'border-rose-900/30 text-rose-400 hover:bg-rose-900/20'
          }`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
