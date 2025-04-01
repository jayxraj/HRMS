import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import HRDashboard from './components/HRDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import CandidateDashboard from './components/CandidateDashboard';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import './App.css';


const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  
  if (!token) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/" replace />;
  
  return children;
};

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
         

          
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          }/>
          
          <Route path="/hr" element={
            <ProtectedRoute allowedRoles={['HR']}>
              <HRDashboard />
            </ProtectedRoute>
          }/>
          
          <Route path="/employee" element={
            <ProtectedRoute allowedRoles={['EMPLOYEE']}>
              <EmployeeDashboard />
            </ProtectedRoute>
          }/>
          
          <Route path="/candidate" element={
            <ProtectedRoute allowedRoles={['CANDIDATE']}>
              <CandidateDashboard />
            </ProtectedRoute>
          }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;