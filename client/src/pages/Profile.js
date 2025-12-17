import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import Button from '../components/Button';
import Card from '../components/Card';
import { User, Mail, Phone, MapPin, Quote, Calendar, ArrowLeft } from 'lucide-react';

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
  address: Yup.string()
    .max(200, 'Address must be less than 200 characters'),
  city: Yup.string()
    .max(50, 'City must be less than 50 characters'),
  state: Yup.string()
    .max(50, 'State must be less than 50 characters'),
  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
  quote: Yup.string()
    .max(100, 'Quote must be less than 100 characters'),
  dateOfBirth: Yup.date()
    .max(new Date(), 'Date of birth cannot be in the future')
});

const Profile = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialValues = {
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    pincode: user?.pincode || '',
    quote: user?.quote || '',
    dateOfBirth: user?.dateOfBirth || ''
  };

  const handleSubmit = (values, { setSubmitting }) => {
    updateProfile(values);
    toast.success('Profile updated successfully!');
    setSubmitting(false);
    navigate('/dashboard');
  };

  return (
    <div className="profile-page">
      <div className="container">
        <Card className="profile-card">
          <div className="profile-header">
            <button onClick={() => navigate('/dashboard')} className="back-btn">
              <ArrowLeft size={20} />
            </button>
            <div className="profile-title">
              <User size={24} />
              <h2>Edit Profile</h2>
            </div>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="profile-form">
                <div className="form-section">
                  <h3><User size={18} /> Personal Information</h3>
                  
                  <div className="form-row">
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
                      <label>Date of Birth</label>
                      <Field
                        type="date"
                        name="dateOfBirth"
                        className="form-input"
                      />
                      <ErrorMessage name="dateOfBirth" component="div" className="error-message" />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3><Mail size={18} /> Contact Information</h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email Address</label>
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
                  </div>
                </div>

                <div className="form-section">
                  <h3><MapPin size={18} /> Address Information</h3>
                  
                  <div className="form-group">
                    <label>Address</label>
                    <Field
                      as="textarea"
                      name="address"
                      placeholder="Enter your full address"
                      className="form-input textarea"
                      rows="3"
                    />
                    <ErrorMessage name="address" component="div" className="error-message" />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>City</label>
                      <Field
                        type="text"
                        name="city"
                        placeholder="Enter your city"
                        className="form-input"
                      />
                      <ErrorMessage name="city" component="div" className="error-message" />
                    </div>

                    <div className="form-group">
                      <label>State</label>
                      <Field
                        type="text"
                        name="state"
                        placeholder="Enter your state"
                        className="form-input"
                      />
                      <ErrorMessage name="state" component="div" className="error-message" />
                    </div>

                    <div className="form-group">
                      <label>Pincode</label>
                      <Field
                        type="text"
                        name="pincode"
                        placeholder="Enter pincode"
                        className="form-input"
                      />
                      <ErrorMessage name="pincode" component="div" className="error-message" />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3><Quote size={18} /> Personal Quote</h3>
                  
                  <div className="form-group">
                    <label>Your Quote</label>
                    <Field
                      type="text"
                      name="quote"
                      placeholder="Enter a personal quote or motto"
                      className="form-input"
                    />
                    <ErrorMessage name="quote" component="div" className="error-message" />
                  </div>
                </div>

                <div className="form-actions">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate('/dashboard')}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Updating...' : 'Update Profile'}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </div>
  );
};

export default Profile;