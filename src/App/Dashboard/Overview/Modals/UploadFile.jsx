import {
  CheckCircle,
  FileText,
  Loader2,
  Trash2,
  UploadIcon,
  X
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModals } from '../../../../store/modalSlice'
import { toast } from 'sonner'
import { toastPresets } from '../../../../components/toasters'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UploadFile as Upload } from '../../../../services/Program'

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
  const { appearance } = useSelector(state => state.preferences)

  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState({})
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()

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

  const mutation = useMutation({
    mutationFn: Upload,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['program'] })
      queryClient.invalidateQueries({ queryKey: ['activity'] })
      toast.success(`File ${file.name} uploaded succesfully`, {
        ...toastPresets.aiSuccess(),
        description: 'File added to list of resumes',
        position: 'top-center'
      })
    },
    onError: () => {
      toast.error('Failed to upload file', {
        ...toastPresets.generalError('Please try again'),
        position: 'top-center'
      })
    }
  })

  async function navigateNext () {
    const id = toast.loading(`Uploading File ${file.name}`, {
      ...toastPresets.generalLoading(),
      duration: 1000,
      position: 'top-center',
      description: 'Saving file to our server , takes some time'
    })
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file.file)

    mutation.mutate(formData)

    toast.dismiss(id)
  }

  function closeModal () {
    dispatch(toggleModals('uploadFile'))
  }

  useEffect(() => {
    if (mutation.isSuccess) {
      dispatch(toggleModals('uploadFile'))
    }
  }, [mutation, dispatch])

  const floatingName = file?.name

  return (
    <section
      className={`fixed inset-0 m-auto z-51 w-[calc(100%-2rem)] sm:w-[38%] max-w-lg max-h-[90vh] h-max max-sm:-translate-y-15 sm:h-max min-h-0 p-4 sm:p-8 pb-5 shadow-xl rounded-2xl flex flex-col gap-4 overflow-y-auto ${
        appearance.theme == 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'
      }`}
    >
      <div className='flex items-start justify-between'>
        <div className='flex flex-col gap-1'>
          <h2
            className={`text-xl font-semibold font-IBM ${
              appearance.theme == 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Upload and attach files
          </h2>
          <p
            className={`text-sm font-satoshi ${
              appearance.theme == 'dark' ? 'text-slate-400' : 'text-gray-500'
            }`}
          >
            Upload your pdf files or documents to get started
          </p>
        </div>
        <div
          onClick={closeModal}
          className={`cursor-pointer shadow-sm flex justify-center items-center p-1 rounded-lg ${
            appearance.theme == 'dark' ? 'hover:bg-slate-700' : ''
          }`}
        >
          <X
            className={`w-5 h-5 ${
              appearance.theme == 'dark' ? 'text-slate-400' : 'text-gray-600'
            }`}
          />
        </div>
      </div>

      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-2 transition-colors duration-200 h-70 ${
          appearance.theme == 'dark'
            ? 'bg-[#202020] border-slate-700'
            : 'bg-white'
        } ${dragging ? 'border-blue-400 ' : ''}`}
      >
        {floatingName?.length > 0 && (
          <div className='absolute top-4 right-4 flex flex-col items-end gap-1'>
            <span
              className={`text-xs px-2 py-0.5 rounded shadow-sm ${
                appearance.theme == 'dark'
                  ? 'bg-[#202020] border-slate-700 text-white'
                  : 'bg-white border border-gray-200'
              }`}
            >
              {floatingName}
            </span>
          </div>
        )}

        <div
          className={`w-12 h-10 rounded-xl flex items-center justify-center shadow-sm ${
            appearance.theme == 'dark' ? 'bg-[#202020]' : 'bg-white'
          } ${
            appearance.theme == 'dark'
              ? 'border border-slate-700'
              : 'border border-gray-200'
          }`}
        >
          <FileText className='w-6 h-6 text-blue-500' />
        </div>

        <p
          className={`text-sm font-semibold ${
            appearance.theme == 'dark' ? 'text-white' : 'text-gray-700'
          }`}
        >
          Choose a file or drag &amp; drop it here.
        </p>
        <p
          className={`text-xs ${
            appearance.theme == 'dark' ? 'text-slate-500' : 'text-gray-400'
          }`}
        >
          JPEG, PNG, PDF, and MP4 formats, up to {MAX_SIZE_MB} MB.
        </p>

        <button
          onClick={() => inputRef.current?.click()}
          className={`mt-2 text-white text-sm font-semibold font-satoshi px-5 py-2 rounded-xl transition-colors ${
            appearance.theme == 'dark'
              ? 'bg-[#f17e27] hover:bg-[#e16d16]'
              : 'bg-gray-800 hover:bg-gray-700'
          }`}
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
          <p
            className={`text-sm font-semibold ${
              appearance.theme == 'dark' ? 'text-white' : 'text-gray-700'
            }`}
          >
            Uploaded Files:
          </p>
          <div className='flex flex-col gap-2 max-h-52 overflow-y-auto [scrollbar-width:thin]'>
            <div
              key={file.id}
              className={`flex items-center gap-3 rounded-xl p-3 ${
                appearance.theme == 'dark'
                  ? 'border border-slate-700 bg-[#202020]'
                  : 'border border-gray-200'
              }`}
            >
              <div
                className={`w-10 h-12 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shrink-0 ${
                  file.type === 'application/pdf' ? 'bg-red-500' : 'bg-blue-500'
                }`}
              >
                {getFileIcon(file.type)}
              </div>

              <div className='flex flex-col flex-1 min-w-0 gap-1'>
                <p
                  className={`text-sm font-semibold font-IBM truncate ${
                    appearance.theme == 'dark' ? 'text-white' : ''
                  }`}
                >
                  {file.name}
                </p>
                {file.status === 'uploading' ? (
                  <div className='flex flex-col gap-1'>
                    <div
                      className={`flex items-center gap-2 text-xs ${
                        appearance.theme == 'dark'
                          ? 'text-slate-400'
                          : 'text-gray-500'
                      }`}
                    >
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
                    <div
                      className={`w-full h-1.5 rounded-full overflow-hidden ${
                        appearance.theme == 'dark'
                          ? 'bg-slate-700'
                          : 'bg-gray-200'
                      }`}
                    >
                      <div
                        className='h-full bg-blue-500 rounded-full transition-all duration-300'
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className={`flex items-center gap-1 text-xs ${
                      appearance.theme == 'dark'
                        ? 'text-slate-400'
                        : 'text-gray-500'
                    }`}
                  >
                    <span>{formatBytes(file.size)}</span>
                    <span>·</span>
                    <CheckCircle className='w-3.5 h-3.5 text-blue-500' />
                    <span
                      className={`font-medium ${
                        appearance.theme == 'dark'
                          ? 'text-slate-300'
                          : 'text-gray-600'
                      }`}
                    >
                      Completed
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={() => removeFile(file.id)}
                className={`shrink-0 transition-colors ${
                  appearance.theme == 'dark'
                    ? 'text-slate-400 hover:text-red-500'
                    : 'text-gray-400 hover:text-red-500'
                }`}
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
          className={`flex-1 text-sm font-semibold font-satoshi py-4 rounded-xl transition-colors ${
            appearance.theme == 'dark'
              ? 'border border-slate-700 text-slate-300 hover:bg-slate-700'
              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Cancel
        </button>
        <button
          onClick={() => navigateNext()}
          style={{ backgroundColor: loading ? 'gray' : '#ff8904' }}
          className={`flex-1 cursor-pointer flex justify-center gap-5 text-white items-center text-sm font-semibold font-satoshi py-4 rounded-xl transition-colors`}
        >
          {loading || mutation.isPending ? (
            <div className=' small-loader border-4 '></div>
          ) : (
            'Upload File'
          )}
        </button>
      </div>
    </section>
  )
}
