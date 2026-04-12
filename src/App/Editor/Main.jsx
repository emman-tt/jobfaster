import Canvas from './Canvas'
import Steps from './Steps'

export function Main ({ activeSection }) {
  const sectionLabels = {
    identity: 'Identity',
    experience: 'Experience',
    education: 'Education',
    projects: 'Projects',
    capabilities: 'Capabilities',
    achievements: 'Achievements',
    presentation: 'Presentation'
  }

  return (
    <section className='h-full w-full overflow-hidden flex'>
      <Steps />
      <div className='flex-1 overflow-auto'>
        <Canvas />
      </div>
    </section>
  )
}
