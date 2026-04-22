import React, { useState } from 'react'
import { MapPin, Sparkles, ArrowRight, Globe, Clock } from 'lucide-react'
import { findEmail, getApplyInfo } from '../../../utils/findEmail'
import { useSelector } from 'react-redux'
import ApplyDialog from './ApplyDialog'

export default function JobDetailView ({ job }) {
  const [showApplyDialog, setShowApplyDialog] = useState(false)
  const { appearance } = useSelector(state => state.preferences)

  if (!job) return null

  const salary = job.jobSalaryString || job.jobSalary || 'Not disclosed'
  const requirements = job.jobHighlights?.Qualifications || []
  const responsibilities = job.jobHighlights?.Responsibilities || []

  const applyInfo = getApplyInfo(job)
  const jobWithApplyInfo = { ...job, applyInfo }

  return (
    <div className='p-6 pb-20'>
      <div className='space-y-6 pt-15'>
        <div>
          <h2
            className={`text-lg font-bold leading-tight font-IBM ${
              appearance.theme == 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            {job.jobTitle}
          </h2>
          <p className='text-xs font-bold text-[#f17e27] mt-2 uppercase tracking-wider'>
            {job.employerName}
          </p>
          <div
            className={`flex flex-wrap items-center gap-3 mt-3 ${
              appearance.theme == 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            <span className='flex items-center gap-1.5 text-xs'>
              <MapPin className='w-3.5 h-3.5' />
              {job.jobLocation}
            </span>
            <span className='flex items-center gap-1.5 text-xs'>
              <Clock className='w-3.5 h-3.5' />
              {job.jobPostedHumanReadable}
            </span>
            {job.employerWebsite && (
              <span className='flex items-center gap-1.5 text-xs text-blue-600 hover:underline cursor-pointer'>
                <Globe className='w-3.5 h-3.5' />
                Website
              </span>
            )}
          </div>
        </div>

        <div className='flex items-center gap-2 flex-wrap'>
          <span className='px-3 py-1.5 bg-[#fff7ed] text-[#f17e27] rounded-full text-[10px] font-bold uppercase tracking-wider'>
            {job.jobEmploymentType}
          </span>
          <span
            className={`px-3 py-1.5 rounded-full text-[10px] font-medium ${
              appearance.theme == 'dark'
                ? 'bg-[#202020] text-slate-300'
                : 'bg-gray-100 text-slate-600'
            }`}
          >
            {salary}
          </span>
        </div>

        <div className='space-y-5'>
          <div>
            <h3
              className={`text-[11px] font-bold uppercase tracking-wider mb-3 ${
                appearance.theme == 'dark' ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              Description
            </h3>
            <p
              className={`text-sm leading-relaxed whitespace-pre-line ${
                appearance.theme == 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {job.jobDescription}
            </p>
          </div>

          {responsibilities?.length > 0 && (
            <div
              className={`pt-4 border-t ${
                appearance.theme == 'dark'
                  ? 'border-slate-700'
                  : 'border-gray-100'
              }`}
            >
              <h3
                className={`text-[11px] font-bold uppercase tracking-wider mb-4 ${
                  appearance.theme == 'dark'
                    ? 'text-slate-500'
                    : 'text-slate-400'
                }`}
              >
                Responsibilities
              </h3>
              <ul className='space-y-3'>
                {responsibilities.map((resp, index) => (
                  <li
                    key={index}
                    className={`flex items-start gap-3 text-sm ${
                      appearance.theme == 'dark'
                        ? 'text-slate-300'
                        : 'text-slate-600'
                    }`}
                  >
                    <span className='w-1.5 h-1.5 bg-[#f17e27] rounded-full mt-1.5 shrink-0' />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {requirements?.length > 0 && (
            <div
              className={`pt-4 border-t ${
                appearance.theme == 'dark'
                  ? 'border-slate-700'
                  : 'border-gray-100'
              }`}
            >
              <h3
                className={`text-[11px] font-bold uppercase tracking-wider mb-4 ${
                  appearance.theme == 'dark'
                    ? 'text-slate-500'
                    : 'text-slate-400'
                }`}
              >
                Requirements
              </h3>
              <ul className='space-y-3'>
                {requirements.map((req, index) => (
                  <li
                    key={index}
                    className={`flex items-start gap-3 text-sm ${
                      appearance.theme == 'dark'
                        ? 'text-slate-300'
                        : 'text-slate-600'
                    }`}
                  >
                    <span className='w-1.5 h-1.5 bg-[#f17e27] rounded-full mt-1.5 shrink-0' />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className='flex flex-col justify-center  items-center '>
          <button
            className={`w-[80%] cursor-pointer flex items-center justify-center gap-2 px-5 py-4.5 bg-[#f17e27] hover:bg-[#e16d16] text-white text-xs font-bold rounded-xl ${
              appearance.theme == 'dark' && 'shadow-none'
            } shadow-lg shadow-orange-100/50 transition-all active:scale-[0.98]`}
            onClick={() => setShowApplyDialog(true)}
          >
            <ArrowRight className='w-4 h-4' />
            APPLY NOW
          </button>
        </div>

        <ApplyDialog
          isOpen={showApplyDialog}
          onClose={() => setShowApplyDialog(false)}
          job={jobWithApplyInfo}
          onApplyOnApp={() => {
            setShowApplyDialog(false)
            alert('Apply on app - select resume flow here')
          }}
          onApplyExternal={() => {
            setShowApplyDialog(false)
            if (job.jobApplyLink) {
              window.open(job.jobApplyLink, '_blank')
            }
          }}
        />
      </div>
    </div>
  )
}
