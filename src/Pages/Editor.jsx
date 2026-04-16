import { useState } from 'react'
import { Sidebar } from '../App/Editor/Sidebar'
import { Topbar } from '../App/Editor/Topbar'
import { Main } from '../App/Editor/Main'


export default function Editor () {
  const [isPreview, setIsPreview] = useState(false)
  const [activeSection, setActiveSection] = useState('identity')

  return (
    <section className='dotted-pattern w-full h-full absolute flex '>
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <section className=' w-full flex flex-col'>
        <Topbar isPreview={isPreview} setIsPreview={setIsPreview} />
        <Main activeSection={activeSection} />
      </section>
    </section>
  )
}
