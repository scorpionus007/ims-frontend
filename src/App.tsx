import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import ApplicationForm from './pages/ApplicationForm';
import EnrollmentForm from './pages/EnrollmentForm';
import AdminDashboard from './pages/admin/AdminDashboard';
import FreshApplications from './pages/admin/FreshApplications';
import PendingApplications from './pages/admin/PendingApplications';
import OngoingInterns from './pages/admin/OngoingInterns';
import RejectedApplications from './pages/admin/RejectedApplications';
import CompletedInterns from './pages/admin/CompletedInterns';
import InternDashboard from './pages/intern/InternDashboard';
import { authService } from './services/authService';
import './App.css';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getCurrentUser();
  const showLayout = isAuthenticated && user;

  return (
    <Router>
      <div className="app">
        {showLayout && (
          <>
            <Header />
            <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
          </>
        )}
        <main className={`main-content ${showLayout ? 'with-layout' : ''}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to={user?.role === 'Admin' ? '/admin' : '/intern/dashboard'} /> : <Login />} />
            <Route path="/apply" element={<ApplicationForm />} />
            <Route path="/enroll/:id" element={<EnrollmentForm />} />
            
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/fresh" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <FreshApplications />
              </ProtectedRoute>
            } />
            <Route path="/admin/pending" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <PendingApplications />
              </ProtectedRoute>
            } />
            <Route path="/admin/ongoing" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <OngoingInterns />
              </ProtectedRoute>
            } />
            <Route path="/admin/rejected" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <RejectedApplications />
              </ProtectedRoute>
            } />
            <Route path="/admin/completed" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <CompletedInterns />
              </ProtectedRoute>
            } />
            
            <Route path="/intern/dashboard" element={
              <ProtectedRoute allowedRoles={['Intern']}>
                <InternDashboard />
              </ProtectedRoute>
            } />
            <Route path="/intern/reports" element={
              <ProtectedRoute allowedRoles={['Intern']}>
                <InternDashboard />
              </ProtectedRoute>
            } />
            <Route path="/intern/profile" element={
              <ProtectedRoute allowedRoles={['Intern']}>
                <div>Profile (Coming Soon)</div>
              </ProtectedRoute>
            } />
            
            
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <Navigate to="/admin/fresh" replace />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
