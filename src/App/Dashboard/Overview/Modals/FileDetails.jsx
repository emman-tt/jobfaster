import { useState, useEffect } from 'react'
import { X, Paperclip } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { closeFileDetails } from '../../../../store/modalSlice'
import TextBox from '../../../../components/Textbox'
import FilePreview from '../../Resume/FilePreview'

function formatBytes (bytes) {
  if (!bytes || bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

function MiniIframe ({ src }) {
  const thumbnailUrl = src.replace(
    '/upload/',
    '/upload/w_300,h_400,pg_1,f_jpg/'
  )
  return (
    <section className='bg-[#c4c7cc15] shadow-sm rounded-xl w-full h-full overflow-hidden'>
      <img src={thumbnailUrl} alt='' className='h-full w-full object-cover' />
    </section>
  )
}

export default function FileDetails () {
  const dispatch = useDispatch()
  const { selectedFile } = useSelector(state => state.modal)
  const { appearance } = useSelector(state => state.preferences)
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (selectedFile?.metaData?.description) {
      setDescription(selectedFile.metaData.description)
    }
  }, [selectedFile])

  function closeModal () {
    dispatch(closeFileDetails())
  }

  const tempAttachedFiles = [
    {
      id: 1,
      file: {
        metaData: {
          name: 'resume',
          extension: 'pdf',
          size: 245000
        }
      }
    },
    {
      id: 2,
      file: {
        metaData: {
          name: 'cover_letter',
          extension: 'docx',
          size: 128000
        }
      }
    },
    {
      id: 3,
      file: {
        metaData: {
          name: 'portfolio',
          extension: 'pdf',
          size: 512000
        }
      }
    }
  ]

  if (!selectedFile) return null

  return (
    <section className='absolute p-6 pb-5 transition-all duration-200 ease-in-out translate-x-120 translate-y-15 z-51 shadow h-[85%] w-[40%] bg-white rounded-xl flex flex-col'>
      <section className='h-full flex flex-col'>
        <div className='w-full flex items-center justify-between'>
          <h2 className='text-xl font-semibold font-IBM'>
            {selectedFile.metaData?.name}
          </h2>
          <div
            onClick={closeModal}
            className='shadow-sm cursor-pointer flex justify-center items-center p-1 rounded-lg hover:bg-gray-100'
          >
            <X />
          </div>
        </div>

        <div className='mt-4'>
          <div className='flex items-center gap-3'>
            <div className='bg-[#c4c7cc15] shadow-sm rounded-xl w-16 h-16 flex items-center justify-center'>
              {selectedFile.metaData?.extension == 'pdf' ? (
                <img
                  width='32'
                  height='32'
                  src='https://img.icons8.com/color/48/pdf-2--v1.png'
                  alt='pdf'
                />
              ) : (
                <img
                  width='32'
                  height='32'
                  src='https://img.icons8.com/color/48/microsoft-word-2019--v2.png'
                  alt='word'
                />
              )}
            </div>
            <div className='flex flex-col'>
              <p className='text-sm font-semibold font-satoshi'>
                {selectedFile.metaData?.name}.{selectedFile.metaData?.extension}
              </p>
              <p className='text-xs text-gray-500 font-satoshi'>
                {formatBytes(selectedFile.metaData?.size)} • Updated recently
              </p>
            </div>
          </div>
        </div>

        <div className='mt-4'>
          <label className='text-sm font-semibold font-satoshi text-gray-700 mb-2 block'>
            Description
          </label>
          <TextBox
            width='w-full'
            height='h-40'
            placeholder='Add a description...'
            value={description}
            onChange={setDescription}
          />
        </div>

        <div className='mt-4 flex-1 overflow-hidden flex flex-col'>
          <div className='flex items-center gap-2 mb-2'>
            <Paperclip size={14} className='text-gray-500' />
            <span className='text-sm font-semibold font-satoshi text-gray-700'>
              Attached Files
            </span>
            <span className='text-xs text-gray-400 font-satoshi'>
              ({tempAttachedFiles.length})
            </span>
          </div>

          <div className='flex-1 overflow-y-auto'>
            <div className='flex flex-wrap gap-2'>
              {tempAttachedFiles.map(item => (
                <div
                  key={item.id}
                  className='bg-[#c4c7cc15] shadow-sm rounded-xl w-full flex items-center p-3 gap-3'
                >
                  <div className='shrink-0'>
                    {item.file.metaData.extension == 'pdf' ? (
                      <img
                        width='23'
                        height='23'
                        src='https://img.icons8.com/color/48/pdf-2--v1.png'
                        alt='pdf'
                      />
                    ) : (
                      <img
                        width='23'
                        height='23'
                        src='https://img.icons8.com/color/48/microsoft-word-2019--v2.png'
                        alt='word'
                      />
                    )}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-xs font-semibold text-gray-700 truncate'>
                      {item.file.metaData.name}.{item.file.metaData.extension}
                    </p>
                    <p className='text-[10px] text-gray-500'>
                      {formatBytes(item.file.metaData.size)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='flex items-center justify-end gap-3 mt-4 pt-4 border-t'>
        <button
          onClick={closeModal}
          className='border flex justify-center items-center font-semibold text-sm font-satoshi p-3 py-3 rounded-xl hover:bg-gray-50'
        >
          Cancel
        </button>
        <button
          onClick={() => {
            console.log('Saving description:', description)
            closeModal()
          }}
          className='cursor-pointer bg-[#f17e27] flex justify-center items-center font-semibold text-sm font-satoshi p-3 rounded-xl hover:bg-[#e06d1a]'
        >
          Save Changes
        </button>
      </section>
    </section>
  )
}
