import React from 'react'
import { Mail, ExternalLink, X, AlertCircle } from 'lucide-react'

export default function ApplyDialog ({ isOpen, onClose, job, onApplyOnApp, onApplyExternal }) {
  if (!isOpen) return null

  const { applyInfo } = job

  return (
    <div className='fixed inset-0 z-100 flex items-center justify-center'>
      <div
        className='absolute inset-0 bg-black/40 backdrop-blur-sm'
        onClick={onClose}
      />
      <div className='relative bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden'>
        <div className='p-6'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-xl font-bold text-slate-900 font-IBM'>
              How to Apply
            </h2>
            <button
              onClick={onClose}
              className='p-2 hover:bg-gray-100 rounded-full transition-colors'
            >
              <X className='w-5 h-5 text-gray-500' />
            </button>
          </div>

          <div className='space-y-4'>
            {applyInfo.canApplyOnApp ? (
              <button
                onClick={onApplyOnApp}
                className='w-full p-5 bg-[#f17e27] hover:bg-[#e16d16] text-white rounded-2xl transition-all group text-left'
              >
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0'>
                    <Mail className='w-6 h-6' />
                  </div>
                  <div>
                    <h3 className='text-lg font-bold'>Apply On App</h3>
                    <p className='text-sm text-white/80 mt-1'>
                      Send your resume directly to: <strong>{applyInfo.email}</strong>
                    </p>
                  </div>
                </div>
              </button>
            ) : (
              <div className='w-full p-4 bg-gray-100 rounded-2xl opacity-50 cursor-not-allowed'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center shrink-0'>
                    <Mail className='w-6 h-6 text-gray-400' />
                  </div>
                  <div>
                    <h3 className='text-lg font-bold text-gray-500'>Apply On App</h3>
                    <p className='text-sm text-gray-400 mt-1'>
                      No email found in job description
                    </p>
                  </div>
                </div>
              </div>
            )}

            {applyInfo.canApplyExternal ? (
              <button
                onClick={onApplyExternal}
                className='w-full p-5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl transition-all group text-left'
              >
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center shrink-0'>
                    <ExternalLink className='w-6 h-6' />
                  </div>
                  <div>
                    <h3 className='text-lg font-bold'>Apply on External Site</h3>
                    <p className='text-sm text-white/60 mt-1'>
                      Apply directly on employer's website
                    </p>
                  </div>
                </div>
              </button>
            ) : (
              <div className='w-full p-4 bg-gray-100 rounded-2xl opacity-50 cursor-not-allowed'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center shrink-0'>
                    <ExternalLink className='w-6 h-6 text-gray-400' />
                  </div>
                  <div>
                    <h3 className='text-lg font-bold text-gray-500'>
                      Apply on External Site
                    </h3>
                    <p className='text-sm text-gray-400 mt-1'>
                      No external apply link available
                    </p>
                  </div>
                </div>
              </div>
            )}

            {applyInfo.canApplyOnApp && (
              <div className='flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl'>
                <AlertCircle className='w-5 h-5 text-amber-600 shrink-0 mt-0.5' />
                <div>
                  <p className='text-sm text-amber-800'>
                    <strong>Important:</strong> You'll need to get the hiring
                    manager's email manually or find it on the job listing page.
                    The app will help you compose a professional email with your
                    resume.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}