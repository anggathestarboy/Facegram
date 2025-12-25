import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "react-router-dom"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedLogin from './components/ProtectedLogin'
import MyProfile from './pages/MyProfile'
import CreatePost from './pages/CreatePost'
import UserProfile from './pages/UserProfile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedLogin><Login/></ProtectedLogin>} />
        <Route path='/register' element={<ProtectedLogin><Register/></ProtectedLogin> } />
        <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute> } />
        <Route path='/myprofile' element={<ProtectedRoute><MyProfile/></ProtectedRoute> } />
        <Route path='/post/create' element={<ProtectedRoute><CreatePost /></ProtectedRoute> } />
        <Route path='/userprofile/:username' element={<ProtectedRoute><UserProfile/></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
