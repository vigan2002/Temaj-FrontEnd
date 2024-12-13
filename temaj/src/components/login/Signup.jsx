import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/userApi";
import { useAuth } from "../../context/AuthContext";
import JobDropdown from "./JobDropdown";
import "./style.scss";
import NotificationModal from "../notification/NotificationModal";
import { useMediaQuery } from "@mui/material";

const SignupPage = () => {
  const isSmallDev = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const { logintoken } = useAuth();
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    isVisible: false,
  });

  const showNotification = (message, type) => {
    setNotification({ message, type, isVisible: true });
  };

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    userinfo: {
      job: "",
      city: "",
    },
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    userinfo: Yup.object({
      job: Yup.string().required("Role is required"),
      city: Yup.string().required("City is required"),
    }),
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      logintoken(data);
      showNotification("Signup successful", "success");
      navigate("/login");
    },
    onError: (error) => {
      showNotification("Error during signup", "error");
    },
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await mutation.mutateAsync(values);
    } catch (error) {
      setErrors({ form: "Error during signup" });
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
              src={
                isSmallDev
                  ? "/assets/images/brand/finalLogo/logomobile.png"
                  : "/assets/images/brand/finalLogo/logopc.png"
              }
              alt="logo"
              className="logo"
              style={{
                height: isSmallDev ? "50px" : "",
              }}
            />
          </NavLink>
          <div
            className="title"
            style={{
              marginTop: "20px",
            }}
          >
            <h1>Create new account</h1>
            <div className="select">
              <button onClick={() => navigate("/login")}>Login</button>
              <button
                style={{
                  backgroundColor: "#000",
                  color: "var(--bck-color)",
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
                  className="register-content"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div className="name">
                    <Field
                      name="first_name"
                      placeholder="First Name"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="first_name"
                      component="div"
                      className="text-danger"
                      style={{ fontFamily: "poppins, sans-serif" }}
                    />
                    <Field
                      name="last_name"
                      placeholder="Last Name"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="last_name"
                      component="div"
                      className="text-danger"
                      style={{ fontFamily: "poppins, sans-serif" }}
                    />
                  </div>
                  <JobDropdown name="userinfo.job" label="Role" />
                  <Field
                    name="userinfo.city"
                    placeholder="City"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="userinfo.city"
                    component="div"
                    className="text-danger"
                    style={{ fontFamily: "poppins, sans-serif" }}
                  />

                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                    style={{ fontFamily: "poppins, sans-serif" }}
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
                    style={{ fontFamily: "poppins, sans-serif" }}
                  />

                  {errors.form && (
                    <div className="text-danger">{errors.form}</div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                    style={{
                      backgroundColor: "#000",
                      color: "var(--bck-color)",
                    }}
                  >
                    {isSubmitting ? "Creating Account..." : "Create Account"}
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

export default SignupPage;
