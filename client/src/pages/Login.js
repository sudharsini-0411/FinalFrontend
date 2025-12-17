import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import Button from '../components/Button';
import Card from '../components/Card';

const Login = () => {
  const [searchParams] = useSearchParams();
  const isAdminLogin = searchParams.get('admin') === 'true';
  
  const [formData, setFormData] = useState({ 
    email: isAdminLogin ? 'sudharsini.r2024aids@sece.ac.in' : '', 
    password: isAdminLogin ? '1234' : '' 
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      try {
        await login({ email: formData.email, password: formData.password });
        toast.success('Login successful!');
        
        // Redirect based on role
        if (formData.email === 'sudharsini.r2024aids@sece.ac.in') {
          navigate('/admin');
        } else {
          navigate('/plans');
        }
      } catch (error) {
        toast.error(error.message || 'Login failed');
      }
    } else {
      toast.error('Please fill all fields');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <Card className="auth-card">
          <div className="auth-header">
            <h2>{isAdminLogin ? 'Admin Login' : 'Welcome Back'}</h2>
            <p>{isAdminLogin ? 'Sign in as administrator' : 'Sign in to your account'}</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <Button type="submit" size="large" className="auth-btn">
              Sign In
            </Button>
          </form>

          <div className="auth-footer">
            {!isAdminLogin && (
              <>
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                <p>Or <Link to="/signin">Sign in with OTP</Link></p>
              </>
            )}
            <p><Link to={isAdminLogin ? '/login' : '/login?admin=true'}>
              {isAdminLogin ? 'User Login' : 'Admin Login'}
            </Link></p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;