export const TextArea = ({ className, rows = 7 }) => {
  return (
    <div className={`  flex  ${className}`}>
      <textarea
        type='text'
        rows={rows}
        className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-5 pr-3'
      />
    </div>
  )
}
