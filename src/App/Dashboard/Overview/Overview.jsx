import { Header } from './header'
import Main from './Main'
import { useSelector } from 'react-redux'
export default function Overview () {
  const { appearance } = useSelector(state => state.preferences)
  return (
    <section
      className={` h-full ${
        appearance.theme == 'dark' ? 'bg-[#202020]' : 'bg-white'
      } `}
    >
      <Header />
      <Main />
    </section>
  )
}
