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
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import { useSelector } from 'react-redux'
export default function Steps ({
  editingId,
  setEditingId,

}) {
  const [width, setWidth] = useState(480)
  const [isResizing, setIsResizing] = useState(false)
  const { isPreview } = useSelector(state => state.editor)

  return (
    <Resizable
      maxWidth={650}
      defaultSize={{
        width: width
      }}
      onResize={() => {
        setIsResizing(true)
      }}
      className=' transition-all duration-0 ease'
      onResizeStop={(event, direction, elementRef, delta) => {
        setWidth(width + delta.width)
        setIsResizing(false)
      }}
    >
      <SimpleBar
        autoHide={true}
        forceVisible='y'
        color='orange'
        className={` scrollbar-none overflow-hidden
         pb-20 pt-10 h-full bg-white/90  ${
           isResizing && 'border-r-2 border-orange-500'
         } overflow-y-scroll`}
      >
        <Identity />
        <Experience editingId={editingId} setEditingId={setEditingId} />
        <Education editingId={editingId} setEditingId={setEditingId} />
        <Projects editingId={editingId} setEditingId={setEditingId} />
        <Skills />
        <Languages />
        <Achievements editingId={editingId} setEditingId={setEditingId} />
        <Certifications editingId={editingId} setEditingId={setEditingId} />
      </SimpleBar>
    </Resizable>
  )
}
