import { X } from 'lucide-react'
import folderImage from '../../../../assets/img/folder.png'
import { useDispatch } from 'react-redux'
import { toggleModals } from '../../../../store/modalSlice'
import { useState } from 'react'
import { toast } from 'sonner'
import { toastPresets } from '../../../../components/toasters'
import { useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FetchPrograms, UploadFolder } from '../../../../services/Program'
export default function Folder () {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const [folderName, setFolderName] = useState('')
  const [saving, setSaving] = useState(false)

  function closeFolderModal () {
    dispatch(toggleModals('folder'))
  }


  const mutation = useMutation({
    mutationFn: UploadFolder,
    onSuccess: data => {
      setSaving(false)
      queryClient.invalidateQueries({ queryKey: ['program'] })
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
        ...toastPresets.generalSuccess('Please provide a folder name'),
        position: 'top-center'
      })
    }
    setSaving(true)

    mutation.mutate(folderName)
  }

  return (
    <section className='absolute h-130 p-2 pb-5 transition-all duration-200 ease-in-out translate-x-130 translate-y-15 z-51 shadow-xl w-[28%] bg-white rounded-2xl flex flex-col gap-4'>
      <div
        onClick={() => {
          closeFolderModal()
        }}
        className=' w-9 self-end  shadow-sm cursor-pointer flex justify-center items-center p-1 rounded-lg'
      >
        <X />
      </div>
      <div className=' w-full h-[70%] rounded-xl flex justify-center items-center bg-gray-50'>
        <img src={folderImage} className=' w-[70%] h-auto' alt='' />
      </div>
      <div className='w-full px-10 mt-4'>
        {mutation.isError && (
          <div className=' text-red-500 text-xs font-semibold'>
            Please give a name to your folder
          </div>
        )}
        <input
          onChange={e => setFolderName(e.target.value)}
          type='text'
          placeholder='Folder name'
          className=' border-b border-gray-400 pb-2 w-full outline-0 '
        />
      </div>

      <div onClick={navigateNext} className=' px-15 w-full'>
        <button
          className={` ${
            saving ? 'bg-gray-400 text-white' : 'bg-orange-200 text-black'
          } cursor-pointer rounded-xl w-full py-3 flex justify-center items-center `}
        >
          {saving ? 'Saving ...' : 'Create Folder'}
        </button>
      </div>
    </section>
  )
}
