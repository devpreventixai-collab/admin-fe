import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import MainLayout from '../../components/Layout/MainLayout';
import { addManager } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ManagerSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  phone_number: Yup.string().required('Phone number is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  gender: Yup.string().required('Gender is required'),
  job_title: Yup.string().required('Job title is required'),
});

const AddManager = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (values: {
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    password: string;
    gender: string;
    job_title: string;
  }) => {
    try {
      const managerData = {
        ...values,
        organization_id: user?.organization_id || 1,
      };
      
      const response = await addManager({
        ...managerData,
        dob: new Date().toISOString().split('T')[0],
        address: '',
        pincode: '',
        managed_by: user?.id || 1
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
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>Add New Manager</h2>
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
              first_name: '',
              last_name: '',
              phone_number: '',
              password: '',
              gender: 'male',
              job_title: '',
            }}
            validationSchema={ManagerSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <Field
                      type="text"
                      name="first_name"
                      placeholder="Enter first name"
                    />
                    <ErrorMessage name="first_name" component="div" className="error-message" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <Field
                      type="text"
                      name="last_name"
                      placeholder="Enter last name"
                    />
                    <ErrorMessage name="last_name" component="div" className="error-message" />
                  </div>
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
                    <label htmlFor="gender">Gender</label>
                    <Field as="select" name="gender">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Field>
                    <ErrorMessage name="gender" component="div" className="error-message" />
                  </div>
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
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter a secure password"
                  />
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