import Builder from './Builder'
import Iframe from './Iframe'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { FetchPrograms } from '../../../services/Program'
export default function Resume ({ data }) {
  const [searchParams] = useSearchParams()
  const resumeId = searchParams.get('resumeID')
  const folderId = searchParams.get('folderID')

  const { data: output, isLoading } = useQuery({
    queryKey: ['program'],
    queryFn: FetchPrograms
  })
  const programs = output?.data

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

  if (isLoading) return <div>Loading...</div>
  if (!resume) return <div>Resume not found</div>

  if (type == 'builder') {
    return <Builder resume={resume} layoutId={resume.layoutId} />
  }
  if (type == 'upload') {
    return <Iframe resume={resume.metaData} />
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h2 className='text-xl font-semibold'>Unknown type</h2>
    </div>
  )
}
