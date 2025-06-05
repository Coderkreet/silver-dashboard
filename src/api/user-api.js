import axios from "axios";
import { backendConfig } from "../constants/content/MainContent";

const apiURL = backendConfig.base;

export async function raiseSupportRequest(payload) {
  const token = localStorage.getItem("token"); // <-- Move here

  const response = await axios.post(`${apiURL}/support/create`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function getUserDetails() {
  const token = localStorage.getItem("token"); // <-- Move here
  const response = await axios.get(`${apiURL}/user/userProfile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function getRefHistory(payload) {
  const token = localStorage.getItem("token"); // <-- Move here

  const response = await axios.post(`${apiURL}/user/get-referrals`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}



export async function getComplainHistory() {
  const token = localStorage.getItem("token"); // <-- Move here

  const response = await axios.get(`${apiURL}/support/messages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function getUserTreeData() {
  const token = localStorage.getItem("token"); // <-- Move here

  const response = await axios.get(`${apiURL}/downline/tree`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function sendOtpValidateEmail(payload) {
  const response = await axios.post(`${apiURL}/forgot-password`, payload);
  return response?.data;
}

export async function resetPasswordApi(payload) {
  const response = await axios.post(`${apiURL}/reset-password`, payload);
  return response?.data;
}


export async function requestLoan(payload) {
  const token = localStorage.getItem("token");

  const response = await axios.post(`${apiURL}/user/request-loan`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}


