import { useState } from 'react'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Home from './pages/Home'

function App() {

  return (
    <>
     <div>
     <Navbar/>
     <Header/>
     <Home/>
     </div>
    </>
  )
}

export default App
