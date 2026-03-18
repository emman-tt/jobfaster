import { QuestionHeader } from '../../../components/QuestionHeader'
import { Plus, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import {
  saveEducation,
  addEducationField,
  removeEducationField
} from '../../../store/personalSlice'

export default function Education () {
  const error = useSelector(state => state.personal.errors.education)
  const { education } = useSelector(state => state.personal)

  const dispatch = useDispatch()

  function removeEducation (id) {
    dispatch(removeEducationField(id))
  }
  function addNewEducation () {
    dispatch(addEducationField())
  }

  function handleChange (e, id) {
    const { value, name } = e.target

    dispatch(saveEducation({ name: name, value: value, id: id }))
  }

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
        {education.map((item, i) => (
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
              value={education[i]?.level}
              onChange={e => handleChange(e, item.id)}
              className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
              placeholder={'level / education point'}
            />
            <input
              name='instituition'
              value={education[i]?.instituition}
              onChange={e => handleChange(e, item.id)}
              className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
              placeholder={'instituition'}
            />
            <div className='w-full flex gap-3 border-0 text-sm border-slate-300 rounded-xl text-black outline-0'>
              <input
                value={education[i].degree}
                name='degree'
                type='text'
                onChange={e => handleChange(e, item.id)}
                className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
                placeholder={'degree / course'}
              />
              <input
                name='gpa'
                value={education[i].gpa}
                type='number'
                onChange={e => handleChange(e, item.id)}
                className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
                placeholder={'gpa / grade'}
              />
            </div>
            <div className='w-full flex gap-3 border-0 text-sm border-slate-300 rounded-xl text-black outline-0 '>
              <input
                value={education[i].startYear}
                name='startYear'
                type='number'
                onChange={e => handleChange(e, item.id)}
                className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
                placeholder={'Start Year'}
              />
              <input
                value={education[i].endYear}
                name='endYear'
                type='number'
                onChange={e => handleChange(e, item.id)}
                className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
                placeholder={'End Year'}
              />
            </div>
          </section>
        ))}
      </section>
      <p className='text-red-500 font-semibold text-xs pl-14 '>
        {error?.length > 0 && error}
      </p>
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
