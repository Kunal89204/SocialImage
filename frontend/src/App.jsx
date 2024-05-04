import React from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Login from "./pages/Login"
import Register from './pages/Register';
import Profile from './pages/Profile';
import Form from './pages/Form';
import Explore from './pages/Explore';
import Post from './pages/Post';








const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/editprofile" element={<Form />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/post" element={<Post />} />
    </Routes>
  </Router>
  )
}

export default App
