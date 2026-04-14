import Achievements from './Achievements/Achievement'
import Certifications from './Certifications/Certifications'
import Education from './Education/Education'
import Experience from './Experience/Experience'
import Identity from './Identity/Identity'
import Languages from './Languages/Languages'
import Projects from './Projects/Projects'
import Skills from './Skills/Skills'

export default function Steps () {
  return (
    <section className=' w-[40%]  pb-20 pt-10 h-full bg-white/90  overflow-y-scroll'>
      <Identity />
      <Experience />
      <Education />
      <Projects />
      <Skills />
      <Languages />
      <Achievements />
      <Certifications />
    </section>
  )
}
