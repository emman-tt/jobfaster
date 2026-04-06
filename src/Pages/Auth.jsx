import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import authImg from '../assets/img/auth1.jpg'
import { login, register } from '../services/auth'
import { toast } from 'sonner'
import { toastPresets } from '../components/toasters'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'

import { setToken } from '../libs/token'
export default function Auth () {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loader, showLoader] = useState(false)
  const navigate = useNavigate()

  function handleAuth () {
    if (!email || !password) {
      return toast.error('Something went wrong', {
        position: 'top-center',
        ...toastPresets.authError('Please provide all the input credentials')
      })
    }
    showLoader(true)

    if (isLogin) {
      return login(password, email)
        .then(res => {
          validateLogin(res)
        })
        .finally(() => {
          showLoader(false)
        })
    }

    register(name, password, email)
      .then(res => {
        validateRegister(res)
      })
      .finally(() => {
        showLoader(false)
      })
  }

  function validateLogin (res) {
    if (res.statusCode == 422) {
      return toast.error('Something went wrong', {
        position: 'top-center',
        ...toastPresets.authError('Please provide all the input credentials')
      })
    }

    if (res.statusCode == 401) {
      toast.error('Something went wrong', {
        position: 'top-center',
        ...toastPresets.authError('Invalid user credentials')
      })
      return
    }

    if (Number(res.statusCode) > 200) {
      return toast.error('Something went wrong', {
        position: 'top-center',
        ...toastPresets.authError('Please try again')
      })
    }

    setToken()
    toast.success('Account created succesfully', {
      position: 'top-center',
      ...toastPresets.aiSuccess(`Welcome back ${name}, got any jobs to apply?`)
    })
    navigate('/dashboard')
  }
  function validateRegister (res) {
    if (res.statusCode == 422) {
      return toast.error('Something went wrong', {
        position: 'top-center',
        ...toastPresets.authError('Please provide all the input credentials')
      })
    }

    if (res.statusCode == 401) {
      toast.error('Something went wrong', {
        position: 'top-center',
        ...toastPresets.authError('User already exists please log in')
      })
      return setIsLogin(true)
    }

    if (Number(res.statusCode) > 200) {
      return toast.error('Something went wrong', {
        position: 'top-center',
        ...toastPresets.authError('Please try again')
      })
    }

    toast.success('Account created succesfully', {
      position: 'top-center',
      ...toastPresets.aiSuccess(`Welcome ${name}, lets start the applications`)
    })
    navigate('/dashboard')
  }

  return (
    <div className='w-screen overflow-hidden h-screen flex relative  font-satoshi bg-white'>
      {/* Left Column */}
      <div className='hidden lg:flex relative w-[30%] flex-col justify-between  text-white overflow-hidden'>
        <div className=' absolute w-full h-full'>
          <img
            src={authImg}
            className=' w-full  h-full object-cover'
            alt='image'
          />
        </div>

        <div className='absolute inset-0 ' />

        {/* Logo/Brand */}
        <div className='relative z-10 flex p-5 items-center gap-2'>
          <Sparkles className='w-5 h-5 text-[#f17e27]' />
          <span className='font-IBM font-bold text-lg tracking-tight'>
            Jobfaster
          </span>
        </div>

        <div className='relative z-10 p-10 space-y-4 max-w-md'>
          <h2 className='text-xl font-bold font-IBM leading-tight'>
            "Applied to 47 jobs in 2 days. Landed 8 interviews. Would have taken
            me 3 weeks manually."
          </h2>
          <div>
            <p className='font-bold text-sm'>Michael Chen</p>
            <p className='text-xs text-slate-400'>
              Senior Software Engineer → Now at Lala
            </p>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className=' flex-1   '>
        {loader && (
          <Loader
            className={
              ' absolute  w-full backdrop-blur-sm items-center pl-100  bg-[#e9e4e4a1] h-full'
            }
          />
        )}
        <div
          className={`flex flex-col  p-12 pl-50 items-start justify-center 
        } `}
        >
          <div className='w-full max-w-sm space-y-8'>
            {/* Form Header */}
            <div className='text-center space-y-2 mb-10'>
              <h1 className='text-3xl font-bold text-slate-900 font-IBM tracking-tight transition-all'>
                {isLogin ? 'Welcome back to Jobfaster' : 'Create an account'}
              </h1>
              <p className='text-sm text-slate-500 font-medium px-4 transition-all'>
                {isLogin
                  ? 'Build your career effortlessly with our powerful resume and cover letter tools.'
                  : 'Join Jobfaster to build your career effortlessly with our tools.'}
              </p>
            </div>

            <form className='space-y-5' onSubmit={e => e.preventDefault()}>
              {/* Name Input (Sign Up Only) */}
              {!isLogin && (
                <div className='relative'>
                  <label
                    htmlFor='name'
                    className='absolute -top-2.5 left-3 px-1.5 bg-white text-xs font-bold text-slate-500'
                  >
                    Full Name
                  </label>
                  <input
                    id='name'
                    type='text'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder='Alex Jordan'
                    className='w-full px-4 py-3 border-2 border-slate-200 focus:border-[#f17e27] rounded-xl outline-none transition-colors text-sm text-slate-900 placeholder:text-slate-400'
                  />
                </div>
              )}

              {/* Email Input */}
              <div className='relative'>
                <label
                  htmlFor='email'
                  className='absolute -top-2.5 left-3 px-1.5 bg-white text-xs font-bold text-slate-500'
                >
                  Email
                </label>
                <input
                  id='email'
                  type='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder='alex.jordan@gmail.com'
                  className='w-full px-4 py-3 border-2 border-slate-200 focus:border-[#f17e27] rounded-xl outline-none transition-colors text-sm text-slate-900 placeholder:text-slate-400 '
                />
              </div>

              {/* Password Input */}
              <div className='relative'>
                <label
                  htmlFor='password'
                  className='absolute -top-2.5 left-3 px-1.5 bg-white text-xs font-bold text-slate-500'
                >
                  Password
                </label>
                <input
                  id='password'
                  type='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder='••••••••••'
                  className='w-full px-4 py-3 border-2 border-slate-200 focus:border-[#f17e27] rounded-xl outline-none transition-colors text-sm text-slate-900 placeholder:text-slate-300 '
                />
              </div>

              {/* Forgot Password (Login Only) */}
              {isLogin && (
                <div className='flex pt-1'>
                  <a
                    href='#'
                    className='text-sm font-bold text-[#f17e27] hover:text-[#e16d16] transition-colors'
                  >
                    Forgot password?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleAuth}
                type='submit'
                className='w-full py-3.5 bg-[#f17e27] hover:bg-[#e16d16] text-white text-sm font-bold rounded-full shadow-lg shadow-orange-100 transition-all active:scale-[0.98]'
              >
                {isLogin ? 'Log in' : 'Create account'}
              </button>

              {/* Divider */}
              <div className='flex items-center justify-between py-2'>
                <div className='h-px bg-slate-100 flex-1' />
                <span className='px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider'>
                  Or
                </span>
                <div className='h-px bg-slate-100 flex-1' />
              </div>

              {/* Google Button */}
              <button
                type='button'
                className='w-full py-3 bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-700 text-sm font-bold rounded-full transition-all flex items-center justify-center gap-3 active:scale-[0.98]'
              >
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                    fill='#4285F4'
                  />
                  <path
                    d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                    fill='#34A853'
                  />
                  <path
                    d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                    fill='#FBBC05'
                  />
                  <path
                    d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                    fill='#EA4335'
                  />
                </svg>
                Continue with Google
              </button>

              {/* Toggle Sign up / Login */}
              <div className='text-center pt-2'>
                <span className='text-sm font-medium text-slate-500'>
                  {isLogin
                    ? "Don't have an account?"
                    : 'Already have an account?'}
                  <button
                    type='button'
                    onClick={() => setIsLogin(!isLogin)}
                    className='font-bold text-[#f17e27] hover:text-[#e16d16] transition-colors pl-1 cursor-pointer outline-none'
                  >
                    {isLogin ? 'Sign up' : 'Log in'}
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
