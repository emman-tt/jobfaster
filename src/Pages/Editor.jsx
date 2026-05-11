import { useState } from 'react'
import { Sidebar } from '../App/Editor/Sidebar'
import { Topbar } from '../App/Editor/Topbar'
import { Main } from '../App/Editor/Main'

export default function Editor () {
  const [activeSection, setActiveSection] = useState('identity')

  return (
    <section className='dotted-pattern overflow-x-clip w-full h-full absolute flex '>
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <section className=' w-full flex flex-col'>
        <Topbar />
        <Main activeSection={activeSection} />
      </section>
    </section>
  )
}
