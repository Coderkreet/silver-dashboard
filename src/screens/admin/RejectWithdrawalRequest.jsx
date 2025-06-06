/* eslint-disable no-unused-vars */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { getWithdrawalsAdmin } from '../../api/admin-api';

const RejectWithdrawalRequest = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchWithdrawalHistory = async () => {
    try {
      setLoading(true);
      const response = await getWithdrawalsAdmin();
      // Filter only rejected withdrawals
      const rejectedWithdrawals = response?.withdrawals?.filter(
        (withdrawal) => withdrawal.status === 'rejected'
      ) || [];
      setData(rejectedWithdrawals);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawalHistory();
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
      <span className="badge bg-danger">
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
            value={data}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            emptyMessage="No rejected withdrawals found."
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
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default RejectWithdrawalRequest;
