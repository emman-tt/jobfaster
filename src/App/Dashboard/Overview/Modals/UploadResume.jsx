import {
  CheckCircle,
  FileText,
  Loader2,
  Stars,
  Trash2,
  UploadIcon,
  X
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleModals } from '../../../../store/modalSlice'
import Upload from '../../../../services/ai'
import { saveCorrections } from '../../../../store/aiSlice'
import { useNavigate } from 'react-router-dom'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const ACCEPTED_FORMATS = [
  'image/jpeg',
  'image/png',
  'application/pdf',
  'video/mp4'
]
const MAX_SIZE_MB = 50

function getFileIcon (type) {
  if (type === 'application/pdf') return 'PDF'
  if (type.startsWith('image/')) return 'PNG'
  return 'FILE'
}

function formatBytes (bytes) {
  if (bytes === 0) return '0 KB'
  const kb = bytes / 1024
  if (kb < 1024) return `${Math.round(kb)} KB`
  return `${(kb / 1024).toFixed(1)} MB`
}

export default function UploadResume () {
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState({})
  const [aiMode, setAiMode] = useState({
    status: 'loading',
    active: false,
    message: 'Scanning for missing metrics and numbers...',
    count: 0
  })
  const navigate = useNavigate()
  function closeModal () {
    dispatch(toggleModals('uploadResume'))
  }

  function addfile (incoming) {
    const fileItem = incoming[0]
    if (!fileItem) {
      return console.log('the file doesnt exist')
    }

    const fileobj = {
      id: crypto.randomUUID(),
      file: fileItem,
      name: fileItem.name,
      size: fileItem.size,
      type: fileItem.type,
      progress: 0,
      status: 'uploading'
    }
    setFile(fileobj)
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setFile({ ...fileobj, progress: 100, status: 'done' })
      } else {
        setFile({ ...fileobj, progress })
      }
    }, 300)
  }

  function TailorResume () {
    console.log(file)
    if (!file || !file.file) {
      return console.log('no file exists')
    }

    setAiMode({
      ...aiMode,
      active: true
    })
    const formData = new FormData()
    formData.append('file', file.file)
    Upload(formData).then(result => {
      if (result) {
        dispatch(saveCorrections(result))
        navigate('/correction')
      }
    })
  }

  const onDrop = e => {
    e.preventDefault()
    setDragging(false)
    addfile(e.dataTransfer.files)
  }

  const onDragOver = e => {
    e.preventDefault()
    setDragging(true)
  }
  const onDragLeave = () => setDragging(false)

  function removeFile () {
    setFile({})
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      aiMode.count = aiMode.count + 1
      setAiMode({
        ...aiMode,
        message: Messages[aiMode.count].message
      })
    }, 5000)

    if (aiMode.count == Messages.length - 1) {
      clearTimeout(timeout)
    }
  }, [aiMode])

  return (
    <section className='absolute min-h-120 p-8 pb-5 transition-all duration-200 ease-in-out translate-x-120 translate-y-20 z-51 shadow-xl w-[38%] bg-white rounded-2xl flex flex-col gap-4'>
      {aiMode.active ? (
        <div className=' w-full h-full justify-center items-center flex-col gap-6 flex'>
          <Anime />
          <h3 className=' font-IBM text-lg'>{aiMode.message}</h3>
        </div>
      ) : (
        <>
          <div className='flex items-start justify-between'>
            <div className='flex flex-col gap-1'>
              <h2 className='text-xl font-semibold font-IBM'>
                Upload and attach file
              </h2>
              <p className='text-sm text-gray-500 font-satoshi'>
                Import your current resume to optimize it for your next role.
              </p>
            </div>
            <div
              onClick={closeModal}
              className='cursor-pointer shadow-sm flex justify-center items-center p-1 rounded-lg'
            >
              <X className='w-5 h-5 text-gray-600' />
            </div>
          </div>

          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-2 transition-colors duration-200 h-60 bg-white ${
              dragging ? 'border-blue-400 ' : 'border-gray-300 '
            }`}
          >
            <div className='w-12 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-sm'>
              <FileText className='w-6 h-6 text-blue-500' />
            </div>

            <p className='text-sm font-semibold text-gray-700'>
              Choose a file or drag &amp; drop it here.
            </p>
            <p className='text-xs text-gray-400'>
              JPEG, PNG, PDF, and MP4 formats, up to {MAX_SIZE_MB} MB.
            </p>

            <button
              onClick={() => inputRef.current?.click()}
              className='mt-2 bg-[#0e1749] text-white text-sm font-semibold font-satoshi px-5 py-2 rounded-xl hover:bg-gray-700 transition-colors'
            >
              Browse File
            </button>

            <input
              ref={inputRef}
              type='file'
              multiple
              accept='.jpeg,.jpg,.png,.pdf,.mp4'
              className='hidden'
              onChange={e => addfile(e.target.files)}
            />
          </div>

          {file.file && (
            <div className='flex flex-col gap-2'>
              <p className='text-sm font-semibold text-gray-700'>
                Uploaded file:
              </p>
              <div className='flex flex-col gap-2 max-h-52 overflow-y-auto [scrollbar-width:thin]'>
                <div
                  key={file.id}
                  className='flex items-center gap-3 border border-gray-200 rounded-xl p-3'
                >
                  <div
                    className={`w-10 h-12 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shrink-0 ${
                      file.type === 'application/pdf'
                        ? 'bg-red-500'
                        : 'bg-blue-500'
                    }`}
                  >
                    {getFileIcon(file.type)}
                  </div>

                  <div className='flex flex-col flex-1 min-w-0 gap-1'>
                    <p className='text-sm font-semibold font-IBM truncate'>
                      {file.name}
                    </p>
                    {file.status === 'uploading' ? (
                      <div className='flex flex-col gap-1'>
                        <div className='flex items-center gap-2 text-xs text-gray-500'>
                          <span>
                            {formatBytes((file.size * file.progress) / 100)} of{' '}
                            {formatBytes(file.size)}
                          </span>
                          <span>·</span>
                          <span>
                            {Math.ceil((100 - file.progress) / 10)} second
                          </span>
                          <Loader2 className='w-3 h-3 animate-spin text-blue-500' />
                          <span className='text-blue-600 font-semibold'>
                            %{file.progress}
                          </span>
                        </div>
                        <div className='w-full h-1.5 bg-gray-200 rounded-full overflow-hidden'>
                          <div
                            className='h-full bg-blue-500 rounded-full transition-all duration-300'
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className='flex items-center gap-1 text-xs text-gray-500'>
                        <span>{formatBytes(file.size)}</span>
                        <span>·</span>
                        <CheckCircle className='w-3.5 h-3.5 text-blue-500' />
                        <span className='text-gray-600 font-medium'>
                          Completed
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => removeFile()}
                    className='shrink-0 text-gray-400 hover:text-red-500 transition-colors'
                  >
                    {file.status === 'uploading' ? (
                      <X className='w-4 h-4' />
                    ) : (
                      <Trash2 className='w-4 h-4' />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className='flex items-center justify-between gap-3 pt-5'>
            <button
              onClick={closeModal}
              className='w-full border border-gray-300 text-gray-700 text-sm font-semibold font-satoshi py-4 rounded-xl hover:bg-gray-50 transition-colors'
            >
              Cancel
            </button>
            <button
              onClick={() => {
                TailorResume()
              }}
              className='w-full flex gap-3 justify-center cursor-pointer bg-[#ff8904] text-white text-sm font-semibold font-satoshi py-4 rounded-xl  transition-colors'
            >
              <Stars className=' h-4 w-4' />
              Tailor Resume
            </button>
          </div>
        </>
      )}
    </section>
  )
}

const Anime = () => {
  return (
    <DotLottieReact
      src='https://lottie.host/cb3067f7-7e4f-45ae-a0d5-6788a6dbd822/233o4D0LhJ.lottie'
      loop
      autoplay
    />
  )
}

const Messages = [
  {
    id: 1,
    message: 'Scanning for missing metrics and numbers...'
  },
  {
    id: 2,
    message: 'Identifying weak action verbs...'
  },
  {
    id: 3,
    message: 'Checking for achievement-focused content...'
  },
  {
    id: 4,
    message: 'Analyzing bullet point effectiveness...'
  },
  {
    id: 5,
    message: 'Detecting missing skills and keywords...'
  },
  {
    id: 6,
    message: 'Evaluating overall resume impact...'
  }
]
