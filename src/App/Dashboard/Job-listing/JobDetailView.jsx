import React from 'react'
import { MapPin, Sparkles, ArrowRight } from 'lucide-react'

export default function JobDetailView({ job }) {
  if (!job) return null

  const salary = job.job_salary ? `$${job.job_salary.toLocaleString()}` : 'Not disclosed'
  const requirements = job.job_highlights?.Qualifications || []
  const responsibilities = job.job_highlights?.Responsibilities || []

  return (
    <div className="p-6 pb-20">
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 leading-tight font-IBM">{job.job_title}</h2>
          <p className="text-xs font-semibold text-[#f17e27] mt-1.5 uppercase tracking-wide">
            {job.employer_name}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {job.job_location}
            </p>
            <span className="w-0.5 h-0.5 bg-slate-300 rounded-full" />
            <p className="text-xs text-slate-400">
              {job.job_posted_human_readable}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-[#fff7ed] text-[#f17e27] rounded-full text-[9px] font-semibold uppercase tracking-wider border border-[#feb053]/30">
            {job.job_employment_type_text}
          </span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        <div className="flex items-center gap-2 py-1">
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider font-satoshi">
            Salary
          </span>
          <span className="text-sm font-medium text-slate-600 font-IBM">
            {salary}
          </span>
        </div>

        <div className="space-y-5">
          <div>
            <h3 className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.1em] mb-2">
              Description
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-satoshi whitespace-pre-line">
              {job.job_description}
            </p>
          </div>

          {responsibilities.length > 0 && (
            <div className="pt-1 border-t border-gray-100">
              <h3 className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.1em] mb-3">
                Responsibilities
              </h3>
              <ul className="space-y-2">
                {responsibilities.map((resp, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs text-slate-500 group">
                    <span className="w-1 h-1 bg-[#f17e27] rounded-full mt-1 shrink-0" />
                    <span className="font-satoshi leading-normal">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {requirements.length > 0 && (
            <div className="pt-1 border-t border-gray-100">
              <h3 className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.1em] mb-3">
                Requirements
              </h3>
              <ul className="space-y-2">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs text-slate-500 group">
                    <span className="w-1 h-1 bg-[#f17e27] rounded-full mt-1 shrink-0" />
                    <span className="font-satoshi leading-normal">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <button className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-white border-2 border-[#f17e27] text-[#f17e27] hover:bg-[#fff7ed] text-[10px] font-semibold rounded-xl transition-all active:scale-[0.98]">
            <Sparkles className="w-3.5 h-3.5" />
            AI TAILOR RESUME
          </button>
          <button 
            className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-[#f17e27] hover:bg-[#e16d16] text-white text-[10px] font-semibold rounded-xl shadow-lg shadow-orange-100/50 transition-all active:scale-[0.98]"
            onClick={() => job.job_apply_link && window.open(job.job_apply_link, '_blank')}
          >
            <ArrowRight className="w-3.5 h-3.5" />
            APPLY NOW
          </button>
        </div>
      </div>
    </div>
  )
}
