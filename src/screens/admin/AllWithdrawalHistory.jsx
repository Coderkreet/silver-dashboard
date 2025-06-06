import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { getWithdrawalsAdmin } from '../../api/admin-api';
import { approveWithdrawalRequest, rejectWithdrawalRequest } from "../../api/payment-api";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";

const AllWithdrawalHistory = () => {
  const [loading, setLoading] = useState(false);
  const [withdrawals, setWithdrawals] = useState([]);

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const response = await getWithdrawalsAdmin();
      setWithdrawals(response?.withdrawals || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const rejectUserHandler = async (id) => {
    try {
      setLoading(true);
      await rejectWithdrawalRequest(id);
      SwalSuccess.fire({
        icon: "success",
        title: "Rejected",
        text: "Withdrawal Rejected Successfully",
      });
      fetchWithdrawals();
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
      fetchWithdrawals();
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

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };

  const dateTimeTemplate = (rowData) => {
    return new Date(rowData.requestedAt).toLocaleString();
  };

  const processedDateTemplate = (rowData) => {
    return rowData.processedAt ? new Date(rowData.processedAt).toLocaleString() : '-';
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

  const handleApprove = (rowData) => {
    approveUserHandler(rowData._id);
  };

  const handleReject = (rowData) => {
    rejectUserHandler(rowData._id);
  };

  const actionTemplate = (rowData) => {
    const isPending = rowData.status === 'pending';
    return (
      <div className="action-buttons">
        <Button
          label="Approve"
          icon="pi pi-check"
          className="p-button-success p-button-sm"
          onClick={() => handleApprove(rowData)}
          disabled={!isPending}
          style={{ 
            marginRight: "8px",
            background: isPending ? "#22c55e" : "#9ca3af",
            border: "none",
            padding: "0.5rem 1rem",
            fontSize: "0.875rem",
            opacity: isPending ? 1 : 0.7
          }}
        />
        <Button
          label="Reject"
          icon="pi pi-times"
          className="p-button-danger p-button-sm"
          onClick={() => handleReject(rowData)}
          disabled={!isPending}
          style={{ 
            background: isPending ? "#ef4444" : "#9ca3af",
            border: "none",
            padding: "0.5rem 1rem",
            fontSize: "0.875rem",
            opacity: isPending ? 1 : 0.7
          }}
        />
      </div>
    );
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="WithdrawalReport martop">
        <div className="dataTable ss-card martop">
          <DataTable
            value={withdrawals}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            emptyMessage="No withdrawal history found."
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
            <Column body={processedDateTemplate} header="Processed Date" style={{ width: '15%' }} />
            <Column body={actionTemplate} header="Actions" style={{ width: '10%' }} />
          </DataTable>
        </div>
      </div>

      <style>{`
        .action-buttons {
          display: flex;
          gap: 8px;
          justify-content: center;
        }
        .action-buttons .p-button {
          transition: all 0.2s ease;
        }
        .action-buttons .p-button:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .action-buttons .p-button:not(:disabled):active {
          transform: translateY(0);
        }
        .action-buttons .p-button.p-button-success:not(:disabled) {
          background: #22c55e !important;
        }
        .action-buttons .p-button.p-button-danger:not(:disabled) {
          background: #ef4444 !important;
        }
        .action-buttons .p-button .p-button-label {
          font-weight: 500;
        }
        .action-buttons .p-button .p-button-icon {
          margin-right: 4px;
        }
        .action-buttons .p-button:disabled {
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
};

export default AllWithdrawalHistory;
