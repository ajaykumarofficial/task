import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './component/Navbar';
import ProtectedRoute from './component/ProtectedRoute';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <>
    <Navbar/>
    
      <Routes>
        
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    
    </>
  )
}

export default App
