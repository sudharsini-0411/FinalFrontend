import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import Button from '../components/Button';
import Card from '../components/Card';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  password: Yup.string()
    .min(4, 'Password must be at least 4 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required')
});

const Signup = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();


  const initialValues = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { confirmPassword, ...userData } = values;
      await register(userData);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <div className="auth-page">
      <div className="auth-container">
        <Card className="auth-card">
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Join us for easy recharges</p>
          </div>

          
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="auth-form">
                  <div className="form-group">
                    <label>Full Name</label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      className="form-input"
                    />
                    <ErrorMessage name="name" component="div" className="error-message" />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="form-input"
                    />
                    <ErrorMessage name="email" component="div" className="error-message" />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <Field
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                      className="form-input"
                    />
                    <ErrorMessage name="phone" component="div" className="error-message" />
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Create a password"
                      className="form-input"
                    />
                    <ErrorMessage name="password" component="div" className="error-message" />
                  </div>

                  <div className="form-group">
                    <label>Confirm Password</label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      className="form-input"
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                  </div>

                  <Button type="submit" size="large" className="auth-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </Form>
              )}
            </Formik>
          

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
            <p>Quick signin? <Link to="/signin">Use OTP</Link></p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signup;