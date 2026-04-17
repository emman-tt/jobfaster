import { useState } from 'react'
import Achievements from './Achievements/Achievement'
import Certifications from './Certifications/Certifications'
import Education from './Education/Education'
import Experience from './Experience/Experience'
import Identity from './Identity/Identity'
import Languages from './Languages/Languages'
import Projects from './Projects/Projects'
import Skills from './Skills/Skills'
import { Resizable } from 're-resizable'
export default function Steps () {
  const [width, setWidth] = useState(20)
  const [isResizing, setIsResizing] = useState(false)

  return (
    <Resizable
      handleStyles={{
        right: {
          right: 100,
          borderRight: 5,
          border: '2px solid orange'
        }
      }}
      style={{ width: width }}
      maxWidth={650}
      onResize={() => {
        setIsResizing(true)
      }}
      onResizeStop={(event, direction, elementRef, delta) => {
        setWidth(width + delta.width)
        setIsResizing(false)
      }}
      className={` overflow-hidden [scrollbar-width:thin]   pb-20 pt-10 h-full bg-white/90  ${
        isResizing && 'border-r-2 border-orange-500'
      } overflow-y-scroll`}
    >
      <Identity />
      <Experience />
      <Education />
      <Projects />
      <Skills />
      <Languages />
      <Achievements />
      <Certifications />
    </Resizable>
  )
}
