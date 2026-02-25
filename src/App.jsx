import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import HomePage from './Pages/HomePage/HomePage'
import ProductListing from './Pages/ProductListing/ProductListing'


const App = () => {
  return (
    <>
      <BrowserRouter>
      <div className="min-h-screen flex flex-col">

        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/productlisting" element={<ProductListing />} />
          </Routes>
        </main>

        <Footer />

      </div>
    </BrowserRouter>

    </>
  )
}

export default App