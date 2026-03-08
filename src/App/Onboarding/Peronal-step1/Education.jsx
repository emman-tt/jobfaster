import { useState } from 'react'
import { QuestionHeader } from '../../../components/QuestionHeader'
import { Plus, Trash2 } from 'lucide-react'

export default function Education () {
  function removeEducation (id) {
    setEdu(prev => prev.filter(item => item.id != id))
  }
  function addNewEducation () {
    const newField = {
      id: crypto.randomUUID(),
      level: 'Level of Education',
      instituition: 'Instituition',
      degree: 'Degree',
      year: 'Graduation year'
    }

    setEdu([...edu, newField])
  }

  const [edu, setEdu] = useState([
    {
      id: 1,
      level: 'Level of Education',
      instituition: 'Instituition',
      degree: 'Degree',
      year: 'Graduation year'
    }
  ])
  return (
    <section className='w-full mt-10'>
      <QuestionHeader
        question='  What is your highest level of education institution, degree, and
        graduation year?'
      >
        If your education is on the higher level like University,Masters PHd
        etc. please avoid add lower educations like high school unless you are a
        fresh graduate.
      </QuestionHeader>
      <section className='flex flex-col  gap-0'>
        {edu.map((item, i) => (
          <section
            key={item.id}
            className='grid grid-cols-2 gap-2 mt-0 pt-5 p-6'
          >
            <div className='col-span-2 flex px-9 w-full justify-between'>
              <p className='text-xs w-6 h-6 font-semibold bg-gray-100 rounded-full flex justify-center items-center'>
                {i + 1}
              </p>
              <button
                onClick={() => removeEducation(item.id)}
                className='p-2 cursor-pointer bg-red-200 flex justify-center rounded-full items-center'
              >
                <Trash2 className='w-3 text-red-500 h-3' />
              </button>
            </div>
            <input
              name='level'
              className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
              placeholder={item.level}
            />
            <input
              name='institution'
              className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
              placeholder={item.instituition}
            />
            <input
              name='degree'
              className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
              placeholder={item.degree}
            />
            <input
              name='graduation'
              className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
              placeholder={item.year}
            />
          </section>
        ))}
      </section>
      <div className='w-full flex justify-center items-center'>
        <button
          onClick={() => {
            addNewEducation()
          }}
          className=' py-4 rounded-2xl bg-orange-100 gap-2 items-center cursor-pointer text-orange-400 justify-center border-0  border-black/60 mt-2 w-[30%] flex self-center text-center font-semibold'
        >
          <Plus className='w-4 h-4' /> Add new
        </button>
      </div>
    </section>
  )
}
