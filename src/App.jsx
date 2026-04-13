import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './components/Landing'
import GetStarted from './components/GetStarted'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/get-started" element={<GetStarted />} />
      </Routes>
    </BrowserRouter>
  )
}
