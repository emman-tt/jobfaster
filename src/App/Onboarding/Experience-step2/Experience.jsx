import { AddNewButton } from '../../../components/AddNewButton'
import { BackNext } from '../../../components/BackNext'
import { PlusCircle, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  saveExperience,
  addExtraField,
  saveErrors,
  removeField,
  saveExperiencePoints
} from '../../../store/experienceSlice'
import { validateExperience } from '../Validators/experience'
import { useNavigate } from 'react-router-dom'
import { QuestionHeader } from '../../../components/QuestionHeader'
// import YearsDrop from '../../../components/YearDropdown'
export default function Experience () {
  const dispatch = useDispatch()
  const { experience } = useSelector(state => state.experience)
  const [values, setValues] = useState({})

  useEffect(() => {
    setValues(prev => {
      const newValues = { ...prev }
      experience.forEach(item => {
        if (
          item.points &&
          item.points.length > 0 &&
          newValues[item.id] === undefined
        ) {
          let str = item.points.join('\n•')
          newValues[item.id] = '•' + str
        }
      })
      return newValues
    })
  }, [experience])

  const navigate = useNavigate()

  function handleChange (e, id) {
    const { name, value } = e.target

    if (name == 'points') {
      setValues(prev => ({ ...prev, [id]: value }))
      const valueArray = value.split('\n•')
      const editedArray = valueArray.map(item => {
        if (item.includes('•')) {
          const use = item.replace('•', '')
          return use
        }
        return String(item)
      })
      dispatch(saveExperiencePoints({ id: id, value: editedArray }))
      return
    }

    dispatch(
      saveExperience({
        id: id,
        value: value,
        option: name
      })
    )
  }

  function navigateNext () {
    try {
      navigate('/onboarding/additional')
    } catch (err) {
      console.error('Validation failed to execute:', err)
    }
  }

  function addNewField () {
    const newFeild = {
      id: Date.now(),
      jobTitle: '',
      startMonth: null,
      startYear: null,
      endMonth: null,
      endYear: null,
      points: [],
      location: '',
      company: ''
    }
    dispatch(addExtraField(newFeild))
  }

  const handleKeyDown = (e, id) => {
    const { value } = e.target
    if (e.key === 'Enter') {
      if (!value.trim().length) {
        return
      }
      e.preventDefault()
      setValues(prev => ({ ...prev, [id]: `${prev[id] || ''}\n•` }))
    }
  }

  const handleFocus = id => {
    setValues(prev => {
      if (!prev[id]) {
        return { ...prev, [id]: '•' }
      }
      return prev
    })
  }

  return (
    <section className='w-full h-max  flex flex-col py-20 pt-10  rounded-2xl bg-white'>
      <section className='flex flex-col gap-24'>
        <section className='flex flex-col  gap-0'>
          {experience.map((item, i) => (
            <section
              key={item.id}
              className='grid grid-cols-2 gap-2 mt-0 pt-5 px-6 '
            >
              <div className=' flex  col-span-2 justify-between items-center'>
                <h2 className='text-sm  font-semibold bg-slate-100  rounded-3xl px-4 w-max py-3 flex justify-center items-center'>
                  Experience <span className=' ml-5'> {i + 1}</span>
                </h2>
                <button
                  onClick={() => {
                    dispatch(removeField(item.id))
                  }}
                  className='p-2 gap-5 text-xs text-red-400 cursor-pointer bg-red-200 flex justify-center rounded-full items-center'
                >
                  Remove
                  <Trash2 className='w-3 text-red-500 h-3' />
                </button>
              </div>
              <input
                name='jobTitle'
                value={experience[i].jobTitle}
                // value={education[i]?.instituition}
                type='text'
                onChange={e => handleChange(e, item.id)}
                className='w-full col-span-2 border text-sm border-slate-300 rounded-xl text-black outline-0 py-4 pl-15 pr-3'
                placeholder={'Job Title / role'}
              />

              <div className='w-full col-span-2 flex gap-3 border-0 text-sm border-slate-300 rounded-xl text-black outline-0 '>
                <input
                  name='location'
                  type='text'
                  value={experience[i].location}
                  onChange={e => handleChange(e, item.id)}
                  className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
                  placeholder={'Location'}
                />
                <input
                  name='company'
                  type='text'
                  value={experience[i].company}
                  onChange={e => handleChange(e, item.id)}
                  className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
                  placeholder={'Company'}
                />
              </div>

              <div className='w-full flex gap-3 border-0 text-sm border-slate-300 rounded-xl text-black outline-0 '>
                {/* <input
                  name='startMonth'
                  type='number'
                  onChange={e => handleChange(e, item.id)}
                  className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
                  placeholder={'Start Month'}
                /> */}
                <input
                  value={experience[i].startYear}
                  name='startYear'
                  type='number'
                  onChange={e => handleChange(e, item.id)}
                  className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
                  placeholder={'Start Year'}
                />
              </div>
              <div className='w-full flex gap-3 border-0 text-sm border-slate-300 rounded-xl text-black outline-0 '>
                {/* <input
                  // value={education[i].startYear}
                  name='endMonth'
                  type='number'
                  onChange={e => handleChange(e, item.id)}
                  className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
                  placeholder={'End Month'}
                /> */}
                <input
                  value={experience[i].endYear}
                  name='endYear'
                  type='number'
                  onChange={e => handleChange(e, item.id)}
                  className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
                  placeholder={'End Year'}
                />
              </div>

              <section className=' w-full mt-5 gap-5 col-span-2 flex flex-col'>
                <QuestionHeader question=' Bullet points about your experience'>
                  Contextualize your technical choices by explaining the
                  specific problems you solved and focus on the direct outcomes
                  of your implementation, using measurable metrics to quantify
                  how your work improved the overall system, architecture, or
                  user experience.
                </QuestionHeader>

                <div className='  border flex flex-col items-start min-h-60 rounded-md px-5'>
                  <textarea
                    name='points'
                    value={values[item.id] || ''}
                    onKeyDown={e => handleKeyDown(e, item.id)}
                    onFocus={() => handleFocus(item.id)}
                    onChange={e => handleChange(e, item.id)}
                    className='w-full flex  flex-wrap h-full  p-4 rounded-md    font-sans leading-relaxed resize-none outline-none'
                  />
                </div>
              </section>
            </section>
          ))}
        </section>
      </section>

      <div className='w-full flex mt-15 justify-center'>
        <AddNewButton
          text=' Add More Experience'
          onClick={() => addNewField()}
          className={'w-[30%] py-4 items-center'}
        >
          <PlusCircle className='w-4 h-4' />
        </AddNewButton>
      </div>
      <BackNext
        previousLink='/onboarding/personal'
        onClick={() => navigateNext()}
        className={'mt-25 px-10'}
      />
    </section>
  )
}
