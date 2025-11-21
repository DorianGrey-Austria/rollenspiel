import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AgeSelectionPage } from './pages/AgeSelectionPage'
import { LocationInputPage } from './pages/LocationInputPage'
import { StoryPage } from './pages/StoryPage'

// MUSEUM GUIDE VARIANT - Main App Router
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AgeSelectionPage />} />
        <Route path="/location" element={<LocationInputPage />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
