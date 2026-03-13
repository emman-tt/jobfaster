import Activity from './Activity'
import Records from './Records'

export default function Rightbar ({ className }) {
  return (
    <section className={`bg-[#f8f8f8] flex flex-col pt-20 h-full ${className}`}>
      <Records />
      <Activity />
    </section>
  )
}

