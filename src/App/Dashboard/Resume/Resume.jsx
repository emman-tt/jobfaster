import Builder from './Builder'
import Iframe from './Iframe'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { FetchPrograms } from '../../../services/Program'
import { useSelector } from 'react-redux'
import { FolderCodeIcon } from 'lucide-react'

export default function Resume () {
  const [searchParams] = useSearchParams()
  const resumeId = searchParams.get('resumeID')
  const folderId = searchParams.get('folderID')
  const { appearance } = useSelector(state => state.preferences)

  const { data: output, isLoading } = useQuery({
    queryKey: ['program'],
    queryFn: FetchPrograms
  })
  const programs = output

  const findResume = () => {
    if (!programs) return null

    if (folderId) {
      const folder = programs.find(item => item.folder?.id == folderId)
      if (folder?.files) {
        return folder.files.find(file => file.id == resumeId)
      }
    }
    return programs.find(item => item.file?.id == resumeId)?.file
  }

  const resume = findResume()
  const type = resume?.source

  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen gap-4'>
        <div className='custom-loader'></div>
      </div>
    )
  }

  if (!resume) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen gap-4'>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            appearance.theme == 'dark' ? 'bg-[#2a2a2a]' : 'bg-orange-50'
          }`}
        >
          <FolderCodeIcon
            className={`w-6 h-6 ${
              appearance.theme == 'dark' ? 'text-white' : 'text-orange-300'
            }`}
          />
        </div>
        <p
          className={`text-lg font-satoshi font-semibold ${
            appearance.theme == 'dark' ? 'text-white' : 'text-slate-800'
          }`}
        >
          Resume not found
        </p>
        <p
          className={`text-sm font-satoshi text-center max-w-60 ${
            appearance.theme == 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          This resume may have been deleted or the link is invalid.
        </p>
      </div>
    )
  }

  if (type == 'builder') {
    return <Builder resume={resume} />
  }
  if (type == 'upload') {
    return <Iframe resume={resume.metaData} />
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-4'>
      <h2 className='text-xl font-semibold'>Unknown type</h2>
    </div>
  )
}
