import { AddNewButton } from '../../../components/AddNewButton'
import { PlusCircle, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import {
  saveCertificates,
  setShowCertificate,
  addCertificateField,
  removeCertificateField
} from '../../../store/additionalSlice'
import { QuestionHeader } from '../../../components/QuestionHeader'

const options = [
  { id: 1, name: 'Yes' },
  { id: 2, name: 'No' }
]

export default function Certificates () {
  const dispatch = useDispatch()
  const { certificates, showCertificates } = useSelector(state => state.additional)

  function handleOptionSelect (name) {
    dispatch(setShowCertificate(name === 'Yes'))
  }

  function handleChange (e, id) {
    const { name, value } = e.target
    dispatch(
      saveCertificates({
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
      issuer: '',
      year: '',
      url: ''
    }
    dispatch(addCertificateField(newField))
  }

  return (
    <section className='mt-20'>
      <div className='px-6'>
        <QuestionHeader question='Do you want to show certificates on your resume?'>
          Adding professional certifications can help validate your skills and
          make your resume more credible to employers.
        </QuestionHeader>

        <ul className='grid w-full grid-cols-2 gap-3 mt-5 px-6'>
          {options.map(item => (
            <li
              key={item.id}
              onClick={() => handleOptionSelect(item.name)}
              className={`flex gap-5 w-full border cursor-pointer rounded-xl py-4 pl-5 hover:shadow-lg transition-all duration-200 ease items-center justify-center px-2  
                  ${
                    (item.name === 'Yes' && showCertificates) ||
                    (item.name === 'No' && !showCertificates)
                      ? 'border-[#ec5b13]'
                      : 'border-slate-200'
                  }
                `}
            >
              <div
                className={`border ${
                  (item.name === 'Yes' && showCertificates) ||
                  (item.name === 'No' && !showCertificates)
                    ? 'border-4'
                    : ''
                } border-[#ec5b13] inline-block w-4 h-4 rounded-full`}
              ></div>
              <div className='text-sm font-semibold'>{item.name}</div>
            </li>
          ))}
        </ul>
      </div>

      {showCertificates && (
        <div className='mt-10'>
          <section className='flex flex-col gap-24'>
            <section className='flex flex-col gap-0'>
              {certificates.map((item, i) => (
                <section
                  key={item.id}
                  className='grid grid-cols-2 gap-2 mt-0 pt-5 px-6 '
                >
                  <div className=' flex col-span-2 justify-between items-center'>
                    <h2 className='text-sm font-semibold bg-slate-100 rounded-3xl px-4 w-max py-3 flex justify-center items-center'>
                      Certificate <span className=' ml-5'> {i + 1}</span>
                    </h2>
                    <button
                      onClick={() => {
                        dispatch(removeCertificateField(item.id))
                      }}
                      className='p-2 gap-5 text-xs text-red-400 cursor-pointer bg-red-200 flex justify-center rounded-full items-center'
                    >
                      Remove
                      <Trash2 className='w-3 text-red-500 h-3' />
                    </button>
                  </div>
                  <input
                    name='name'
                    value={certificates[i].name}
                    type='text'
                    onChange={e => handleChange(e, item.id)}
                    className='w-full col-span-2 border text-sm border-slate-300 rounded-xl text-black outline-0 py-4 pl-10 pr-3'
                    placeholder={'Certificate Name (e.g., AWS Solutions Architect)'}
                  />

                  <div className='w-full col-span-2 flex gap-3 border-0 text-sm border-slate-300 rounded-xl text-black outline-0 '>
                    <input
                      name='issuer'
                      type='text'
                      value={certificates[i].issuer}
                      onChange={e => handleChange(e, item.id)}
                      className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
                      placeholder={'Issuing Organization (e.g., Amazon)'}
                    />
                    <input
                      name='year'
                      type='text'
                      value={certificates[i].year}
                      onChange={e => handleChange(e, item.id)}
                      className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
                      placeholder={'Year (e.g., 2024)'}
                    />
                  </div>

                  <div className='w-full col-span-2 flex gap-3 border-0 text-sm border-slate-300 rounded-xl text-black outline-0 '>
                    <input
                      name='url'
                      type='text'
                      value={certificates[i].url}
                      onChange={e => handleChange(e, item.id)}
                      className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
                      placeholder={'Verification URL (optional)'}
                    />
                  </div>
                </section>
              ))}
            </section>
          </section>

          <div className='w-full flex mt-15 justify-center'>
            <AddNewButton
              text='Add More Certificates'
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
