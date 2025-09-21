import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../components/Layout/MainLayout';

const Dashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    document.title = 'Dashboard | PreventixAI Admin';
  }, []);

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Welcome Section */}
        <div className="welcome-section">
          <h2 className="welcome-title">Welcome, {user?.first_name} {user?.last_name}</h2>
          <p className="welcome-subtitle">
            Organization: {user?.organization_name} • Role: {user?.role}
          </p>
          
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link to="/companies/add" className="action-button">
                  <span>🏢</span>
                  Add Company
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link to="/managers/add" className="action-button secondary">
                  <span>👥</span>
                  Add Manager
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <motion.div 
            className="stat-card"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="stat-card-header">
              <div className="stat-icon companies">
                🏢
              </div>
              <h3 className="stat-title">Total Companies</h3>
            </div>
            <p className="stat-value">12</p>
          </motion.div>

          <motion.div 
            className="stat-card"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="stat-card-header">
              <div className="stat-icon managers">
                👥
              </div>
              <h3 className="stat-title">Total Managers</h3>
            </div>
            <p className="stat-value">45</p>
          </motion.div>

          <motion.div 
            className="stat-card"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="stat-card-header">
              <div className="stat-icon projects">
                ✅
              </div>
              <h3 className="stat-title">Active Projects</h3>
            </div>
            <p className="stat-value">8</p>
          </motion.div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default Dashboard;