import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import Button from '../components/Button';
import Card from '../components/Card';

const Signin = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length === 10) {
      setOtpSent(true);
      toast.success('OTP sent to your phone!');
    } else {
      toast.error('Please enter a valid phone number');
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      login({ name: `User_${phone.slice(-4)}`, phone: phone, email: `${phone}@mobile.com` });
      toast.success('Login successful!');
      navigate('/dashboard');
    } else {
      toast.error('Please enter complete OTP');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <Card className="auth-card">
          <div className="auth-header">
            <h2>Sign In with OTP</h2>
            <p>Enter your phone number to receive OTP</p>
          </div>

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="auth-form">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter 10-digit phone number"
                  maxLength="10"
                  required
                />
              </div>
              <Button type="submit" size="large" className="auth-btn">
                Send OTP
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="auth-form">
              <div className="form-group">
                <label>Enter OTP</label>
                <div className="otp-inputs">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="otp-input"
                      maxLength="1"
                    />
                  ))}
                </div>
              </div>
              <Button type="submit" size="large" className="auth-btn">
                Verify OTP
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOtpSent(false)}
              >
                Change Number
              </Button>
            </form>
          )}

          <div className="auth-footer">
            <p>Prefer email? <Link to="/login">Sign in with password</Link></p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signin;