import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainLayout from '../../components/Layout/MainLayout';
import { getAllCompany } from '../../services/api';
import styles from './Companies.module.css';

interface Company {
  id: number;
  name: string;
  address: string;
  phone_number: string;
  email: string;
  work_type: string;
  domain: string;
  created_at: number;
  updated_at: number;
}

const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Companies | PreventixAI Admin';
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await getAllCompany();
      if (response?.success && response?.result?.data) {
        setCompanies(Array.isArray(response.result.data) ? response.result.data : []);
      } else {
        setError('Failed to load companies');
      }
    } catch (err) {
      console.error('Error fetching companies:', err);
      setError('An error occurred while loading companies');
    } finally {
      setLoading(false);
    }
  };

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
              <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>Companies</h2>
              <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0 0', fontSize: '0.875rem' }}>
                Manage and view all registered companies
              </p>
            </div>
            <Link to="/companies/add">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <span>🏢</span>
                Add Company
              </motion.button>
            </Link>
          </div>
          
          {loading ? (
            <div className={styles.loadingSpinner}>
              <div>Loading companies...</div>
            </div>
          ) : error ? (
            <div className={styles.errorMessage}>
              {error}
              <button 
                onClick={fetchCompanies}
                className={styles.retryButton}
              >
                Retry
              </button>
            </div>
          ) : companies.length > 0 ? (
            <div className={styles.tableContainer}>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Work Type</th>
                    <th>Domain</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map((company) => (
                    <tr key={company.id} className={styles.companyRow}>
                      <td style={{ fontWeight: 500 }}>{company.name}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{company.email}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{company.phone_number}</td>
                      <td>
                        <span className={styles.workTypeBadge}>
                          {company.work_type}
                        </span>
                      </td>
                      <td>
                        <a 
                          href={`https://${company.domain}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={styles.companyLink}
                        >
                          {company.domain}
                        </a>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <Link to={`/companies/edit/${company.id}`}>
                          <button className={styles.editButton}>
                            Edit
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ 
              padding: '3rem 2rem', 
              textAlign: 'center', 
              backgroundColor: 'var(--gray-50)', 
              borderRadius: '12px',
              border: '2px dashed var(--border-color)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏢</div>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No Companies Yet</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Get started by adding your first company to the system.
              </p>
              <Link to="/companies/add">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <span>➕</span>
                  Add Your First Company
                </motion.button>
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </MainLayout>
  );
}; // This closing brace was missing!

export default Companies;