import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import QuotePage from './pages/QuotePage'
import ProviderPage from './pages/ProviderPage'
import Header from './sections/Header'
import Footer from './sections/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/provider" element={<ProviderPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
