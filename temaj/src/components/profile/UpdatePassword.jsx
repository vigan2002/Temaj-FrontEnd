import React, { useState } from "react";
import "./style.scss";
import { Formik, Form, Field } from "formik";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../../api/userApi";
import { useAuth } from "../../context/AuthContext";
import Navigator from "./Navigator";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import NotificationModal from "../notification/NotificationModal";

const UpdatePassword = () => {
  const { isAuthenticated } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    isVisible: false
  });

  const showNotification = (message, type) => {
    setNotification({ message, type, isVisible: true });
  };


  const mutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      logout,
      showNotification("Password updated successfully", "success");
      navigate('/login');
    },
    onError: () => showNotification("Something went wrong updating the password.", "error"),
  });

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current Password is required"),
    newPassword: Yup.string().required("New Password is required").min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handlePasswordUpdate = async (values, { setSubmitting }) => {
    const { currentPassword, newPassword } = values;
    try {
      await mutation.mutateAsync({ currentPassword, newPassword });
    } catch (error) {
      showNotification("updating password error", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="profile-wrapper">
      {notification.isVisible && (
        <NotificationModal
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={() => setNotification({ ...notification, isVisible: false })}
        />
      )}
      <div className="profile-container">
        <Navigator activeTab="info" />
        <div className="content">
          <div className="info-inner">
            <div className="title">
              <h1>Ndrysho Passwordin</h1>
            </div>
            <div className="info-container">
              <Formik
                initialValues={{
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handlePasswordUpdate}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Field
                      type="password"
                      name="currentPassword"
                      placeholder="Current Password"
                    />
                    <Field
                      type="password"
                      name="newPassword"
                      placeholder="New Password"
                    />
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                    />
                    <div className="profile-btns">
                    <button type="button" onClick={() => navigate("/profile")}>
                      Go back
                    </button>
                    <button type="submit" disabled={isSubmitting}>
                      Ruani Passwordin
                    </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
