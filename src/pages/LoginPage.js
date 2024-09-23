import React from 'react';
import LoginForm from '../components/Form/LoginForm';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogin = (credentials) => {
    console.log('Login with:', credentials);
    if (credentials.email === 'test@gmail.com' && credentials.password === '12345') {
      navigate('/home');
    } else {
      alert(t('login.invalid_credentials'));
    }
  };

  return (
    <div className="login-page">
      <video autoPlay muted loop id="hero-video">
        <source src="/video/hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="form-overlay d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row">
            <div className="col-8 mx-auto">
              <h1 className="text-center text-white">{t('login.title')}</h1>
              <LoginForm onLogin={handleLogin} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
