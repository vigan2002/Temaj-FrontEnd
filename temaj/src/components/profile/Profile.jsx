import React, { useState } from "react";
import "./style.scss";
import { Formik, Form, Field } from "formik";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateProfile } from "../../api/userApi";
import { useAuth } from "../../context/AuthContext";
import Navigator from "./Navigator";
import { useNavigate } from "react-router-dom";
import NotificationModal from "../notification/NotificationModal";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user } = useAuth();
  const queryClient = useQueryClient();
  const profileQueryKey = ["profile", user?.user_id];
  const navigate = useNavigate();
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    isVisible: false,
  });

  const showNotification = (message, type) => {
    setNotification({ message, type, isVisible: true });
  };

  const {
    data: profileInfo,
    error,
    isLoading,
  } = useQuery({
    queryKey: profileQueryKey,
    queryFn: getProfile,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    enabled: !!isAuthenticated && user !== undefined,
    onError: () => showNotification("Something went wrong fetching the profile."),
  });

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
        
      showNotification("Profile updated successfully", "success");
      queryClient.setQueryData(profileQueryKey, data);
    },
    onError: () => showNotification("Something went wrong updating the profile.", "error"),
  });

  const handleProfileUpdate = async (values, { setSubmitting }) => {
    try {
      await mutation.mutateAsync(values);
    } catch (error) {
        showNotification("Something went wrong submitting the form.", "error");
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
              <h1>{`${t("profile")}`}</h1>
            </div>
            <div className="info-container">
              <Formik
                initialValues={{
                  user: {
                    first_name: profileInfo?.user?.first_name || "",
                    last_name: profileInfo?.user?.last_name || "",
                    email: profileInfo?.user?.email || "",
                  },
                  job: profileInfo?.job || "",
                  city: profileInfo?.city || "",
                }}
                enableReinitialize
                onSubmit={handleProfileUpdate}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="row">
                      <Field
                        type="text"
                        name="user.first_name"
                        placeholder="Emri"
                      />
                      <Field
                        type="text"
                        name="user.last_name"
                        placeholder="Mbiemri"
                      />
                    </div>
                    <Field type="text" name="job" placeholder="Profesioni" disabled />
                    <Field type="email" name="user.email" placeholder="Email" disabled />
                    <Field type="text" name="city" placeholder="Qyteti" />
                    <div className="profile-btns">
                      <button
                        onClick={() => navigate("/profile/change-password")}
                      >
                        Ndrro Passwordin
                      </button>
                      <button type="submit" disabled={isSubmitting}>
                        Ruani të dhënat
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

export default Profile;
