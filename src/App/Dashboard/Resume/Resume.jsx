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
    if (folderId) {
      const folder = programs.find(item => item.id === Number(folderId))
      if (folder && folder.files) {
        return folder.files.find(file => file.id === Number(resumeId))
      }
    }

    return programs.find(item => item.file.id == resumeId)
  }
  const resume = findResume().file
  const type = resume.source

  if (type == 'builder') {
    return <Builder resume={resume} layoutId={resume.layoutId} />
  }
  if (type == 'upload') {
    return <Iframe resume={resume.metaData} />
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h2 className='text-xl font-semibold'>Template not found</h2>
      <p>Layout ID: {data?.layoutId}</p>
    </div>
  )
}
