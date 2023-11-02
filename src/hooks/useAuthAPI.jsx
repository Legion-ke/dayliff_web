import Axios from "axios";
import React from "react";

const axios = Axios.create({
  baseURL: `${window._env_.API_URL}`,
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("token: ", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const domain = window.location.hostname;

export const useAuthAPI = () => {
  const [state, setState] = React.useState({
    loading: false,
    error: null,
    data: null,
  });

  const login = async (payload) => {
    setState((prev) => ({ ...prev, loading: true }));
    return axios
      .post("/login", { ...payload, domain })
      .then((res) => {
        window.localStorage.setItem("token", res.data.token);
        setState((prev) => ({ ...prev, data: res.data }));
      })
      .catch((err) => setState((prev) => ({ ...prev, error: err })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  };

  const register = async (payload) => {
    setState((prev) => ({ ...prev, loading: true }));
    return axios
      .post("/register", { ...payload, domain })
      .then((res) => setState((prev) => ({ ...prev, data: res.data })))
      .catch((err) => setState((prev) => ({ ...prev, error: err })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  };

  const forgotPassword = async (email) => {
    setState((prev) => ({ ...prev, loading: true }));
    return axios
      .post("/forgot-password", { email, domain })
      .then((res) => setState((prev) => ({ ...prev, data: res.data })))
      .catch((err) => setState((prev) => ({ ...prev, error: err })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  };

  const resetPassword = async (password, password_confirmation, token) => {
    setState((prev) => ({ ...prev, loading: true }));
    return axios
      .post("/reset-password", { password, password_confirmation, token })
      .then((res) => setState((prev) => ({ ...prev, data: res.data })))
      .catch((err) => setState((prev) => ({ ...prev, error: err })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  };

  const verifyEmail = async (token) => {
    setState((prev) => ({ ...prev, loading: true }));
    return axios
      .post("/verify-email", { token })
      .then((res) => setState((prev) => ({ ...prev, data: res.data })))
      .catch((err) => setState((prev) => ({ ...prev, error: err })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  };

  const resendEmail = async (email) => {
    setState((prev) => ({ ...prev, loading: true }));
    return axios
      .post("/resend-email", { email, domain })
      .then((res) => setState((prev) => ({ ...prev, data: res.data })))
      .catch((err) => setState((prev) => ({ ...prev, error: err })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  };

  const requestOtp = async (email) => {
    setState((prev) => ({ ...prev, loading: true }));
    return axios
      .post("/resend-otp", { email, domain })
      .then((res) => setState((prev) => ({ ...prev, data: res.data })))
      .catch((err) => setState((prev) => ({ ...prev, error: err })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  };

  const verifyOtp = async (otp, token) => {
    setState((prev) => ({ ...prev, loading: true }));
    return axios
      .post("/verify-otp", { otp, token })
      .then((res) => setState((prev) => ({ ...prev, data: res.data })))
      .catch((err) => setState((prev) => ({ ...prev, error: err })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  };

  return {
    ...state,

    login,
    register,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendEmail,
    requestOtp,
    verifyOtp,
  };
};
