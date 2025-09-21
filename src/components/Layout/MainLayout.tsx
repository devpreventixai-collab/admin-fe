import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { user } = useAuth();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/companies' || path.startsWith('/companies')) return 'Companies';
    if (path === '/managers' || path.startsWith('/managers')) return 'Managers';
    return 'PreventixAI';
  };

  const getUserInitials = () => {
    if (!user) return 'U';
    const firstInitial = user.first_name?.charAt(0) || '';
    const lastInitial = user.last_name?.charAt(0) || '';
    return (firstInitial + lastInitial).toUpperCase() || 'U';
  };

  return (
    <div className="app-container">
      <Sidebar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="main-content"
      >
        <div className="main-header">
          <h1>{getPageTitle()}</h1>
          <div className="user-profile">
            <div className="user-info">
              <p className="user-name">{user?.first_name} {user?.last_name}</p>
              <p className="user-role">{user?.role}</p>
            </div>
            <div className="user-avatar">
              {getUserInitials()}
            </div>
          </div>
        </div>
        <div className="main-body">
          {children}
        </div>
      </motion.main>
    </div>
  );
};

export default MainLayout;