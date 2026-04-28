import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './components/Landing'
import GetStarted from './components/GetStarted'
import Privacy from './components/Privacy'
import DeleteAccount from './components/DeleteAccount'
import SmsConsent from './components/SmsConsent'
import Terms from './components/Terms'
import EventRentals from './components/EventRentals'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/sms-consent" element={<SmsConsent />} />
        <Route path="/eventos-renta" element={<EventRentals />} />
        <Route path="/event-rentals" element={<EventRentals />} />
      </Routes>
    </BrowserRouter>
  )
}
