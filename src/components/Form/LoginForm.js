import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/authActions';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import './LoginForm.css';

const LoginForm = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(state => state.api);
  const [loginError, setLoginError] = useState('');
  const { isAuthenticated, error } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t('login.invalid_email'))
        .required(t('login.required_email')),
      password: Yup.string()
        .min(5, t('login.min_password'))
        .required(t('login.required_password')),
    }),
    onSubmit: (values) => {
      if (values.email === 'test@gmail.com' && values.password === '12345') {
        dispatch(login());
        console.log('auth',auth)
      } else {
        setLoginError(t('login.invalid_credentials'));
      }
    },
  });

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="form-container p-4 shadow-sm">
      <div className='d-flex justify-content-end'>
        <button className='btn btn-lg btn-transparent p-1' onClick={() => changeLanguage('tr')}>{getUnicodeFlagIcon('TR')}</button>
        <button className='btn btn-lg btn-transparent p-1' onClick={() => changeLanguage('en')}>{getUnicodeFlagIcon('US')}</button>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mb-2">
          <label className='text-white mb-1'>{t('login.email_label')}</label>
          <input
            type="email"
            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="form-group mb-2">
          <label className='text-white mb-1'>{t('login.password_label')}</label>
          <input
            type="password"
            className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>

        <div className='d-flex justify-content-center pt-3'>
          <Button text={t('login.button')} type="submit" variant="danger" />
        </div>

        {loginError && <div className="error mt-2">{loginError}</div>}

        {auth.error && <div className="error mt-2">{auth.error}</div>}
        {auth.isAuthenticated && <div className="success mt-2">Giriş başarılı!</div>}
      </form>
    </div>
  );
};

export default LoginForm;
