import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FullPreview } from './FullPreview'
import { Download, Undo2 } from 'lucide-react'
export default function Resume () {
  const [searchParams] = useSearchParams()
  const resumeId = searchParams.get('resumeID')
  const folderId = searchParams.get('folderID')
  const navigate = useNavigate()
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
    <section className=' w-full h-screen relative '>
      <section className=' absolute top-[10%] font-IBM text-sm flex gap-4 flex-col left-10'>
        <div
          onClick={() => {
            navigate(-1)
          }}
          className=' flex gap-2 border-b-2  border-white hover:border-black cursor-pointer '
        >
          <Undo2 className='w-4 h-4' />
          <p>Back</p>
        </div>
        <div className=' flex gap-2 border-b-2  border-white hover:border-black cursor-pointer'>
          <Download className='w-4 h-4' />
          <p>Download</p>
        </div>
      </section>
      <FullPreview content={getFile()} />
    </section>
  )
}
