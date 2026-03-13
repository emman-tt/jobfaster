import {
  Ban,
  BriefcaseBusiness,
  FilePenLineIcon,
  FileText,
  FolderOpen,
  Mail
} from 'lucide-react'

export default function Activity () {
  function formatDate (item) {
    if (!item) {
      return ''
    }
    const formatted = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(new Date(item))

    return formatted
  }

  function findIcon (item) {
    switch (item) {
      case 'folder':
        return <FolderOpen className='w-4 h-4' />

      case 'file':
        return <FileText className='w-4 h-4' />

      case 'job':
        return <BriefcaseBusiness className='w-4 h-4' />

      case 'mail':
        return <Mail className='w-4 h-4' />

      default:
        return <Ban />
    }
  }

  return (
    <section className=' w-full h-[70%]  pt-0 py-10 px-5'>
      <h3 className=' text-gray-600 font-semibold font-IBM border-b pb-2'>
        Activity Log
      </h3>

      <section className=' w-full  h-full py-5 overflow-y-auto overflow-x-clip [scrollbar-width:thin]'>
        <section className=' flex flex-col gap-2 '>
          {activities.reverse().map(item => (
            <section className=' flex flex-col gap-2' key={item.id}>
              <div className=' flex w-fullg-amber-300  gap-2 items-center '>
                <p className=' p-1.5 py-2 rounded-lg bg-gray-200 flex justify-center items-center'>
                  {findIcon(item.type)}
                </p>
                <p className=' text-sm font-IBM '>{item.message}</p>
              </div>
              <div className='flex w-full border-l-3 h-9 ml-3 border-gray-300 pl-5 gap-3 items-start'>
                <p className='text-xs  font-IBM  '>
                  {formatDate(item.timeline)}
                </p>
              </div>
            </section>
          ))}
        </section>
      </section>
    </section>
  )
}
const activities = [
  {
    id: 1,
    type: 'folder',
    message: 'Created a new folder called Astroverse',
    timeline: '2026-02-20T11:30:00Z',
    reference: ''
  },
  {
    id: 2,
    type: 'file',
    message: 'Uploaded a new resume file - RubyAi.pdf',
    timeline: '2026-02-20T15:00:00Z',
    reference: ''
  },
  {
    id: 3,
    type: 'job',
    message: 'Applied for a job at YouBloom.inc',
    timeline: '2026-02-22T09:30:00Z',
    reference: ''
  },
  {
    id: 4,
    type: 'folder',
    message: 'Created a new folder called Astroverse',
    timeline: '2026-02-22T11:01:00Z',
    reference: ''
  },
  {
    id: 5,
    type: 'file',
    message: 'Created a new resume file called Manny.pdf',
    timeline: '2026-02-23T16:05:20Z',
    reference: ''
  },
  {
    id: 6,
    type: 'mail',
    message: 'Integrated a new email account',
    timeline: '2026-02-23T17:30:10Z',
    reference: ''
  },
  {
    id: 7,
    type: 'job',
    message: 'Applied for a job at Google',
    timeline: '2026-02-24T05:13:10Z',
    reference: ''
  },
  {
    id: 8,
    type: 'job', // Netflix
    message: 'Applied for a job at Netflix',
    timeline: '2026-02-24T09:33:11Z',
    reference: ''
  },
  {
    id: 9, // Fixed ID from 8 to 9
    type: 'file',
    message: 'Created a new resume file called Rumble.pdf',
    timeline: '2026-02-25T10:09:00Z',
    reference: ''
  }
]
