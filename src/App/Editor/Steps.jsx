import Education from './Education/Education'
import Experience from './Experience/Experience'
import Identity from './Identity/Identity'
import Projects from './Projects/Projects'

export default function Steps () {
  return (
    <section className=' w-[40%]  pb-20 pt-10 h-full bg-white/90  overflow-y-scroll'>
      <Identity />
      <Experience />
      <Education />
      <Projects />
    </section>
  )
}
