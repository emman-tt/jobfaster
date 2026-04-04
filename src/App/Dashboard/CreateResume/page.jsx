import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ChooseTemplate from '../Overview/Modals/ChooseTemplate'

export default function CreateResume () {
  const { chooseTemplate } = useSelector(state => state.modal.modals)

  return (
    <section className='w-full h-full relative'>
      {chooseTemplate && <ChooseTemplate />}
      <Outlet />
    </section>
  )
}
