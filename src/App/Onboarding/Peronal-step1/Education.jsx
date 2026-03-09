import { useEffect, useState } from 'react'
import { QuestionHeader } from '../../../components/QuestionHeader'
import { Plus, Trash2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { saveEducation } from '../../../store/personalSlice'

export default function Education () {
  const [edu, setEdu] = useState([
    {
      id: 1,
      level: '',
      instituition: '',
      degree: '',
      year: ''
    }
  ])
  const dispatch = useDispatch()
  function removeEducation (id) {
    setEdu(prev => prev.filter(item => item.id != id))
  }
  function addNewEducation () {
    const newField = {
      id: crypto.randomUUID(),
      level: '',
      instituition: '',
      degree: '',
      year: ''
    }

    setEdu([...edu, newField])
  }

  function handleChange (e, id) {
    const { value, name } = e.target

    setEdu(prev =>
      prev.map(item => (item.id === id ? { ...item, [name]: value } : item))
    )
  }

  useEffect(() => {
    dispatch(saveEducation(edu))
  }, [edu, dispatch])

  return (
    <section className='w-full mt-20'>
      <QuestionHeader
        question='  What is your highest level of education institution, degree, and
        graduation year?'
      >
        List your most advanced degrees. Skip high school unless it's your most
        recent academic achievement.
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
              onChange={e => handleChange(e, item.id)}
              className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
              placeholder={'level'}
            />
            <input
              name='institution'
              onChange={e => handleChange(e, item.id)}
              className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
              placeholder={'institution'}
            />
            <input
              name='degree'
              type='text'
              onChange={e => handleChange(e, item.id)}
              className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
              placeholder={'degree'}
            />
            <input
              name='year'
              type='number'
              onChange={e => handleChange(e, item.id)}
              className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
              placeholder={'year'}
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
