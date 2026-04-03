import { AddNewButton } from '../../../components/AddNewButton'
import { PlusCircle, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import {
  saveProjectField,
  addExtraField,
  removeField,
  saveProjectPoints,
  setShowProject
} from '../../../store/additionalSlice'
import { QuestionHeader } from '../../../components/QuestionHeader'

const options = [
  { id: 1, name: 'Yes' },
  { id: 2, name: 'No' }
]

function formatPoints (points) {
  if (!points || points.length === 0) return ''
  const str = points.join('\n•')
  return '•' + str
}

export default function Projects () {
  const dispatch = useDispatch()
  const { projects, showProjects } = useSelector(state => state.additional)

  function handleOptionSelect (name) {
    dispatch(setShowProject(name === 'Yes'))
  }

  function handleChange (e, id) {
    const { name, value } = e.target

    if (name === 'points') {
      const valueArray = value.split('\n•')
      const editedArray = valueArray.map(item => {
        if (item.includes('•')) {
          return item.replace('•', '')
        }
        return String(item)
      })
      dispatch(saveProjectPoints({ id, value: editedArray }))
      return
    }

    dispatch(
      saveProjectField({
        id,
        value,
        option: name
      })
    )
  }

  function addNewField () {
    const newField = {
      id: Date.now(),
      name: '',
      description: '',
      url: '',
      techStack: '',
      points: []
    }
    dispatch(addExtraField(newField))
  }

  return (
    <section className=''>
      <div className='px-6'>
        <QuestionHeader question='Do you want to show projects on your resume?'>
          Adding personal or academic projects is a great way to showcase your
          skills if you lack professional experience, or to highlight
          open-source contributions.
        </QuestionHeader>

        <ul className='grid w-full grid-cols-2 gap-3 mt-5 px-6'>
          {options.map(item => (
            <li
              key={item.id}
              onClick={() => handleOptionSelect(item.name)}
              className={`flex gap-5 w-full border cursor-pointer rounded-xl py-4 pl-5 hover:shadow-lg transition-all duration-200 ease items-center justify-center px-2  
                  ${
                    (item.name === 'Yes' && showProjects) ||
                    (item.name === 'No' && !showProjects)
                      ? 'border-[#ec5b13]'
                      : 'border-slate-200'
                  }
                `}
            >
              <div
                className={`border ${
                  (item.name === 'Yes' && showProjects) ||
                  (item.name === 'No' && !showProjects)
                    ? 'border-4'
                    : ''
                } border-[#ec5b13] inline-block w-4 h-4 rounded-full`}
              ></div>
              <div className='text-sm font-semibold'>{item.name}</div>
            </li>
          ))}
        </ul>
      </div>

      {showProjects && (
        <div className='mt-10'>
          <section className='flex flex-col gap-24'>
            <section className='flex flex-col gap-0'>
              {projects.map((item, i) => (
                <section
                  key={item.id}
                  className='grid grid-cols-2 gap-2 mt-0 pt-5 px-6 '
                >
                  <div className=' flex col-span-2 justify-between items-center'>
                    <h2 className='text-sm font-semibold bg-slate-100 rounded-3xl px-4 w-max py-3 flex justify-center items-center'>
                      Project <span className=' ml-5'> {i + 1}</span>
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
                    name='name'
                    value={projects[i].name}
                    type='text'
                    onChange={e => handleChange(e, item.id)}
                    className='w-full col-span-2 border text-sm border-slate-300 rounded-xl text-black outline-0 py-4 pl-10 pr-3'
                    placeholder={'Project Name'}
                  />

                  <div className='w-full col-span-2 flex gap-3 border-0 text-sm border-slate-300 rounded-xl text-black outline-0 '>
                    <input
                      name='description'
                      type='text'
                      value={projects[i].description}
                      onChange={e => handleChange(e, item.id)}
                      className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
                      placeholder={'Short Description (e.g., E-commerce App)'}
                    />
                    <input
                      name='url'
                      type='text'
                      value={projects[i].url}
                      onChange={e => handleChange(e, item.id)}
                      className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
                      placeholder={'Link (Live or GitHub)'}
                    />
                  </div>

                  <div className='w-full col-span-2 flex gap-3 border-0 text-sm border-slate-300 rounded-xl text-black outline-0 '>
                    <input
                      name='techStack'
                      type='text'
                      value={projects[i].techStack}
                      onChange={e => handleChange(e, item.id)}
                      className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
                      placeholder={'Tech Stack (comma separated)'}
                    />
                  </div>

                  <section className=' w-full mt-5 gap-5 col-span-2 flex flex-col'>
                    <QuestionHeader question=' Bullet points about your project'>
                      Detail your contributions, technical implementation, and
                      metrics.
                    </QuestionHeader>

                    <div className='  border flex flex-col items-start min-h-60 rounded-md px-5'>
                      <textarea
                        name='points'
                        value={formatPoints(item.points)}
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
              text='Add More Projects'
              onClick={() => addNewField()}
              className={'w-[30%] py-4 items-center'}
            >
              <PlusCircle className='w-4 h-4' />
            </AddNewButton>
          </div>
        </div>
      )}

    </section>
  )
}
