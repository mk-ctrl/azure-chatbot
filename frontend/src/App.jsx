import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from './pages/login';
import ChatPage from './pages/chatPage';
const App = () => {
  return (
    <div>
      <Routes>
        {/* <Route path='/' element={<LoginPage/>}></Route> */}
        <Route path='/chat' element={<ChatPage/>}></Route>
      </Routes>
    </div>
  )
}

export default App
