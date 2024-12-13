import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/userApi";
import { useAuth } from "../../context/AuthContext";
import "./style.scss";
import NotificationModal from "../notification/NotificationModal";
import { useMediaQuery } from "@mui/material";

const LoginPage = () => {
  const isSmallDev = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const { logintoken } = useAuth();
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    isVisible: false
  });

  const showNotification = (message, type) => {
    setNotification({ message, type, isVisible: true });
  };


  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      logintoken(data);
      showNotification("Login Succesfuly", "success");
      navigate("/temaj-qeramik");
    },
    onError: (error) => {
      showNotification("Invalid email or password", "error");
    },
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await mutation.mutateAsync(values);
    } catch (error) {
      setErrors({ form: "Invalid email or password" });
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
            src= {isSmallDev ? "/assets/images/brand/finalLogo/logomobile.png" : '/assets/images/brand/finalLogo/logopc.png'}
            alt="logo"
            className="logo"
            style={{
              height: isSmallDev ? '50px' : '',
            }}
          />
        </NavLink>
          <div className="title">
            <h1>Welcome</h1>
            <div className="select">
              <button
                style={{
                  backgroundColor: "#000",
                  color: "var(--bck-color)",
                }}
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                }}
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
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
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
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                    style={{ fontFamily: 'poppins, sans-serif' }}
                  />

                  {errors.form && (
                    <div className="text-danger"
                    style={{ fontFamily: 'poppins, sans-serif' }}>{errors.form}</div>
                  )}

                  <Link to="/forgot-password">
                    <p
                      style={{ color: "var(--dark-color)", width: isSmallDev ? '100%' : '60%', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}
                    >
                      Forgot Password
                    </p>
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                    style={{
                      width: isSmallDev ? '100%' : "65%",
                      height: "60px",
                      backgroundColor: "#000",
                      color: "var(--bck-color)",
                    }}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="login-banner">
        <img src="/assets/content/login/banner1.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
