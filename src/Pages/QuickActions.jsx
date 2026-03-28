import { Home, Briefcase, FileText, Zap, ChevronRight } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const actions = [
  {
    title: 'Back to home',
    description: 'Return to your main dashboard view.',
    icon: Home,

    iconColor: 'text-blue-600',
    link: '/dashboard'
  },
  {
    title: 'Apply for a job',
    description: 'Browse and apply to new opportunities.',
    icon: Briefcase,
    iconColor: 'text-emerald-600',
    link: '/job'
  },
  {
    title: 'Generate a cover letter',
    description: 'Create a tailored cover letter in seconds.',
    icon: FileText,
    iconColor: 'text-purple-600',
    link: '/cover-letter'
  },
  {
    title: 'Tailor resume',
    description: 'Optimize your resume for a specific role.',
    icon: Zap,
    iconColor: 'text-orange-600',
    link: '/tailor-resume'
  }
]

export default function QuickAction () {
  return (
    <div className='flex items-center justify-center min-h-screen bg-slate-50 p-6 font-satoshi'>
      <div className='w-full max-w-md bg-white rounded-4xl shadow-xl border border-slate-100 p-6 space-y-4'>
        <h2 className='text-xl font-bold text-slate-800 mb-6 px-2'>
          Quick Actions
        </h2>
        <div className='space-y-3'>
          {actions.map((action, index) => (
            <NavLink
              to={action.link}
              key={index}
              className='w-full flex items-center p-4 rounded-2xl hover:bg-slate-50 transition-all duration-200 group border border-transparent hover:border-slate-100 text-left'
            >
              <div
                className={`shrink-0 w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
              >
                <action.icon className={`w-6 h-6 text-orange-400`} />
              </div>
              <div className='ml-4 grow'>
                <h3 className='text-sm font-bold text-slate-900 leading-tight'>
                  {action.title}
                </h3>
                <p className='text-xs text-slate-500 mt-0.5 leading-relaxed font-inter'>
                  {action.description}
                </p>
              </div>
              <ChevronRight className='w-4 h-4 text-slate-300 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all' />
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}
