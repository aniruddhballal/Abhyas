import { Routes, Route } from 'react-router-dom'
import DateNavigator from './components/DateNavigator'
import RAM from './components/RAM.tsx'
import Cache from './components/Cache'
import DailyWrapper from './components/DailyWrapper'

function App() {
  return (
    <Routes>
      <Route path="/" element={<DateNavigator />} />
      <Route path="/daily/:date" element={<DailyWrapper />} />
      <Route path="/ram" element={<RAM />} />
      <Route path="/cache" element={<Cache />} />
    </Routes>
  )
}

export default App