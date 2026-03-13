import {
  CheckCircle,
  FileText,
  Loader2,
  Trash2,
  UploadIcon,
  X
} from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleModals } from '../../../../store/modalSlice'

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

export default function UploadFile () {
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [files, setFiles] = useState([])

  function closeModal () {
    dispatch(toggleModals('uploadFile'))
  }

  function addFiles (incoming) {
    const valid = Array.from(incoming)
      .filter(
        f =>
          ACCEPTED_FORMATS.includes(f.type) &&
          f.size <= MAX_SIZE_MB * 1024 * 1024
      )
      .map(f => ({
        id: crypto.randomUUID(),
        file: f,
        name: f.name,
        size: f.size,
        type: f.type,
        progress: 0,
        status: 'uploading'
      }))

    if (!valid.length) return

    setFiles(prev => [...prev, ...valid])

    valid.forEach(fileObj => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          setFiles(prev =>
            prev.map(f =>
              f.id === fileObj.id ? { ...f, progress: 100, status: 'done' } : f
            )
          )
        } else {
          setFiles(prev =>
            prev.map(f => (f.id === fileObj.id ? { ...f, progress } : f))
          )
        }
      }, 300)
    })
  }

  const onDrop = useCallback(e => {
    e.preventDefault()
    setDragging(false)
    addFiles(e.dataTransfer.files)
  }, [])

  const onDragOver = e => {
    e.preventDefault()
    setDragging(true)
  }
  const onDragLeave = () => setDragging(false)

  function removeFile (id) {
    setFiles(prev => prev.filter(f => f.id !== id))
  }

  const floatingNames = files.slice(0, 2).map(f => f.name)

  return (
    <section className='absolute min-h-140 p-8 pb-5 transition-all duration-200 ease-in-out translate-x-120 translate-y-10 z-51 shadow-xl w-[38%] bg-white rounded-2xl flex flex-col gap-4'>
      <div className='flex items-start justify-between'>
        <div className='flex flex-col gap-1'>
      
          <h2 className='text-xl font-semibold font-IBM'>
            Upload and attach files
          </h2>
          <p className='text-sm text-gray-500 font-satoshi'>
            Upload your pdf files or documents to get started
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
        className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-2 transition-colors duration-200 h-70 bg-white ${
          dragging ? 'border-blue-400 ' : 'border-gray-300 '
        }`}
      >
        {floatingNames.length > 0 && (
          <div className='absolute top-4 right-4 flex flex-col items-end gap-1'>
            {floatingNames.map((name, i) => (
              <span
                key={i}
                className='text-xs text-gray-500 bg-white border border-gray-200 rounded px-2 py-0.5 shadow-sm'
              >
                {name}
              </span>
            ))}
          </div>
        )}

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
          className='mt-2 bg-gray-800 text-white text-sm font-semibold font-satoshi px-5 py-2 rounded-xl hover:bg-gray-700 transition-colors'
        >
          Browse File
        </button>

        <input
          ref={inputRef}
          type='file'
          multiple
          accept='.jpeg,.jpg,.png,.pdf,.mp4'
          className='hidden'
          onChange={e => addFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className='flex flex-col gap-2'>
          <p className='text-sm font-semibold text-gray-700'>Uploaded Files:</p>
          <div className='flex flex-col gap-2 max-h-52 overflow-y-auto [scrollbar-width:thin]'>
            {files.map(f => (
              <div
                key={f.id}
                className='flex items-center gap-3 border border-gray-200 rounded-xl p-3'
              >
                <div
                  className={`w-10 h-12 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shrink-0 ${
                    f.type === 'application/pdf' ? 'bg-red-500' : 'bg-blue-500'
                  }`}
                >
                  {getFileIcon(f.type)}
                </div>

                <div className='flex flex-col flex-1 min-w-0 gap-1'>
                  <p className='text-sm font-semibold font-IBM truncate'>
                    {f.name}
                  </p>
                  {f.status === 'uploading' ? (
                    <div className='flex flex-col gap-1'>
                      <div className='flex items-center gap-2 text-xs text-gray-500'>
                        <span>
                          {formatBytes((f.size * f.progress) / 100)} of{' '}
                          {formatBytes(f.size)}
                        </span>
                        <span>·</span>
                        <span>{Math.ceil((100 - f.progress) / 10)} second</span>
                        <Loader2 className='w-3 h-3 animate-spin text-blue-500' />
                        <span className='text-blue-600 font-semibold'>
                          %{f.progress}
                        </span>
                      </div>
                      <div className='w-full h-1.5 bg-gray-200 rounded-full overflow-hidden'>
                        <div
                          className='h-full bg-blue-500 rounded-full transition-all duration-300'
                          style={{ width: `${f.progress}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className='flex items-center gap-1 text-xs text-gray-500'>
                      <span>{formatBytes(f.size)}</span>
                      <span>·</span>
                      <CheckCircle className='w-3.5 h-3.5 text-blue-500' />
                      <span className='text-gray-600 font-medium'>
                        Completed
                      </span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => removeFile(f.id)}
                  className='shrink-0 text-gray-400 hover:text-red-500 transition-colors'
                >
                  {f.status === 'uploading' ? (
                    <X className='w-4 h-4' />
                  ) : (
                    <Trash2 className='w-4 h-4' />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className='flex items-center justify-between gap-3 pt-5'>
        <button
          onClick={closeModal}
          className='flex-1 border border-gray-300 text-gray-700 text-sm font-semibold font-satoshi py-4 rounded-xl hover:bg-gray-50 transition-colors'
        >
          Cancel
        </button>
        <button
          onClick={closeModal}
          className='flex-1 bg-[#ff8904] text-white text-sm font-semibold font-satoshi py-4 rounded-xl  transition-colors'
        >
          Attach Files
        </button>
      </div>
    </section>
  )
}
