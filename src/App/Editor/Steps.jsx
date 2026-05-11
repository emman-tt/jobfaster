import { useState, useEffect } from 'react'
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

function StepsContent ({ editingId, setEditingId }) {
  return (
    <>
      <Identity />
      <Experience editingId={editingId} setEditingId={setEditingId} />
      <Education editingId={editingId} setEditingId={setEditingId} />
      <Projects editingId={editingId} setEditingId={setEditingId} />
      <Skills />
      <Languages />
      <Achievements editingId={editingId} setEditingId={setEditingId} />
      <Certifications editingId={editingId} setEditingId={setEditingId} />
    </>
  )
}

export default function Steps ({ editingId, setEditingId }) {
  const [isMobile] = useState(window.innerWidth < 500)
  const [width, setWidth] = useState(isMobile ? 100 : 400)
  const [isResizing, setIsResizing] = useState(false)
  const { appearance } = useSelector(state => state.preferences)

  return (
    <Resizable
      maxWidth={isMobile ? 350 : 650}
      size={{ width, height: '100%' }}
      onResize={() => setIsResizing(true)}
      enable={{ right: true, left: true }}
      className='transition-all duration-0 ease'
      onResizeStop={(event, direction, elementRef, delta) => {
        setWidth(width + delta.width)
        setIsResizing(false)
      }}
    >
      <SimpleBar
        autoHide={true}
        forceVisible='y'
        color='orange'
        className={`scrollbar-none overflow-hidden pb-16 sm:pb-20 pt-4 sm:pt-10 h-full ${
          appearance.theme == 'dark' ? 'bg-[#2a2a2a]' : 'bg-white/90'
        } ${isResizing && 'border-r-2 border-orange-500'} overflow-y-scroll`}
      >
        <StepsContent editingId={editingId} setEditingId={setEditingId} />
      </SimpleBar>
    </Resizable>
  )
}
