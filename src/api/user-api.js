import axios from "axios";
import { backendConfig } from "../constants/content/MainContent";

const apiURL = backendConfig.base;

export async function raiseSupportRequest(payload) {
  const token = localStorage.getItem("token"); // <-- Move here

  const response = await axios.post(`${apiURL}/user/contact-us`, payload, {
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


export async function getPendingComplainHistoryUser() {
  const token = localStorage.getItem("token"); // <--
  const response = await axios.get(`${apiURL}/user/get-queries`, {
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

export async function raiseWithdrawalRequest(payload) {
  const token = localStorage.getItem("token");
  console.log(token)
  const response = await axios.post(
    `${apiURL}/user/withdraw-request`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function getReferrals() {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${apiURL}/user/get-referrals`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}



export async function getLoanHistory() {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${apiURL}/user/get-loan-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}


export async function GetPlansUser() {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${apiURL}/user/get-plans` ,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response;
}
