import { useNavigate } from 'react-router-dom'

export default function SaveResume () {
  const navigate = useNavigate()
  return (
    <section className=' relative z-100 w-120 h-90 py-7 justify-between   self-center rounded-xl bg-white  items-center flex flex-col'>
      <img
        width='80'
        height='80'
        src='https://img.icons8.com/officel/80/receipt-approved.png'
        alt='receipt-approved'
      />
      <h3>Resume created Successfully!</h3>

      <div className=' rounded-xl bg-slate-50 p-10 flex  flex-col py-5 gap-3 h-[40%] w-[70%]'>
        <h3 className=' font-semibold font-IBM'>Give your Resume a name</h3>
        <input
          type='text'
          className=' rounded-xl border px-5 outline-0 border-gray-600 w-full h-30'
        />
      </div>

      <button
        onClick={() => {
          navigate('/quick/actions')
        }}
        className=' cursor-pointer rounded-xl bg-[#fcbe77] text-black px-13  font-satoshi font-semibold py-3'
      >
        Continue
      </button>
    </section>
  )
}
