import { useState, useEffect, useRef } from 'react'
import {
  Mail,
  User,
  Send,
  Type,
  Edit3,
  Eye,
  FileText,
  RotateCcw,
  MoreVertical,
  Loader2
} from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { saveEmailDetails } from '../../../store/emailSlice'
import { saveJobDetails } from '../../../store/aiSlice'
import { generateTailoredResumePDF } from '../../../utils/renderResume'
import { toast } from 'sonner'
import SendMethodModal from './Modals/SendMethod'
import { useQueryClient } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'
import { toastPresets } from '../../../components/toasters'
import { sendMessage } from '../../../services/useSocket'
function GetFileIcon () {
  return (
    <svg
      role='img'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      className='w-5 h-5'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
      />
    </svg>
  )
}

function AttachedFiles ({ files, selectedFile, onSelectFile, isGenerating }) {
  const { appearance } = useSelector(state => state.preferences)

  return (
    <div className='space-y-2 mt-4'>
      <h4
        className={`text-xs font-bold uppercase tracking-wider ${
          appearance.theme == 'dark' ? 'text-slate-400' : 'text-slate-500'
        }`}
      >
        {isGenerating ? 'Generating Resume...' : 'Attached Files'}
      </h4>
      <div className='space-y-1'>
        {files?.length > 0 ? (
          files.map(file => (
            <div
              key={file.id}
              onClick={() => onSelectFile(file)}
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                file.id == selectedFile?.id
                  ? 'bg-orange-500'
                  : appearance.theme == 'dark'
                  ? 'bg-[#202020] hover:bg-[#252525]'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className='flex items-center gap-3'>
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    file.id == selectedFile?.id
                      ? 'bg-white/20'
                      : appearance.theme == 'dark'
                      ? 'bg-[#2a2a2a]'
                      : 'bg-gray-200'
                  }`}
                >
                  <GetFileIcon extension={file.metaData?.extension} />
                </div>
                <div>
                  <h3
                    className={`text-sm font-medium truncate max-w-40 ${
                      file.id == selectedFile?.id
                        ? 'text-white'
                        : appearance.theme == 'dark'
                        ? 'text-white'
                        : 'text-slate-900'
                    }`}
                  >
                    {file.metaData?.name}
                  </h3>
                </div>
              </div>
              <MoreVertical
                className={`w-4 h-4 ${
                  file.id == selectedFile?.id
                    ? 'text-white/70'
                    : appearance.theme == 'dark'
                    ? 'text-slate-500'
                    : 'text-gray-400'
                }`}
              />
            </div>
          ))
        ) : (
          <p
            className={`text-xs ${
              appearance.theme == 'dark' ? 'text-slate-500' : 'text-gray-400'
            }`}
          >
            No files attached
          </p>
        )}
      </div>
    </div>
  )
}

export default function Finalize () {
  const { emailDetails } = useSelector(state => state.email)
  const { job, tailoredResume } = useSelector(state => state.ai)
  const { appearance } = useSelector(state => state.preferences)
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const [formData, setFormData] = useState({
    userEmail: '',
    userName: ''
  })

  const [selectedFile, setSelectedFile] = useState(null)
  const [pdfUrl, setPdfUrl] = useState(null)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [showSendMethodModal, setShowSendMethodModal] = useState(false)
  const hasGeneratedRef = useRef(false)

  const resumeData = tailoredResume?.resume
  const templateName = tailoredResume?.template

  useEffect(() => {
    const generatePDF = async () => {
      if (resumeData && templateName && !hasGeneratedRef.current) {
        hasGeneratedRef.current = true
        setIsGeneratingPDF(true)
        try {
          const fullName =
            resumeData.personal?.contactDetails?.fullName || 'Tailored Resume'
          const result = await generateTailoredResumePDF(
            resumeData,
            templateName,
            `${fullName}-Resume`
          )
          if (result?.data?.url) {
            queryClient.invalidateQueries(['program'])
            setPdfUrl(result.data.url)
          }
        } catch (error) {
          console.error('Failed to generate PDF:', error)
          hasGeneratedRef.current = false
        } finally {
          setIsGeneratingPDF(false)
        }
      }
    }
    generatePDF()
  }, [resumeData, templateName, queryClient])

  const attachedFiles = resumeData
    ? [
        {
          id: 'tailored-resume',
          metaData: {
            name: `${
              resumeData.personal?.contactDetails?.fullName || 'Tailored Resume'
            }.pdf`,
            extension: 'pdf',
            content: pdfUrl || tailoredResume,
            url: pdfUrl
          }
        }
      ]
    : []

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    if (!formData.userEmail.trim()) {
      toast.error('Please provide your email address')
      return false
    }
    if (!formData.userName.trim()) {
      toast.error('Please provide your display name')
      return false
    }
    return true
  }

  const handleSendClick = () => {
    if (validateForm()) {
      setShowSendMethodModal(true)
    }
  }

  const handleSendServer = () => {
    setShowSendMethodModal(false)
    sendMessage('JOB_MAIL', {
      to: job.email,
      userName: formData.userName,
      userEmail: formData.userEmail,
      subject: emailDetails.subjectLine,
      greeting: emailDetails.greeting,
      body: emailDetails.body,
      callToAction: emailDetails.callToAction,
      attachmentNote: emailDetails.attachmentNote,
      signOff: emailDetails.signOff,
      pdfUrl: pdfUrl
    })
    toast.loading('Processing and sending mail!', {
      id: 'job-mail',
      ...toastPresets.generalSuccess()
    })
  }

  const handleEmailDetailsChange = e => {
    const { name, value } = e.target
    dispatch(saveEmailDetails({ category: name, value: value }))
  }

  return (
    <section
      className={`w-full h-screen overflow-y-scroll [scrollbar-width:none] flex justify-center p-6 font-satoshi ${
        appearance.theme == 'dark' ? 'bg-[#202020]' : 'bg-white'
      }`}
    >
      <div
        className={`w-full max-w-5xl h-max my-10 p-10 space-y-8 rounded-3xl shadow-xs ${
          appearance.theme == 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'
        }`}
      >
        {/* Header */}
        <div className='space-y-2'>
          <h1
            className={`text-2xl font-bold font-IBM flex items-center gap-3 ${
              appearance.theme == 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Send Application
          </h1>
          <p
            className={`text-sm ml-1 ${
              appearance.theme == 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Review your application and send it directly to the recruiter.
          </p>
        </div>

        <div className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Sender Email Section */}
            <div className='space-y-2'>
              <label className='block text-sm font-bold text-slate-700 ml-1'>
                Your Email <span className='text-orange-500'>*</span>
              </label>
              <div className='relative'>
                <input
                  type='email'
                  name='userEmail'
                  required
                  value={formData.userEmail}
                  onChange={handleChange}
                  className='w-full pl-11 pr-4 py-3.5 border border-gray-200 focus:border-orange-400 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium bg-white text-slate-900 '
                />
              </div>
            </div>

            {/* Username Section */}
            <div className='space-y-2'>
              <label className='block text-sm font-bold text-slate-700 ml-1'>
                Display Name <span className='text-orange-500'>*</span>
              </label>
              <div className='relative'>
                <input
                  type='text'
                  name='userName'
                  required
                  value={formData.userName}
                  onChange={handleChange}
                  className='w-full pl-11 pr-4 py-3.5 border border-gray-200 focus:border-orange-400 focus:bg-white rounded-2xl outline-none transition-all  text-sm font-medium bg-white text-slate-900 '
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Recruiter Email */}
            <div className='space-y-2'>
              <label
                htmlFor='email'
                className='block text-sm font-bold text-slate-700 ml-1'
              >
                To:
              </label>
              <div className='relative'>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='recruiter@company.com'
                  value={job?.email || ''}
                  onChange={e =>
                    dispatch(
                      saveJobDetails({
                        category: 'email',
                        value: e.target.value
                      })
                    )
                  }
                  className='w-full pl-11 pr-4 py-3.5 border border-gray-200 focus:border-orange-400 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium'
                />
              </div>
            </div>

            {/* Subject */}
            <div className='space-y-2'>
              <label
                htmlFor='subjectLine'
                className='block text-sm font-bold text-slate-700 ml-1'
              >
                Subject:
              </label>
              <div className='relative'>
                <input
                  type='text'
                  id='subjectLine'
                  name='subjectLine'
                  placeholder='Application for...'
                  value={emailDetails?.subjectLine || ''}
                  onChange={handleEmailDetailsChange}
                  className='w-full pl-11 pr-4 py-3.5 border border-gray-200 focus:border-orange-400 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium'
                />
              </div>
            </div>
          </div>

          {/* Email Body & Preview Grid */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6'>
            {/* Left Column: Edit Fields */}
            <div className='space-y-4  p-6 rounded-3xl border border-slate-100 '>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='font-bold text-slate-800 flex items-center gap-2'>
                  Edit Content
                </h3>
              </div>

              {/* Greeting */}
              <div className='space-y-2'>
                <label
                  htmlFor='greeting'
                  className='block text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider'
                >
                  Greeting
                </label>
                <input
                  type='text'
                  id='greeting'
                  name='greeting'
                  value={emailDetails?.greeting || ''}
                  onChange={handleEmailDetailsChange}
                  className='w-full px-4 py-3 border border-gray-200 focus:border-orange-400 focus:bg-white rounded-xl outline-none transition-all text-sm font-medium bg-white/60'
                />
              </div>

              {/* Message Body Textarea */}
              <div className='space-y-2'>
                <label
                  htmlFor='body'
                  className='block text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider'
                >
                  Core Message
                </label>
                <div className='relative'>
                  <textarea
                    id='body'
                    name='body'
                    rows={6}
                    value={emailDetails?.body || ''}
                    onChange={handleEmailDetailsChange}
                    className='w-full px-4 py-4 border border-gray-200 focus:border-orange-400 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium resize-none min-h-40 bg-white/60'
                  />
                </div>
              </div>

              {/* Call To Action */}
              <div className='space-y-2'>
                <label
                  htmlFor='callToAction'
                  className='block text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider'
                >
                  Call to Action
                </label>
                <textarea
                  id='callToAction'
                  name='callToAction'
                  rows={3}
                  value={emailDetails?.callToAction || ''}
                  onChange={handleEmailDetailsChange}
                  className='w-full px-4 py-4 border border-gray-200 focus:border-orange-400 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium resize-none min-h-25 bg-white/60'
                />
              </div>

              {/* Attachment Note */}
              <div className='space-y-2'>
                <label
                  htmlFor='attachmentNote'
                  className='block text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider'
                >
                  Attachment Note
                </label>
                <input
                  type='text'
                  id='attachmentNote'
                  name='attachmentNote'
                  value={emailDetails?.attachmentNote || ''}
                  onChange={handleEmailDetailsChange}
                  className='w-full px-4 py-3 border border-gray-200 focus:border-orange-400 focus:bg-white rounded-xl outline-none transition-all text-sm font-medium bg-white/60'
                />
              </div>

              {/* Sign Off */}
              <div className='space-y-2'>
                <label
                  htmlFor='signOff'
                  className='block text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider'
                >
                  Sign Off
                </label>
                <input
                  type='text'
                  id='signOff'
                  name='signOff'
                  value={emailDetails?.signOff || ''}
                  onChange={handleEmailDetailsChange}
                  className='w-full px-4 py-3 border border-gray-200 focus:border-orange-400 focus:bg-white rounded-xl outline-none transition-all text-sm font-medium bg-white/60'
                />
              </div>
            </div>

            {/* Right Column: Live Preview */}
            <div className=' p-8 shadow-md  pointer-events-none rounded-3xl flex flex-col h-full'>
              <div className='flex justify-between items-center mb-4 pb-4 border-b border-slate-200'>
                <h3 className='font-bold text-slate-800 flex items-center gap-2'>
                  <Eye className='w-4 h-4 text-orange-500' />
                  Live Preview
                </h3>
                <span className='invisible md:visible text-[10px] text-white font-bold px-2 py-2 bg-orange-500 rounded-lg uppercase tracking-wider'>
                  Final Application Mail
                </span>
              </div>

              <div className='flex-1 space-y-4 text-slate-700 font-medium leading-relaxed font-satoshi whitespace-pre-wrap text-[15px]'>
                <p>{emailDetails?.greeting || 'Dear [Name],'}</p>
                <p className='text-justify'>
                  {emailDetails?.body ||
                    'I am applying for the [Role] position...'}
                </p>
                <p>
                  {emailDetails?.callToAction ||
                    'I look forward to discussing...'}
                </p>
                <p className='italic text-sm text-slate-500'>
                  {emailDetails?.attachmentNote ||
                    'Please find my CV attached.'}
                </p>
                <br />
                <p className='mb-0'>
                  {emailDetails?.signOff || 'Best regards,'}
                </p>
                <p className='mt-1 font-bold text-slate-900'>
                  {formData.userName || 'John Doe'}
                </p>
              </div>

              <AttachedFiles
                files={attachedFiles}
                selectedFile={selectedFile}
                onSelectFile={setSelectedFile}
                isGenerating={isGeneratingPDF}
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className='flex items-center justify-end pt-6  border-slate-100 mt-8'>
            <button
              type='button'
              onClick={handleSendClick}
              disabled={isGeneratingPDF}
              className='px-10 py-3.5 bg-[#f17e27] hover:bg-[#e16d16] text-white text-sm font-bold rounded-[1.25rem] shadow-lg shadow-orange-100 transition-all flex items-center gap-2 group active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <Send className='w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform' />
              {isGeneratingPDF ? 'Processing...' : 'Send Application'}
            </button>
          </div>
        </div>

        <SendMethodModal
          isOpen={showSendMethodModal}
          onClose={() => setShowSendMethodModal(false)}
          onSendServer={handleSendServer}
          userEmail={formData.userEmail}
        />
      </div>
    </section>
  )
}
