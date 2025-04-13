import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import ProfileEdit from './pages/ProfileEdit';
import EmergencyPage from './pages/EmergencyPage';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

function App() {
  const [isQRGenerated, setIsQRGenerated] = useState(false);

  const handleQRGeneration = () => {
    setIsQRGenerated(true);
  };

  return (
    <>
      <Navbar />
      <Routes>
        {/* Default Route: Show Dashboard on site open */}
        <Route path="/" element={<LandingPage />} />

        <Route path="/" element={<Dashboard />} />
        
        {/* Other Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register onQRGenerate={handleQRGeneration} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<PrivateRoute><ProfileEdit /></PrivateRoute>} />
        <Route path="/emergency" element={<EmergencyPage />} />

        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;