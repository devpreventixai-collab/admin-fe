import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import MainLayout from '../../components/Layout/MainLayout';
import { addManager, getAllCompany } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

interface Company {
  id: number;
  name: string;
  address: string;
  phone_number: string;
  email: string;
  work_type: string;
  created_at: number;
  updated_at: number;
  domain: string;
}

const ManagerSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone_number: Yup.string().required('Phone number is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  job_title: Yup.string().required('Job title is required'),
  organization_id: Yup.number().required('Organization ID is required'),
});

const AddManager = () => {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await getAllCompany();
        if (response?.success && response?.result?.data) {
          setCompanies(Array.isArray(response.result.data) ? response.result.data : []);
        } else {
          setError('Failed to load companies');
          setCompanies([]);
        }
      } catch (err) {
        console.error('Error fetching companies:', err);
        setError('An error occurred while loading companies');
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleSubmit = async (values: {
    email: string;
    phone_number: string;
    password: string;
    job_title: string;
    organization_id: number;
  }) => {
    try {
      const response = await addManager({
        email: values.email,
        phone_number: values.phone_number,
        password: values.password,
        job_title: values.job_title,
        organization_id: values.organization_id,
      });
      if (response.success) {
        navigate('/managers');
      } else {
        setError('Failed to add manager');
      }
    } catch (err) {
      setError('An error occurred while adding the manager');
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
          <div className="page-header">
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>Add New OP Manager</h2>
            <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0 0', fontSize: '0.875rem' }}>
              Create a new manager account for your organization
            </p>
          </div>
          
          {error && <div className="error-message" style={{ 
            backgroundColor: 'rgba(239, 68, 68, 0.1)', 
            color: 'var(--error-color)', 
            padding: '0.75rem', 
            borderRadius: '8px', 
            marginBottom: '1.5rem',
            fontSize: '0.875rem'
          }}>{error}</div>}
          
          <Formik
            initialValues={{
              email: '',
              phone_number: '',
              password: '',
              job_title: '',
              organization_id: Number(user?.organization_id) ,
            }}
            validationSchema={ManagerSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                  />
                  <ErrorMessage name="email" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="phone_number">Phone Number</label>
                  <Field
                    type="text"
                    name="phone_number"
                    placeholder="Enter phone number"
                  />
                  <ErrorMessage name="phone_number" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="job_title">Job Title</label>
                  <Field
                    type="text"
                    name="job_title"
                    placeholder="Enter job title (e.g., Senior Manager, Team Lead)"
                  />
                  <ErrorMessage name="job_title" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="organization_id">Organization</label>
                  {loading ? (
                    <div className="loading-spinner">Loading organizations...</div>
                  ) : (
                    <Field as="select" name="organization_id" className="form-control">
                      <option value="">Select Organization</option>
                      {Array.isArray(companies) && companies.length > 0 ? (
                        companies.map((company) => (
                          <option key={company.id} value={company.id}>
                            {company.name} ({company.address})
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>No organizations available</option>
                      )}
                    </Field>
                  )}
                  <ErrorMessage name="organization_id" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div style={{ position: 'relative' }}>
                    <Field
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Enter a secure password"
                      innerRef={passwordRef}
                      style={{ paddingRight: '2.5rem' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '0.75rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--text-secondary)',
                        padding: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="currentColor"/>
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 12C2 12 5.63636 5 12 5C18.3636 5 22 12 22 12C22 12 18.3636 19 12 19C5.63636 19 2 12 2 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="currentColor"/>
                          <path d="M4 20L20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                  </div>
                  <ErrorMessage name="password" component="div" className="error-message" />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    style={{ flex: 1 }}
                  >
                    {isSubmitting ? 'Creating Manager...' : 'Create Manager'}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => navigate('/managers')}
                    className="secondary"
                    style={{ flex: 1 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default AddManager;