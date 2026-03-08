import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import Onboarding from './Pages/Onboarding'
import { Personal } from './App/Onboarding/Personal'
import Jobs from './App/Onboarding/Job'
import Format from './App/Onboarding/Format'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={'/onboarding/role'} />} />
        <Route path='/onboarding' element={<Onboarding />}>
          <Route path='role' element={<Personal />} />
          <Route path='job' element={<Jobs />} />
          <Route path='format' element={<Format />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
