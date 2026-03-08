import { useEffect, useState } from 'react'

export const TwoButtonsAnswer = ({
  options = [1, 2],
  className,
  defaultSelect = ''
}) => {
  const [biOptions, setBiOptions] = useState([
    { id: options[0], selected: false, name: options[0] },
    { id: options[1], selected: true, name: options[1] }
  ])

  useEffect(() => {
    setBiOptions(prev =>
      prev.map(item =>
        item.name === defaultSelect
          ? { ...item, selected: true }
          : { ...item, selected: false }
      )
    )
  }, [defaultSelect])

  function selector (id) {
    setBiOptions(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, selected: true }
          : { ...item, selected: false }
      )
    )
  }
  return biOptions.map(item => (
    <div
      key={item.id}
      onClick={() => selector(item.id)}
      className={`flex  gap-5 w-full border cursor-pointer rounded-xl py-4 px-2 pl-5 border-slate-200 hover:shadow-lg transition-all duration-200 ease items-center ${className}`}
    >
      <div
        className={`border ${
          item.selected && 'border-4'
        } border-[#ec5b13] inline-block w-4 h-4  rounded-full`}
      ></div>
      <div className='text-sm font-semibold'>{item.name}</div>
    </div>
  ))
}
