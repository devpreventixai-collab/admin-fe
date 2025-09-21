import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import MainLayout from '../../components/Layout/MainLayout';
import { addCompany } from '../../services/api';

const CompanySchema = Yup.object().shape({
  name: Yup.string().required('Company name is required'),
  address: Yup.string().required('Address is required'),
  phone_number: Yup.string().required('Phone number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  work_type: Yup.string().required('Work type is required'),
  domain: Yup.string().required('Domain is required'),
});

const AddCompany = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (values: {
    name: string;
    address: string;
    phone_number: string;
    email: string;
    work_type: string;
    domain: string;
  }) => {
    try {
      const response = await addCompany(values);
      if (response.success) {
        navigate('/companies');
      } else {
        setError('Failed to add company');
      }
    } catch (err) {
      setError('An error occurred while adding the company');
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
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>Add New Company</h2>
            <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0 0', fontSize: '0.875rem' }}>
              Register a new company in your organization
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
              name: '',
              address: '',
              phone_number: '',
              email: '',
              work_type: '',
              domain: '',
            }}
            validationSchema={CompanySchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="name">Company Name</label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Enter company name"
                  />
                  <ErrorMessage name="name" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Company Address</label>
                  <Field
                    as="textarea"
                    name="address"
                    placeholder="Enter complete company address"
                    rows={3}
                  />
                  <ErrorMessage name="address" component="div" className="error-message" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
                    <label htmlFor="email">Email Address</label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter email address"
                    />
                    <ErrorMessage name="email" component="div" className="error-message" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label htmlFor="work_type">Work Type</label>
                    <Field
                      type="text"
                      name="work_type"
                      placeholder="e.g., Technology, Manufacturing, Healthcare"
                    />
                    <ErrorMessage name="work_type" component="div" className="error-message" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="domain">Domain</label>
                    <Field
                      type="text"
                      name="domain"
                      placeholder="e.g., company.com"
                    />
                    <ErrorMessage name="domain" component="div" className="error-message" />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    style={{ flex: 1 }}
                  >
                    {isSubmitting ? 'Creating Company...' : 'Create Company'}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => navigate('/companies')}
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

export default AddCompany;