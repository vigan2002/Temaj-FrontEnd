import {apiClient} from '../utils2/apiClient';

export const loginUser = async (logindata) => {
    const response = await apiClient.post('/login/', logindata);
    return response.data;
};

export const registerUser = async (singup) => {
    const response = await apiClient.post('/signup/', singup);
    return response.data;
};

export const forgetPassUser = async (forget) => {
    const response = await apiClient.post('/forgot-password/', forget);
    return response.data;
};

export const resetPassUser = async (reset) => {
    const response = await apiClient.post('/reset-password/', reset);
    return response.data;
};

export const getProfile = async () => {
    const response = await apiClient.get('/profile/');
    return response.data;
}

export const updateProfile = async (profileData) => {
    const response = await apiClient.put('/profile/', profileData);
    return response.data;
};

export const updatePassword = async (passwordData) => {
    const { currentPassword, newPassword } = passwordData;
    const response = await apiClient.put('/profile/change-password/', {
        old_password: currentPassword,
        new_password: newPassword,
    });
    return response.data;
};