import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './components/Landing'
import GetStarted from './components/GetStarted'
import Privacy from './components/Privacy'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </BrowserRouter>
  )
}
