import { NavLink } from 'react-router-dom'
import { Header } from './header'
import Main from './Main'
import { useSelector } from 'react-redux'
export default function Overview () {
  const { appearance } = useSelector(state => state.preferences)
  const { showHeader } = useSelector(state => state.dashboard)
  return (
    <section
      className={`h-full  ${
        showHeader ? '' : 'overflow-y-auto overflow-x-hidden'
      }  [scrollbar-width:thin] ${
        appearance.theme == 'dark' ? 'bg-[#202020]' : 'bg-white'
      } max-sm:overflow-y-scroll max-sm:h-screen max-sm:pb-30 `}
    >
      <Header />
      <Main />
      <NavLink
        to={'/dashboard/resumes'}
        className=' flex justify-center hover:text-orange-400 mt-10 underline text-xs font-satoshi'
      >
        View all resumes
      </NavLink>
    </section>
  )
}
