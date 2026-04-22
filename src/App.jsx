import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'

import Format from './App/Onboarding/Format-step5/Format'

import Dashboard from './Pages/Dashboard'
import Overview from './App/Dashboard/Overview/Overview'
import Resume from './App/Dashboard/Resume/Resume'
import Correction from './Pages/Correction'
import CreateResume from './App/Dashboard/CreateResume/page'
import Examples from './App/Dashboard/CreateResume/examples'

import QuickAction from './Pages/QuickActions'
import { Toaster } from 'sonner'
import Job from './App/Dashboard/Job/Job'
import Finalize from './App/Dashboard/Job/Finalize'
import Auth from './Pages/Auth'
import Additional from './App/Onboarding/Additional-step3/Additional'
import { AuthProvider } from './context/auth'
import Editor from './Pages/Editor'
import { JobListing } from './App/Dashboard/Job-listing/JobListing'
import Settings from './App/Dashboard/Settings/Settings'
import Prefrences from './App/Dashboard/Prefrences'
function App () {
  return (
    <BrowserRouter>
      <Toaster
        position='top-right'
        richColors
        expand={true}
        toastOptions={{
          style: {
            fontSize: '14px',
            borderRadius: '1.25rem'
          }
        }}
      />
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Navigate to={'/dashboard'} />} />
          <Route path='/correction' element={<Correction />} />
          <Route path='/quick/actions' element={<QuickAction />} />
          <Route path='/auth' element={<Auth />} />

          <Route path='/editor' element={<Editor />}></Route>

          <Route path='/onboarding' element={<Navigate to={'/additional'} />}>
            <Route path='additional' element={<Additional />} />
            <Route path='format' element={<Format />} />
          </Route>

          <Route path='/dashboard' element={<Dashboard />}>
            <Route index element={<Navigate to={'/dashboard/overview'} />} />
            <Route path='overview' element={<Overview />} />
            <Route path='resumes' element={<Overview />} />
            <Route path='folder/:id' element={<Overview />} />
            <Route path='file' element={<Resume />} />
            <Route path='job' element={<Job />} />
            <Route path='finalize' element={<Finalize />} />
            <Route path='listing' element={<JobListing />} />
            <Route path='settings' element={<Settings />} />
            <Route path='preference' element={<Prefrences />} />
            <Route path='templates' element={<Examples />} />
            {/* <Route path='create/resume' element={<CreateResume />}>
              <Route path='examples' element={<Examples />} />
            </Route> */}
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
