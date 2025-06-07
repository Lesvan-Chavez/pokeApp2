import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import About from './pages/about.jsx'
import ContactUs from './pages/contact.jsx'
import Pokemon from './components/pokemon.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/pokemon/:pokeID' element={<Pokemon />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
