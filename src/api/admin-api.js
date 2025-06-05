import axios from "axios";
import { backendConfig } from "../constants/content/MainContent";

const apiURL = backendConfig.base + "/admin";
const token = localStorage.getItem("token");

export async function getPendingComplainHistory() {
  const response = await axios.get(`${apiURL}/support-in-process`, {
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
    { status: "accept" },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response;
}

export async function Addplans(data) {
  const response = await axios.post(
    `${apiURL}/create-plan` , data
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