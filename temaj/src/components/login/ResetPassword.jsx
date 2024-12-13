import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { resetPassUser } from '../../api/userApi';
import images from '/assets/images/banner/b3.webp';
import './style.scss';
import NotificationModal from "../notification/NotificationModal";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    isVisible: false
  });

  const showNotification = (message, type) => {
    setNotification({ message, type, isVisible: true });
  };
  const initialValues = {
    email: '',
    code: '',
    new_password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    code: Yup.string().required('Reset code is required'),
    new_password: Yup.string().min(6, 'Password must be at least 6 characters').required('New password is required'),
  });

  const mutation = useMutation({
    mutationFn: resetPassUser,
    onSuccess: () => {
      showNotification("Password reset successful!", "success");
      navigate('/login');
    },
    onError: (error) => {
      showNotification("Failed to reset password. Please try again.", "error");
    },
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await mutation.mutateAsync(values);
    } catch (error) {
      setErrors({ form: 'Failed to reset password' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-wrapper">
      {notification.isVisible && (
        <NotificationModal
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={() => setNotification({ ...notification, isVisible: false })}
        />
      )}
      <div className="login-container">
        <div className="inner-container">
          <NavLink to="/">
            <img
              src="/assets/images/brand/logo.png"
              alt="logo"
              className="logo"
            />
          </NavLink>
          <div className="title">
            <h1>Reset Password</h1>
            <div className="select">
              <button
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
              >
                Sign up
              </button>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors }) => (
                <Form
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <Field
                    name="email"
                    placeholder="Email"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                    style={{ fontFamily: 'poppins, sans-serif' }}
                  />

                  <Field
                    name="code"
                    placeholder="Code"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="code"
                    component="div"
                    className="text-danger"
                    style={{ fontFamily: 'poppins, sans-serif' }}
                  />

                  <Field
                    name="new_password"
                    type="password"
                    placeholder="New Password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="new_password"
                    component="div"
                    className="text-danger"
                    style={{ fontFamily: 'poppins, sans-serif' }}
                  />

                  {errors.form && (
                    <div className="text-danger" style={{ fontFamily: 'poppins, sans-serif' }}>
                      {errors.form}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting || mutation.isLoading}
                    style={{
                      width: '65%',
                      height: '60px',
                      backgroundColor: '#000',
                      color: 'var(--bck-color)',
                    }}
                  >
                    {isSubmitting || mutation.isLoading ? 'Resetting...' : 'Reset Password'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="login-banner">
          <img src={images} alt="The banner" />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
