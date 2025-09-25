import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Companies from './pages/companies/Companies';
import AddCompany from './pages/companies/AddCompany';
import Managers from './pages/managers/Managers';
import AddManager from './pages/managers/AddManager';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/companies" element={
            <ProtectedRoute>
              <Companies />
            </ProtectedRoute>
          } />
          
          <Route path="/companies/add" element={
            <ProtectedRoute>
              <AddCompany />
            </ProtectedRoute>
          } />
          
          <Route path="/managers" element={
            <ProtectedRoute>
              <Managers />
            </ProtectedRoute>
          } />
          
          <Route path="/managers/add" element={
            <ProtectedRoute>
              <AddManager />
            </ProtectedRoute>
          } />
          
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
