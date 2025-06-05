import axios from "axios";
import { backendConfig } from "../constants/content/MainContent";

const loginApiBaseAUrl = backendConfig.base;
const token = localStorage.getItem("token");

export async function loginWithEmailApi(payload) {
  const response = await axios.post(`${loginApiBaseAUrl}/user/user-login`, payload, {
    withCredentials: true,
  });
  return response?.data;
}
export async function verifyRegisterOtp(payload) {
  const response = await axios.post(`${loginApiBaseAUrl}/user/verify-otp`, payload, {
    withCredentials: true,
  });
  return response?.data;
}

export async function  loginWithEmailAdminApi(payload) {
  const response = await axios.post(
    `${loginApiBaseAUrl}/admin/login`,
    payload,
    {
      withCredentials: true,
    }
  );
  return response?.data;
}
export async function registerWithEmailApi(payload) {
  const response = await axios.post(
    `${loginApiBaseAUrl}/user/user-register`,
    payload,
    {
      withCredentials: true,
    }
  );
  return response?.data;
}
export async function getUserInfo() {
  const response = await axios.get(`${loginApiBaseAUrl}/get-users `, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getAdminInfo() {
  const response = await axios.get(`${loginApiBaseAUrl}/admin/admin`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getIncomeHistory() {
  const response = await axios.get(`${userURL}/get-income-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function loginWithEmailAdmin(payload) {
  const response = await axios.post(
    `${loginApiBaseAUrl}/admin/login`,
    payload,
    {
      withCredentials: true,
    }
  );
  return response?.data;
}

const userURL = backendConfig.base;

export async function createLevel() {
  const response = await axios.get(`${userURL}/levels/create`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
