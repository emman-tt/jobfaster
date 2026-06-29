import { X, Mail, Edit2, Copy } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { toastPresets } from '../../../../components/toasters'

export default function SendMethodModal ({
  isOpen,
  onClose,
  onSendServer,
  userEmail
}) {
  const { appearance } = useSelector(state => state.preferences)
  const { emailDetails } = useSelector(state => state.email)

  if (!isOpen) return null

  const handleCopyToClipboard = () => {
    const subject = emailDetails?.subjectLine || 'Application'
    const body = `${emailDetails?.greeting || 'Dear Hiring Manager,'}\n\n${
      emailDetails?.body || ''
    }\n\n${emailDetails?.callToAction || ''}\n\n${
      emailDetails?.attachmentNote || ''
    }\n\n${emailDetails?.signOff || 'Best regards,'}`
    const text = `Subject: ${subject}\n\n${body}`
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard', {
      ...toastPresets.generalSuccess('Paste in your email client'),
    })
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div
        className='absolute inset-0 bg-black/60 backdrop-blur-sm'
        onClick={onClose}
      />
      <div
        className={`relative w-full max-w-md p-6 rounded-3xl shadow-2xl ${
          appearance.theme == 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'
        }`}
      >
        <button
          onClick={onClose}
          className='absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors'
        >
          <X className='w-5 h-5 text-slate-500' />
        </button>

        <div className='space-y-4 mb-6'>
          <h2
            className={`text-xl font-bold ${
              appearance.theme == 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            REVIEW & SEND
          </h2>
        </div>

        <div
          className={`p-4 rounded-2xl ${
            appearance.theme == 'dark' ? 'bg-[#1a1a1a]' : 'bg-slate-50'
          }`}
        >
          <div className='space-y-3'>
            <div>
              <p
                className={`text-xs ${
                  appearance.theme == 'dark'
                    ? 'text-slate-500'
                    : 'text-slate-400'
                }`}
              >
                Email will be sent from:
              </p>
              <p
                className={`text-sm font-medium ${
                  appearance.theme == 'dark' ? 'text-white' : 'text-slate-900'
                }`}
              >
                applications@emmanverse.uk.com
              </p>
            </div>
            <div>
              <p
                className={`text-xs ${
                  appearance.theme == 'dark'
                    ? 'text-slate-500'
                    : 'text-slate-400'
                }`}
              >
                Replies will go to:
              </p>
              <p
                className={`text-sm font-medium ${
                  appearance.theme == 'dark' ? 'text-white' : 'text-slate-900'
                }`}
              >
                {userEmail || 'your.email@gmail.com'}
              </p>
            </div>
          </div>
        </div>

        <div className='flex gap-3 mt-6'>
          <button
            onClick={onSendServer}
            className='flex-1 py-3 bg-[#f17e27] hover:bg-[#e16d16] text-white text-sm font-bold rounded-2xl shadow-lg shadow-orange-100 transition-all flex items-center justify-center gap-2'
          >
            <Mail className='w-4 h-4' />
            SEND APPLICATION
          </button>
          <button
            onClick={onClose}
            className='px-4 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm font-bold rounded-2xl transition-all flex items-center gap-2'
          >
            <Edit2 className='w-4 h-4' />
            EDIT EMAIL
          </button>
        </div>

        <div
          className={`mt-5 pt-5 border-t ${
            appearance.theme == 'dark' ? 'border-slate-700' : 'border-slate-200'
          }`}
        >
          <p
            className={`text-sm ${
              appearance.theme == 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Need to send from your own email?
          </p>
          <button
            onClick={handleCopyToClipboard}
            className='mt-2 w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-orange-500 hover:text-orange-500 text-sm font-bold rounded-2xl transition-all flex items-center justify-center gap-2'
          >
            <Copy className='w-4 h-4' />
            COPY TO CLIPBOARD
          </button>
        </div>
      </div>
    </div>
  )
}
