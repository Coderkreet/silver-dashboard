/* eslint-disable no-unused-vars */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";
import {
  approveFundRequest,
  rejectFundRequest,
} from "../../api/payment-api";
import ViewPaymentDetailModal from "../../components/ui/ViewPaymentDetailModal";
import { getInvestments } from "../../api/admin-api";

const FundAproval = () => {
  const [loading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [investments, setInvestments] = useState([]);
  const [viewDetail, setViewDetail] = useState(null);

  const rejectUserHandler = async (id) => {
    try {
      setLoading(true);
      await rejectFundRequest(id);
      SwalSuccess.fire({
        icon: "success",
        title: "Rejected",
        text: "Investment Rejected Successfully",
      });
      fetchPendingInvestments();
    } catch (error) {
      console.log(error);
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
      await approveFundRequest(id);
      SwalSuccess.fire({
        icon: "success",
        title: "Approved",
        text: "Investment Approved Successfully",
      });
      fetchPendingInvestments();
    } catch (error) {
      console.log(error);
      SwalError.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingInvestments = async () => {
    try {
      setLoading(true);
      const response = await getInvestments();
      if (response?.data) {
        // Filter only pending investments
        const pendingInvestments = response.data.filter(inv => inv.status === 'pending');
        setInvestments(pendingInvestments);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingInvestments();
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
          className="p-button-success p-button-sm"
          onClick={() => handleApprove(rowData)}
          style={{ 
            background: "#22c55e",
            border: "none",
            padding: "0.5rem 1rem",
            fontSize: "0.875rem",
            marginRight: "8px"
          }}
        />
        <Button
          label="Reject"
          icon="pi pi-times"
          className="p-button-danger p-button-sm"
          onClick={() => handleReject(rowData)}
          style={{ 
            background: "#ef4444",
            border: "none",
            padding: "0.5rem 1rem",
            fontSize: "0.875rem"
          }}
        />
      </div>
    );
  };

  const dateTimeTemplate = (rowData) => {
    return new Date(rowData.createdAt).toLocaleString();
  };

  const userTemplate = (rowData) => {
    return (
      <div>
        <div>Name: {rowData.user?.name}</div>
        <div>Email: {rowData.user?.email}</div>
        <div>Referral: {rowData.user?.referralCode}</div>
      </div>
    );
  };

  const bankDetailsTemplate = (rowData) => {
    return (
      <div>
        <div>Name: {rowData.bankdetails?.holderName}</div>
        <div>Bank: {rowData.bankdetails?.bankName}</div>
        <div>Account: {rowData.bankdetails?.accountNo}</div>
        <div>IFSC: {rowData.bankdetails?.ifscCode}</div>
      </div>
    );
  };

  const amountTemplate = (rowData) => {
    return (
      <div>
        <div>Amount: ₹{rowData.amount?.toLocaleString()}</div>
        <div>Transaction ID: {rowData.transactionId}</div>
        <div>Plan Amount: ₹{rowData.user?.planAmount?.toLocaleString()}</div>
      </div>
    );
  };

  const statusTemplate = (rowData) => {
    return (
      <span className="badge bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-3 py-1 rounded-full text-sm font-medium shadow-sm">
        {rowData.status?.toUpperCase()}
      </span>
    );
  };

  return (
    <>
      {loading && <PageLoader />}

      {showDetail && (
        <ViewPaymentDetailModal
          data={viewDetail}
          show={showDetail}
          onHide={() => setShowDetail(false)}
        />
      )}

      <div className="WithdrawalReport martop">
        <div className="dataTable ss-card martop">
          <DataTable
            value={investments}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            emptyMessage="No pending investments found."
            className="p-datatable-sm"
            showGridlines
            stripedRows
          >
            <Column body={serialNumberTemplate} header="S.No" style={{ width: '5%' }} />
            <Column body={userTemplate} header="User Details" style={{ width: '20%' }} />
            <Column body={bankDetailsTemplate} header="Bank Details" style={{ width: '25%' }} />
            <Column body={amountTemplate} header="Amount Details" style={{ width: '20%' }} />
            <Column body={statusTemplate} header="Status" style={{ width: '10%' }} />
            <Column body={dateTimeTemplate} header="Created Date" style={{ width: '15%' }} />
            {/* <Column body={actionTemplate} header="Actions" style={{ width: '5%' }} /> */}
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
        .action-buttons .p-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .action-buttons .p-button:active {
          transform: translateY(0);
        }
        .badge {
          display: inline-block;
          font-weight: 500;
        }
      `}</style>
    </>
  );
};

export default FundAproval;
