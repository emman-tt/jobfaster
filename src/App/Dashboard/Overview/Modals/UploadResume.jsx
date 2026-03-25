import {
  CheckCircle,
  FileText,
  Loader2,
  Trash2,
  UploadIcon,
  X
} from 'lucide-react'
import { useRef, useState } from 'react'

const ACCEPTED_FORMATS = [
  'image/jpeg',
  'image/png',
  'application/pdf',
  'video/mp4'
]
const MAX_SIZE_MB = 50

function getLocalFileIcon (type) {
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

export default function UploadResume ({ onFileSelect, file, setFile }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

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
    
    if (onFileSelect) onFileSelect(fileobj)
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

  return (
    <div className='flex flex-col gap-4 p-6 pt-2'>
        <div className='flex flex-col gap-1 mb-2'>
            <h2 className='text-base font-bold font-IBM text-slate-800'>
              Upload and attach file
            </h2>
            <p className='text-xs text-gray-500 font-satoshi'>
              Import your current resume to optimize it for your next role.
            </p>
        </div>

      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`relative border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center gap-2 transition-all duration-200 h-48 bg-gray-50/50 ${
          dragging ? 'border-[#f17e27] bg-orange-50/30' : 'border-gray-200 '
        }`}
      >
        <div className='w-12 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center shadow-sm'>
          <FileText className='w-6 h-6 text-[#f17e27]' />
        </div>

        <p className='text-xs font-bold text-slate-700'>
          Choose a file or drag & drop it here.
        </p>
        <p className='text-[10px] text-gray-400 font-medium'>
          JPEG, PNG, PDF, and MP4 formats, up to {MAX_SIZE_MB} MB.
        </p>

        <button
          onClick={() => inputRef.current?.click()}
          className='mt-2 bg-slate-900 text-white text-[11px] font-bold font-satoshi px-6 py-2 rounded-xl hover:bg-slate-800 transition-colors'
        >
          Browse File
        </button>

        <input
          ref={inputRef}
          type='file'
          accept='.jpeg,.jpg,.png,.pdf,.mp4'
          className='hidden'
          onChange={e => addfile(e.target.files)}
        />
      </div>

      {file.file && (
        <div className='flex flex-col gap-2'>
          <p className='text-[11px] font-bold text-slate-500 uppercase tracking-wider'>
            Uploaded file
          </p>
          <div className='flex flex-col gap-2 max-h-32 overflow-y-auto [scrollbar-width:thin]'>
            <div
              key={file.id}
              className='flex items-center gap-3 border border-gray-100 rounded-2xl p-3 bg-white shadow-sm'
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-[9px] font-black shrink-0 ${
                  file.type === 'application/pdf'
                    ? 'bg-red-500'
                    : 'bg-blue-500'
                }`}
              >
                {getLocalFileIcon(file.type)}
              </div>

              <div className='flex flex-col flex-1 min-w-0 gap-0.5'>
                <p className='text-xs font-bold font-IBM text-slate-900 truncate'>
                  {file.name}
                </p>
                {file.status === 'uploading' ? (
                  <div className='flex flex-col gap-1'>
                    <div className='flex items-center gap-2 text-[10px] text-gray-500'>
                      <span>
                        {formatBytes((file.size * file.progress) / 100)} of{' '}
                        {formatBytes(file.size)}
                      </span>
                      <Loader2 className='w-2.5 h-2.5 animate-spin text-[#f17e27]' />
                      <span className='text-[#f17e27] font-bold'>
                        %{file.progress}
                      </span>
                    </div>
                    <div className='w-full h-1 bg-gray-100 rounded-full overflow-hidden'>
                      <div
                        className='h-full bg-[#f17e27] rounded-full transition-all duration-300'
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className='flex items-center gap-1 text-[10px] text-gray-500 font-medium'>
                    <span>{formatBytes(file.size)}</span>
                    <span className='mx-1'>·</span>
                    <CheckCircle className='w-3 h-3 text-emerald-500' />
                    <span className='text-emerald-600 font-bold'>
                      Completed
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={() => removeFile()}
                className='shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all'
              >
                <Trash2 className='w-4 h-4' />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
