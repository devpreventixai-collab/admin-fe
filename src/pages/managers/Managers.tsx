import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainLayout from '../../components/Layout/MainLayout';

const Managers = () => {
  useEffect(() => {
    document.title = 'Managers | PreventixAI Admin';
  }, []);

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="form-container">
          <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>Managers</h2>
              <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0 0', fontSize: '0.875rem' }}>
                Manage and view all registered managers
              </p>
            </div>
            <Link to="/managers/add">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <span>👥</span>
                Add Manager
              </motion.button>
            </Link>
          </div>
          
          <div style={{ 
            padding: '3rem 2rem', 
            textAlign: 'center', 
            backgroundColor: 'var(--gray-50)', 
            borderRadius: '12px',
            border: '2px dashed var(--border-color)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No Managers Yet</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Get started by adding your first manager to the system.
            </p>
            <Link to="/managers/add">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <span>➕</span>
                Add Your First Manager
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default Managers;