import { Header } from './header'
import Main from './Main'
import { useSelector } from 'react-redux'
export default function Overview () {
  const { appearance } = useSelector(state => state.preferences)
  const { showHeader } = useSelector(state => state.dashboard)
  return (
    <section
      className={`h-full ${
        showHeader ? '' : 'overflow-y-auto overflow-x-hidden'
      }  [scrollbar-width:thin] ${
        appearance.theme == 'dark' ? 'bg-[#202020]' : 'bg-white'
      } `}
    >
      <Header />
      <Main />
    </section>
  )
}
