import { X } from 'lucide-react'
import folderImage from '../../../../assets/img/folder.png'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModals } from '../../../../store/modalSlice'
import { useState } from 'react'
import { toast } from 'sonner'
import { toastPresets } from '../../../../components/toasters'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UploadFolder } from '../../../../services/Program'
export default function Folder () {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const { appearance } = useSelector(state => state.preferences)
  const [folderName, setFolderName] = useState('')
  const [saving, setSaving] = useState(false)

  function closeFolderModal () {
    dispatch(toggleModals('folder'))
  }

  const mutation = useMutation({
    mutationFn: UploadFolder,
    onSuccess: () => {
      setSaving(false)
      queryClient.invalidateQueries({ queryKey: ['program'] })
      queryClient.invalidateQueries({ queryKey: ['activity'] })
      toast.success(`Folder created successfully as ${folderName}`, {
        ...toastPresets.generalSuccess()
      })
      dispatch(toggleModals('folder'))
    },
    onError: () => {
      setSaving(false)
      toast.error('Failed to create folder', {
        ...toastPresets.generalError()
      })
    }
  })

  function navigateNext () {
    if (!folderName.length) {
      return toast.error('Error saving folder', {
        ...toastPresets.generalError('Please provide a folder name'),
        position: 'top-center'
      })
    }
    setSaving(true)

    mutation.mutate(folderName)
  }

  return (
    <section
      className={`fixed inset-0 m-auto z-51 w-[calc(100%-2rem)] sm:w-[28%] max-w-md max-h-[90vh] sm:h-max h-auto p-4 sm:p-6 pb-5 shadow-xl rounded-2xl flex flex-col gap-4 ${
        appearance.theme == 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'
      }`}
    >
      <div
        onClick={() => {
          closeFolderModal()
        }}
        className={`w-9 self-end shadow-sm cursor-pointer flex justify-center items-center p-1 rounded-lg ${
          appearance.theme == 'dark' ? 'hover:bg-slate-700' : ''
        }`}
      >
        <X className={appearance.theme == 'dark' ? 'text-slate-400' : ''} />
      </div>
      <div
        className={`w-full h-[70%] rounded-xl flex justify-center items-center ${
          appearance.theme == 'dark' ? 'bg-[#202020]' : 'bg-gray-50'
        }`}
      >
        <img src={folderImage} className='w-[70%] h-auto' alt='' />
      </div>
      <div className='w-full px-10 mt-4'>
        {mutation.isError && (
          <div className='text-red-500 text-xs font-semibold'>
            Please give a name to your folder
          </div>
        )}
        <input
          onChange={e => setFolderName(e.target.value)}
          type='text'
          placeholder='Folder name'
          className={`border-b pb-2 w-full outline-0 ${
            appearance.theme == 'dark'
              ? 'bg-transparent border-slate-700 text-white placeholder:text-slate-500'
              : 'border-gray-400'
          }`}
        />
      </div>

      <div onClick={navigateNext} className='px-15 w-full'>
        <button
          className={`cursor-pointer rounded-xl w-full py-3 flex justify-center items-center ${
            saving
              ? 'bg-gray-400 text-white'
              : appearance.theme == 'dark'
              ? 'bg-[#f17e27] text-white'
              : 'bg-orange-200 text-black'
          }`}
        >
          {saving ? 'Saving ...' : 'Create Folder'}
        </button>
      </div>
    </section>
  )
}
