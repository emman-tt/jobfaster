import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import Onboarding from './Pages/Onboarding'
import { Personal } from './App/Onboarding/Peronal-step1/Personal'
import Jobs from './App/Onboarding/Job-step2/Job'
import Format from './App/Onboarding/Format-step3/Format'
import Experience from './App/Onboarding/Experience-step2/Experience'

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
      </Routes>
    </BrowserRouter>
  )
}

export default App
