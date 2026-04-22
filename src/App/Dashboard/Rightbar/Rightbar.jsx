import Activity from './Activity'
import Records from './Records'
import { useSelector } from 'react-redux'

export default function Rightbar ({ className, data }) {
  const { appearance } = useSelector(state => state.preferences)
  return (
    <section
      className={`flex flex-col  pt-20 h-full ${
        appearance.theme == 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'
      } ${className}`}
    >
      <Records percentage={50} />
      <Activity data={data} />
    </section>
  )
}
