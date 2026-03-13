import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import Onboarding from './Pages/Onboarding'
import { Personal } from './App/Onboarding/Peronal-step1/Personal'
import Jobs from './App/Onboarding/Job-step3/Job'
import Format from './App/Onboarding/Format-step4/Format'
import Experience from './App/Onboarding/Experience-step2/Experience'
import Dashboard from './Pages/Dashboard'
import Overview from './App/Dashboard/Overview/Overview'
import { FullPreview } from './App/Dashboard/Resume/FullPreview'
import Resume from './App/Dashboard/Resume/Resume'
function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={'/onboarding/personal'} />} />
        <Route path='/onboarding' element={<Onboarding />}>
          <Route path='personal' element={<Personal />} />
          <Route path='job' element={<Jobs />} />
          <Route path='experience' element={<Experience />} />
          <Route path='format' element={<Format />} />
        </Route>
        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<Navigate to={'/dashboard/overview'} />} />
          <Route path='overview' element={<Overview />} />
          <Route path='resumes' element={<Overview />} />
          <Route path='folder/:id' element={<Overview />} />
          <Route path='file' element={<Resume />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
