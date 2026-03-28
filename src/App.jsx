import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import Onboarding from './Pages/Onboarding'
import { Personal } from './App/Onboarding/Peronal-step1/Personal'
import Jobs from './App/Onboarding/Job-step3/Job'
import Format from './App/Onboarding/Format-step4/Format'
import Experience from './App/Onboarding/Experience-step2/Experience'
import Dashboard from './Pages/Dashboard'
import Overview from './App/Dashboard/Overview/Overview'
import Resume from './App/Dashboard/Resume/Resume'
import Correction from './Pages/Correction'
import CreateResume from './App/Dashboard/CreateResume/page'
import Select from './App/Dashboard/CreateResume/Select'
import Examples from './App/Dashboard/CreateResume/examples'
import Finale from './App/Onboarding/Finale'
import QuickAction from './Pages/QuickActions'
import { Toaster } from 'sonner'
import Job from './App/Dashboard/Job/Job'
import Finalize from './App/Dashboard/Job/Finalize'
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
            borderRadius: '1.25rem',
          }
        }}
      />
      <Routes>
        <Route path='/' element={<Navigate to={'/onboarding/personal'} />} />
        <Route path='/correction' element={<Correction />} />
        <Route path='/quick/actions' element={<QuickAction />} />
        <Route path='/onboarding' element={<Onboarding />}>
          <Route path='personal' element={<Personal />} />
          <Route path='job' element={<Jobs />} />
          <Route path='experience' element={<Experience />} />
          <Route path='format' element={<Format />} />
          {/* <Route path='finale' element={<Finale />} /> */}
        </Route>
        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<Navigate to={'/dashboard/overview'} />} />
          <Route path='overview' element={<Overview />} />
          <Route path='resumes' element={<Overview />} />
          <Route path='folder/:id' element={<Overview />} />
          <Route path='file' element={<Resume />} />

          <Route path='job' element={<Job />} />
          <Route path='finalize' element={<Finalize />} />

          <Route path='create/resume' element={<CreateResume />}>
            {/* <Route path='select' element={<Select />} /> */}
            <Route path='examples' element={<Examples />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
