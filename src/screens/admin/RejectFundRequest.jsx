/* eslint-disable no-unused-vars */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { getInvestments } from "../../api/admin-api";

const RejectFundRequest = () => {
  const [loading, setLoading] = useState(false);
  const [investments, setInvestments] = useState([]);

  const fetchCancelledInvestments = async () => {
    try {
      setLoading(true);
      const response = await getInvestments();
      if (response?.data) {
        // Filter only cancelled investments
        const cancelledInvestments = response.data.filter(inv => inv.status === 'cancelled');
        setInvestments(cancelledInvestments);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCancelledInvestments();
  }, []);

  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
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
      <span className="badge bg-red-500 text-black px-3 py-1 rounded-full text-sm">
        {rowData.status?.toUpperCase()}
      </span>
    );
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="WithdrawalReport RejectFundRequest martop">
        <div className="dataTable ss-card martop">
          <DataTable
            value={investments}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            emptyMessage="No cancelled investments found."
            className="p-datatable-sm"
            showGridlines
            stripedRows
          >
            <Column body={serialNumberTemplate} header="S.No" style={{ width: '5%' }} />
            <Column body={userTemplate} header="User Details" style={{ width: '20%' }} />
            <Column body={bankDetailsTemplate} header="Bank Details" style={{ width: '25%' }} />
            <Column body={amountTemplate} header="Amount Details" style={{ width: '20%' }} />
            <Column body={statusTemplate} header="Status" style={{ width: '10%' }} />
            <Column body={dateTimeTemplate} header="Created Date" style={{ width: '20%' }} />
          </DataTable>
        </div>
      </div>

      <style>{`
        .badge {
          display: inline-block;
          font-weight: 500;
        }
      `}</style>
    </>
  );
};

export default RejectFundRequest;
