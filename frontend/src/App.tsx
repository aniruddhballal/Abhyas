import { Routes, Route } from 'react-router-dom'
import DateNavigator from './components/DateNavigator'
import DailyWrapper from './components/DailyWrapper'
import ScratchPad from './components/ScratchPad'

function App() {
  return (
    <Routes>
      <Route path="/" element={<DateNavigator />} />
      <Route path="/daily/:date" element={<DailyWrapper />} />
      <Route path="/scratchpad" element={<ScratchPad />} />
    </Routes>
  )
}

export default App