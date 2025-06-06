import axios from "axios";
import { backendConfig } from "../constants/content/MainContent";

const apiURL = backendConfig.base + "/admin";
const us = backendConfig.base 
const token = localStorage.getItem("token");

export async function getPendingComplainHistory() {
  const response = await axios.get(`${us}/users/get-queries`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function approveComplainRequest(id) {
  const response = await axios.post(
    `${apiURL}/support/status/${id}`,
    { status: "accept"},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response;
}

export async function GetPlans() {
  const response = await axios.get(
    `${apiURL}/get-plans` ,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response;
}
export async function getPlanHistory() {
  const response = await axios.get(
    `${apiURL}/get-plan-history`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response;
}

export async function AddPlans(data) {
  const response = await axios.post(
    `${apiURL}/create-plan`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response;
}
export async function rejectComplainRequest(id) {
  const response = await axios.post(
    `${apiURL}/support/status/${id}`,
    { status: "reject" },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response;
}

export async function getIncomeHistoryAdmin() {
  const response = await axios.get(
    `${apiURL}/get-income-history`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}


export async function getAllUserList() {
  const response = await axios.get(`${apiURL}/get-users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }, 
    withCredentials: true,
  });
  return response?.data;
}

export async function userStatusToggle(id) {
  const response = await axios.get(
    `${apiURL}/user-block/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response;
}
export async function deleteUserAdminEnd(id) {
  const response = await axios.get(
    `${apiURL}/delete-user/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response;
}


export async function getWithdrawalsAdmin() {
  const response = await axios.get(
    `${apiURL}/get-withdrawals`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}


export async function getLoanStatus() {
  const response = await axios.get(
    `${apiURL}/get-loan-status`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function updateLoanStatus(id, formData) {
  const response = await axios.patch(
    `${apiURL}/update-loan-status/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}



export async function getDashboardStats() {
  const response = await axios.get(
    `${apiURL}/dashboard-stats`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}


export async function getInvestments() {
  const response = await axios.get(
    `${apiURL}/get-investments`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}
