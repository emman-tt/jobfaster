import {
  CheckCircle,
  FileText,
  Loader2,
  Trash2,
  UploadIcon,
  X
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleModals } from '../../../../store/modalSlice'
import { Upload } from '../../../../services/upload'
import { saveProgram } from '../../../../store/filesSlice'
import { toast } from 'sonner'
import { toastPresets } from '../../../../components/toasters'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState({})
  const [loading, setLoading] = useState(false)

  function addfile (incoming) {
    const fileItem = incoming[0]
    setLoading(true)
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
        setLoading(false)
        setFile({ ...fileobj, progress: 100, status: 'done' })
      } else {
        setFile({ ...fileobj, progress })
      }
    }, 300)
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

  async function navigateNext () {
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('file', file.file)

      Upload(formData).then(res => {
        console.log(res)
        if (res.statusCode == 401) {
          toast.error('Session Timed out ', {
            ...toastPresets.authError(),
            description: 'Please log in',
            position: 'top-center'
          })

          return navigate('/auth')
        }
        if (res.statusCode == 422) {
          toast.error('No file provided ', {
            ...toastPresets.authError(),
            description: 'Please make sure to select a file',
            position: 'top-center'
          })

          return
        }
        const data = res.data

        toast.success(`File ${data.name} uploaded succesfully`, {
          ...toastPresets.aiSuccess(),
          description: 'File added to list of resumes',
          position: 'top-center'
        })
        dispatch(saveProgram(data))
        dispatch(toggleModals('uploadFile'))
      })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  function closeModal () {
    dispatch(toggleModals('uploadFile'))
  }

  const floatingName = file?.name

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
        {floatingName?.length > 0 && (
          <div className='absolute top-4 right-4 flex flex-col items-end gap-1'>
            <span className='text-xs text-gray-500 bg-white border border-gray-200 rounded px-2 py-0.5 shadow-sm'>
              {floatingName}
            </span>
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
          onChange={e => addfile(e.target.files)}
        />
      </div>

      {file?.name?.length > 0 && (
        <div className='flex flex-col gap-2'>
          <p className='text-sm font-semibold text-gray-700'>Uploaded Files:</p>
          <div className='flex flex-col gap-2 max-h-52 overflow-y-auto [scrollbar-width:thin]'>
            <div
              key={file.id}
              className='flex items-center gap-3 border border-gray-200 rounded-xl p-3'
            >
              <div
                className={`w-10 h-12 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shrink-0 ${
                  file.type === 'application/pdf' ? 'bg-red-500' : 'bg-blue-500'
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
                    <span className='text-gray-600 font-medium'>Completed</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => removeFile(file.id)}
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
          className='flex-1 border border-gray-300 text-gray-700 text-sm font-semibold font-satoshi py-4 rounded-xl hover:bg-gray-50 transition-colors'
        >
          Cancel
        </button>
        <button
          onClick={() => navigateNext()}
          style={{ backgroundColor: loading ? 'gray' : '#ff8904' }}
          className={`flex-1 cursor-pointer flex justify-center gap-5  text-white items-center text-sm font-semibold font-satoshi py-4 rounded-xl  transition-colors`}
        >
          {loading ? (
            <div className=' small-loader border-4 '></div>
          ) : (
            'Upload File'
          )}
        </button>
      </div>
    </section>
  )
}
