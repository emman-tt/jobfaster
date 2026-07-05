import Activity from './Activity'
import Records from './Records'
import { useSelector } from 'react-redux'

export default function Rightbar ({ className, data, total, hasMore, onLoadMore }) {
  const { appearance } = useSelector(state => state.preferences)
  return (
    <section
      className={`flex flex-col  pt-10  ${
        appearance.theme == 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'
      } ${className}`}
    >
      {/* <Records percentage={50} /> */}
      <Activity data={data} total={total} hasMore={hasMore} onLoadMore={onLoadMore} />

    </section>
  )
}
