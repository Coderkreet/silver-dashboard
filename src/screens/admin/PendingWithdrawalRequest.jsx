/* eslint-disable no-unused-vars */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";
import {
  approveWithdrawalRequest,
  getPendingWithdrawalRequest,
  rejectWithdrawalRequest,
} from "../../api/payment-api";
import { FaEye } from "react-icons/fa";
import ViewPaymentDetailModal from "../../components/ui/ViewPaymentDetailModal";

const PendingWithdrawalRequest = () => {
  const [loading, setLoading] = useState(false);
  const [UserList, setUserList] = useState([]);

  const rejectUserHandler = async (id) => {
    try {
      setLoading(true);
      await rejectWithdrawalRequest(id);
      SwalSuccess.fire({
        icon: "success",
        title: "Rejected",
        text: "Withdrawal Rejected Successfully",
      });
      fetchPendingWithdrawals();
    } catch (error) {
      console.error(error);
      SwalError.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const approveUserHandler = async (id) => {
    try {
      setLoading(true);
      await approveWithdrawalRequest(id);
      SwalSuccess.fire({
        icon: "success",
        title: "Approved",
        text: "Withdrawal Approved Successfully",
      });
      fetchPendingWithdrawals();
    } catch (error) {
      console.error(error);
      SwalError.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingWithdrawals = async () => {
    try {
      setLoading(true);
      const response = await getPendingWithdrawalRequest();
      setUserList(response?.withdrawals || []);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingWithdrawals();
  }, []);

  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };

  const handleApprove = (rowData) => {
    approveUserHandler(rowData._id);
  };

  const handleReject = (rowData) => {
    rejectUserHandler(rowData._id);
  };

  const actionTemplate = (rowData) => {
    return (
      <div className="action-buttons">
        <Button
          label="Approve"
          icon="pi pi-check"
          className="p-button-success p-mr-2"
          onClick={() => handleApprove(rowData)}
          style={{ color: "green", marginRight: "10px" }}
        />
        <Button
          label="Reject"
          icon="pi pi-times"
          className="p-button-danger"
          onClick={() => handleReject(rowData)}
          style={{ color: "red" }}
        />
      </div>
    );
  };

  const dateTimeTemplate = (rowData) => {
    return new Date(rowData.requestedAt).toLocaleString();
  };

  const userTemplate = (rowData) => {
    return (
      <div>
        <div>Name: {rowData.userId?.name}</div>
        <div>Email: {rowData.userId?.email}</div>
      </div>
    );
  };

  const bankDetailsTemplate = (rowData) => {
    return (
      <div>
        <div>Bank: {rowData.bankDetails?.bankName}</div>
        <div>Account: {rowData.bankDetails?.accountNumber}</div>
        <div>IFSC: {rowData.bankDetails?.ifscCode}</div>
        <div>UPI: {rowData.bankDetails?.upiId}</div>
      </div>
    );
  };

  const amountTemplate = (rowData) => {
    return (
      <div>
        <div>Amount: ₹{rowData.amount}</div>
        <div>Wallet: {rowData.walletUsed}</div>
      </div>
    );
  };

  const statusTemplate = (rowData) => {
    return (
      <span className={`badge ${rowData.status === 'pending' ? 'bg-warning' : rowData.status === 'approved' ? 'bg-success' : 'bg-danger'}`}>
        {rowData.status.toUpperCase()}
      </span>
    );
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="WithdrawalReport martop">
        <div className="dataTable ss-card martop">
          <DataTable
            value={UserList}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            emptyMessage="No pending withdrawal requests found."
            className="p-datatable-sm"
            showGridlines
            stripedRows
          >
            <Column body={serialNumberTemplate} header="S.No" style={{ width: '5%' }} />
            <Column body={userTemplate} header="User Details" style={{ width: '20%' }} />
            <Column body={bankDetailsTemplate} header="Bank Details" style={{ width: '25%' }} />
            <Column body={amountTemplate} header="Amount Details" style={{ width: '15%' }} />
            <Column body={statusTemplate} header="Status" style={{ width: '10%' }} />
            <Column body={dateTimeTemplate} header="Requested Date" style={{ width: '15%' }} />
            <Column body={actionTemplate} header="Actions" style={{ width: '10%' }} />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default PendingWithdrawalRequest;
