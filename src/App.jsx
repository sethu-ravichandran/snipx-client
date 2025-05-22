import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import UrlShortener from './components/UrlShortener'
import UrlList from './components/UrlList'
import Footer from './components/Footer'
import RedirectHandler from './components/RedirectHandler'
import { ThemeProvider } from './context/ThemeContext'

const App = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const refreshUrls = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-white text-purple-800 dark:bg-black dark:text-white transition-colors duration-300">
          <Toaster position="bottom-center" />
          <Header />

          <main className="flex-1 container mx-auto px-4 py-8">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <UrlShortener onShorten={refreshUrls} />
                    <UrlList refresh={refreshTrigger} />
                  </>
                }
              />
              <Route path="/:shortcode" element={<RedirectHandler />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
