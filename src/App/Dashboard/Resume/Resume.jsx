import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FullPreview } from './FullPreview'
export default function Resume () {
  const { id } = useParams()

  const foundFile = useSelector(state =>
    state.files.programs.find(item => item.id === Number(id))
  )
  console.log(foundFile)

  return (
    <section className=' w-full h-screen'>
      <FullPreview content={foundFile.content} />
    </section>
  )
}
