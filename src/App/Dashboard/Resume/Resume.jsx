import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FullPreview } from './FullPreview'
export default function Resume () {
  const [searchParams] = useSearchParams()
  const resumeId = searchParams.get('resumeID')
  const folderId = searchParams.get('folderID')
  const { programs } = useSelector(state => state.files)

  const foundFolder = programs.find(item => item.id === Number(folderId))

  function getFile () {
    if (!foundFolder) {
      const foundFile = programs.find(item => item.id === Number(resumeId))

      return foundFile.content
    }

    const foundFile = foundFolder.files.find(
      item => item.id === Number(resumeId)
    )

    return foundFile.content
  }

  return (
    <section className=' w-full h-screen'>
      <FullPreview content={getFile()} />
    </section>
  )
}
