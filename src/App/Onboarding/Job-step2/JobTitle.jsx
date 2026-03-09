import { useMemo, useState } from 'react'
import { Job_titles } from '../../../utils/PersonalSkills'
import { QuestionHeader } from '../../../components/QuestionHeader'
import { Search } from 'lucide-react'
export default function JobTitle () {
  const [searchInput, setSearchInput] = useState('')
  const filteredTitles = useMemo(() => {
    const query = searchInput.toLowerCase().trim()
    if (query === '') {
      return []
    }

    return Job_titles.filter(item => {
      return item.toLowerCase().trim().includes(query)
    })
  }, [searchInput])
  return (
    <section className='w-full flex items-center'>
      <QuestionHeader question='   What specific job titles are you targeting ?'>
        Different industries have distinct language, tone, and
        standards—specialization helps use right keywords
      </QuestionHeader>

      <div className='flex relative border rounded-2xl items-center gap-5 py-3 ml-15 mt-4 self-end  w-[60%] px-10 border-black'>
        <Search className='w-6 h-6' />
        <input
          type='text'
          onChange={e => setSearchInput(e.target.value)}
          className='w-full h-full outline-0 text-sm'
          placeholder='Search by keywords '
        />

        {/* Suggestion Box */}
        {searchInput.length > 0 && (
          <div className='absolute shadow-sm rounded-xl z-4 w-full -bottom-42 font-mono overflow-y-scroll overflow-hidden h-40 p-8 pt-2 text-sm font-light bg-white gap-1.5 flex flex-col left-0 right-0'>
            {filteredTitles.map(item => (
              <span className=' cursor-pointer hover:text-orange-500'>
                {item}
              </span>
            ))}
            <p className='text-black'>
              {searchInput.length > 2 && searchInput}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
