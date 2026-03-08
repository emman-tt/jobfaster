import { useState } from 'react'
import { QuestionHeader } from '../../components/QuestionHeader'
import { ChevronDown, Icon, Plus, Trash2 } from 'lucide-react'
import { AddNewButton } from '../../components/addNewButton'
import { onlineProfiles } from '../../utils/links'
import { BackNext } from '../../components/BackNext'
import { TwoButtonsAnswer } from '../../components/TwoButtonsAnswer'
export default function Format () {
  const [docuType, setDocuType] = useState(docu)
  const [summary, setSummary] = useState(summaryType)
  const [links, setLinks] = useState(onlineProfiles)
  //   const [linkFields, setLinkFields] = useState([])
  //   const [linkQuery, setLinkQuery] = useState('')
  const [linksBox, showLinksBox] = useState(false)

  function selectSummary (id) {
    setSummary(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, selected: true }
          : { ...item, selected: false }
      )
    )
  }
  function selectDocuType (id) {
    setDocuType(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, selected: true }
          : { ...item, selected: false }
      )
    )
  }

  function addNewLink (id) {
    setLinks(prev =>
      prev.map(item => (item.id === id ? { ...item, selected: true } : item))
    )
  }

  function removeLink (id) {
    setLinks(prev =>
      prev.map(item => (item.id === id ? { ...item, selected: false } : item))
    )
  }
  return (
    <section className=' w-full pb-20  h-full p-10 px-15 flex flex-col pt-5 rounded-2xl bg-white'>
      <QuestionHeader question='Which file format do you plan to submit? (PDF, Word Doc, Plain Text, etc.)'>
        Note that PDF preserves formatting hence it's the default and standard
        but some ATS systems prefer Word documents for parsing
      </QuestionHeader>
      <ul className='grid grid-cols-3 gap-3 mt-5 px-10'>
        {docuType.map(item => (
          <li
            key={item.id}
            onClick={() => {
              selectDocuType(item.id)
            }}
            className='flex  gap-5 w-full border cursor-pointer rounded-xl py-4 px-2 pl-5 border-slate-200 hover:shadow-lg transition-all duration-200 ease items-center'
          >
            <div
              className={`border ${
                item.selected && 'border-4'
              } border-[#ec5b13] inline-block w-4 h-4  rounded-full`}
            ></div>
            <div className='  text-sm font-semibold'>{item.name}</div>
          </li>
        ))}
      </ul>

      <section className='mt-14'>
        <QuestionHeader question=' Should your resume include a professional summary or objective statement at the top?'>
          Objective statements are outdated and only needed for entry level with
          no skills nor knowledge nor idea of the job whiles profesionnal
          summary is standard and hooks the recruiter to your resume.
        </QuestionHeader>

        <ul className='grid w-[70%] grid-cols-2 gap-3 mt-5 px-10'>
          {summary.map(item => (
            <li
              key={item.id}
              onClick={() => selectSummary(item.id)}
              className='flex  gap-5 w-full border cursor-pointer rounded-xl py-4 px-2 pl-5 border-slate-200 hover:shadow-lg transition-all duration-200 ease items-center'
            >
              <div
                className={`border ${
                  item.selected && 'border-4'
                } border-[#ec5b13] inline-block w-4 h-4  rounded-full`}
              ></div>
              <div className='  text-sm font-semibold'>{item.name}</div>
            </li>
          ))}
        </ul>
      </section>

      <section className='mt-15 '>
        <QuestionHeader question=' Do you want to include links to your portfolio, GitHub, or online profiles?'>
          Hyperlinked portfolios give immediate access to work samples,ensure
          links are working and not very long
        </QuestionHeader>

        {/* Selected links */}
        <section className='mt-5 flex flex-col gap-4 px-10'>
          {links.map(
            item =>
              item.selected === true && (
                <div key={item.id} className='flex gap-2  w-full'>
                  <div className='text-sm p-10 pr-2 gap-4 py-4 flex items-center  cursor-pointer min-w-[30%] shadow  rounded-xl'>
                    <svg
                      role='img'
                      viewBox='0 0 24 24'
                      color='blue'
                      fill={item.fill}
                      height={16}
                      width={16}
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d={item.path} />
                    </svg>
                    <p>{item.name}</p>
                  </div>
                  <input
                    type='text'
                    className=' py-4 pl-7 w-full pr-4 rounded-2xl shadow'
                    placeholder='Type or paste the link here'
                  />
                  <button
                    onClick={() => {
                      removeLink(item.id)
                    }}
                    className='p-2 cursor-pointer  px-4 h-max py-4 self-center bg-red-200 flex justify-center rounded-full items-center'
                  >
                    <Trash2 className='w-3 text-red-500 h-3' />
                  </button>
                </div>
              )
          )}
        </section>
        <div className='px-10 w-full flex items-center gap-5  mt-4'>
          <div className='min-w-[30%] relative  '>
            <div
              onClick={() => {
                showLinksBox(e => !e)
              }}
              className='w-full cursor-pointer rounded-2xl shadow py-4 px-6 text-sm font-semibold flex justify-between'
            >
              Select Link
              <button>
                <ChevronDown
                  className={`h-5 transition-all cursor-pointer duration-150 ease  ${
                    linksBox ? 'rotate-180' : 'rotate-0'
                  } w-5`}
                />
              </button>
            </div>

            {/* Floating Links Box */}
            {linksBox && (
              <ul className=' absolute z-10 bg-white  flex flex-col justify-between p-10 pr-2 gap-4 py-4 overflow-y-scroll h-40      w-full text-black rounded-xl shadow-lg [scrollbar-width:thin]'>
                {links.map(
                  item =>
                    item.selected === false && (
                      <li
                        onClick={() => {
                          addNewLink(item.id)
                        }}
                        className='text-sm gap-4 flex items-center  cursor-pointer'
                        key={item.id}
                      >
                        <svg
                          role='img'
                          viewBox='0 0 24 24'
                          color='blue'
                          fill={item.fill}
                          height={16}
                          width={16}
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path d={item.path} />
                        </svg>
                        {item.name}
                      </li>
                    )
                )}
              </ul>
            )}
          </div>
          <input
            type='text'
            className=' py-4 pl-7 w-full pr-4 rounded-2xl shadow'
            placeholder='Type or paste the link here'
          />

          {/* <div className='w-full'>
            <AddNewButton className={'w-full h-full py-4 text-xs'}>
              <Plus className='w-3 h-3' />
            </AddNewButton>
          </div> */}
        </div>
      </section>

      <section className='mt-15'>
        <QuestionHeader question='Should you include dates for education and certifications?'>
          For professionals with 20+ years of experience, removing the
          graduation year from a degree obtained in the early 2000s can help
          prevent "age-guessing" by recruiters.
        </QuestionHeader>

        <section className='flex w-[60%] mt-8 px-10 gap-5'>
          <TwoButtonsAnswer options={Yes_and_no} />
        </section>
      </section>

      <BackNext className={'mt-15'} previousLink='/onboarding/job' />
    </section>
  )
}

const Yes_and_no = [
  { id: 1, selected: false, name: 'Yes' },
  { id: 2, selected: true, name: 'No' }
]

const summaryType = [
  { id: 1, selected: true, name: 'Professional summary' },
  { id: 2, selected: false, name: 'Objectives summary' }
]

const docu = [
  { id: 1, selected: true, name: 'PDF (.pdf)' },
  { id: 2, selected: false, name: 'Word document(.word)' },
  { id: 3, selected: false, name: 'Plain text (.txt)' }
]
