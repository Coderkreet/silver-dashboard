import axios from "axios";
import { backendConfig } from "../constants/content/MainContent";

const setApiURL = backendConfig.base;
const token = localStorage.getItem("token");

export async function getAdminPaymentInfo() {
  const response = await axios.get(`${setApiURL}/qrcodes-all`);
  return response?.data?.qrcodes?.[0];
}
export async function getPlanLists() {
  const response = await axios.get(`${setApiURL}/allPackages`);
  return response?.data?.packages;
}

// export async function AddPlans() {
//   const response = await axios.get(`${setApiURL}/allPackages`);
//   return response?.data?.packages;
// }
export async function submitPaymentInfo(payload) {
  const response = await axios.post(
    `${setApiURL}/transaction/qrcode/request`,
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
export async function getWithdrawalHistory() {
  const response = await axios.get(`${setApiURL}/withdrawals-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function getFundTransferHistory() {
  const response = await axios.get(
    `${setApiURL}/fund-transfer-sender-history`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}
export async function getFundReceiveHistory() {
  const response = await axios.get(
    `${setApiURL}/fund-transfer-receiver-history`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}
export async function sendSpinData(payload) {
  const response = await axios.post(`${setApiURL}/spin/create`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}
export async function getSpinCountHistory() {
  const response = await axios.get(`${setApiURL}/spin/check`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

const adminApi = backendConfig.base + "/admin";

export async function approveUserPayment(id) {
  const response = await axios.post(
    `${adminApi}/transaction/details-accept/${id}`,
    { status: "Completed" }
  );
  return response;
}
export async function rejectUserPayment(id) {
  const response = await axios.post(
    `${adminApi}/transaction/details-accept/${id}`,
    { status: "Failed" }
  );
  return response;
}

export async function getPendingUsers(payload) {
  const response = await axios.get(`${adminApi}/payment-requests`, payload);
  return response?.data;
}
export async function getCompleteUsers(payload) {
  const response = await axios.get(`${adminApi}/payment-requests`, payload);
  return response?.data;
}
export async function getRejectUsers(payload) {
  const response = await axios.get(`${adminApi}/payment-requests`, payload);
  return response?.data;
}
export async function transferFund(payload) {
  const response = await axios.post(
    `${setApiURL}/transfer/amount-request/${payload.userId}`,
    {
      amount: payload.amount,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response?.data;
}

export async function planPurchaseRequest(payload) {
  const response = await axios.post(
    `${setApiURL}/transaction/request`,
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

export async function sendOtpForPlanPurchase() {
  const response = await axios.post(`${setApiURL}/transaction/verify-otp`,{}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}



export async function getPendingFunds(payload) {
  const response = await axios.get(`${adminApi}/fund-requests`, payload);
  return response?.data;
}

export async function approveFundRequest(id) {
  const response = await axios.post(
    `${adminApi}/transfer/amount-aproved/${id}`,
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
export async function approveFundMultipleRequest(payload) {
  const response = await axios.post(
    `${adminApi}/transaction/details-many-accept`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response;
}
export async function rejectFundMultipleRequest(payload) {
  const response = await axios.post(
    `${adminApi}/transaction/details-many-accept`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response;
}
export async function rejectFundRequest(id) {
  const response = await axios.post(
    `${adminApi}/transfer/amount-aproved/${id}`,
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

// export async function raiseWithdrawalRequest(payload) {
//   const response = await axios.post(
//     `${setApiURL}/withdraw-admin/request`,
//     payload,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       withCredentials: true,
//     }
//   );
//   return response?.data;
// }

export async function sendWithdrawalOtp() {
  const response = await axios.post(`${setApiURL}/withdrawal/verify-otp`,{}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function getPendingWithdrawalRequest(payload) {
  const response = await axios.get(`${adminApi}/get-pending-withdraws`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

export async function approveWithdrawalRequest(id) {
  const response = await axios.post(
    `${adminApi}/withdraw-admin/verify/${id}`,
    { status: "approved" },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response;
}
export async function rejectWithdrawalRequest(id) {
  const response = await axios.post(
    `${adminApi}/withdraw-admin/verify/${id}`,
    { status: "rejected" },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response;
}

export async function getRejectPlans() {
  const response = await axios.get(`${adminApi}/payment-rejected-requests`);
  return response?.data;
}
export async function getCompletePlans() {
  const response = await axios.get(`${adminApi}/payment-completed-requests`);
  return response?.data;
}
export async function getCompleteFunds() {
  const response = await axios.get(`${adminApi}/fund-completed-requests`);
  return response?.data;
}
export async function getRejectFunds() {
  const response = await axios.get(`${adminApi}/fund-rejected-requests`);
  return response?.data;
}
export async function getRejectWithdrawal() {
  const response = await axios.get(`${adminApi}/withdrawal-rejected-requests`);
  return response?.data;
}
export async function getCompleteWithdrawal() {
  const response = await axios.get(`${adminApi}/withdrawal-completed-requests`);
  return response?.data;
}


export async function getWithdrawals() {
  const response = await axios.get(`${setApiURL}/user/get-withdrawals`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response?.data;
}

