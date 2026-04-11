import {
  User,
  Briefcase,
  GraduationCap,
  FolderOpen,
  Award,
  Trophy,
  Palette
} from 'lucide-react'
const sections = [
  { id: 'identity', icon: User, label: 'Identity' },
  { id: 'experience', icon: Briefcase, label: 'Experience' },
  { id: 'education', icon: GraduationCap, label: 'Education' },
  { id: 'projects', icon: FolderOpen, label: 'Projects' },
  { id: 'capabilities', icon: Award, label: 'Capabilities' },
  { id: 'achievements', icon: Trophy, label: 'Achievements' },
  { id: 'presentation', icon: Palette, label: 'Presentation' }
]
export function Sidebar ({ activeSection, onSectionChange }) {
  return (
    <aside className='w-16 h-full bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-2 pt-20'>
      {sections.map(section => {
        const Icon = section.icon
        const isActive = activeSection === section.id
        return (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            title={section.label}
            className={`w-10 h-10 cursor-pointer rounded-xl flex items-center justify-center transition-all ${
              isActive
                ? 'text-[#fd9155] font-bold'
                : 'text-gray-500  hover:text-gray-700'
            }`}
          >
            <Icon size={20} />
          </button>
        )
      })}
    </aside>
  )
}
