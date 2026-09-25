import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './views/Dashboard'
import Configuration from './views/Configuration'
import Sidebar from './components/Sidebar'

function App() {
  const [minimized, setMinimized] = useState<boolean>(false);

  return (
    <>
      <BrowserRouter>
        <div className='app-container'>
          <Sidebar minimized={minimized} setMinimized={setMinimized}/>
          <div className='main-content'>
            <Routes>
              <Route path='/' element={<Dashboard/>}/>
              <Route path='/config' element={<Configuration/>}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
