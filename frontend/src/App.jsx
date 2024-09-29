// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuthStore } from './context/store';
import ProtectedRoute from './components/ProtectedRoute';
import CreatePost from './pages/CreatePost';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import Stepper from './pages/Stepper';
import Explore from './pages/Explore';
import Post from './pages/Post';
import Requests from './pages/Requests';
import CreatePost2 from './pages/CreatePost2';
import Messages from './pages/Messages';
import Saved from './pages/Saved';






const App = () => {
  const { validateToken, user } = useAuthStore();

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
        <Route path="/:username" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
        <Route path="/createpost" element={<ProtectedRoute><Layout><CreatePost /></Layout></ProtectedRoute>} />
        <Route path="/createpost2" element={<ProtectedRoute><Layout><CreatePost2 /></Layout></ProtectedRoute>} />
        <Route path="/saved" element={<ProtectedRoute><Layout><Saved /></Layout></ProtectedRoute>} />
        <Route path="/explore" element={<ProtectedRoute><Layout><Explore /></Layout></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><Layout><Messages /></Layout></ProtectedRoute>} />
        <Route path="/requests" element={<ProtectedRoute><Layout><Requests /></Layout></ProtectedRoute>} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path='/stepper' element={<Stepper />} />
        <Route path='/post/:postId' element={<Layout><Post/></Layout>} />
      </Routes>
    
    </Router>
  );
}

export default App;
