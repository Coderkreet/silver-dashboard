import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { getLoanStatus } from '../../api/admin-api';

const LoanStatus = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchLoanStatus = async () => {
    try {
      setLoading(true);
      const response = await getLoanStatus();
      setData(response?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoanStatus();
  }, []);

  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };

  const dateTimeTemplate = (rowData) => {
    return new Date(rowData.requestedAt).toLocaleString();
  };

  const userTemplate = (rowData) => {
    return (
      <div>
        <div>Name: {rowData.user?.name}</div>
        <div>Email: {rowData.user?.email}</div>
        <div>Mobile: {rowData.mobile}</div>
      </div>
    );
  };

  const bankDetailsTemplate = (rowData) => {
    return (
      <div>
        <div>Bank: {rowData.bankName}</div>
        <div>Account: {rowData.AccountNo}</div>
        <div>IFSC: {rowData.IFSCCode}</div>
        <div>Branch: {rowData.branchName}</div>
      </div>
    );
  };

  const loanDetailsTemplate = (rowData) => {
    return (
      <div>
        <div>Amount: ₹{rowData.loanAmount}</div>
        <div>Type: {rowData.loanType}</div>
        <div>Commission: {rowData.commissionPercentage}%</div>
      </div>
    );
  };

  const personalDetailsTemplate = (rowData) => {
    return (
      <div>
        <div>Gender: {rowData.gender}</div>
        <div>DOB: {new Date(rowData.dob).toLocaleDateString()}</div>
        <div>PAN: {rowData.panCard}</div>
        <div>Aadhar: {rowData.aadharCard}</div>
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

  const addressTemplate = (rowData) => {
    return (
      <div>
        <div>{rowData.address}</div>
        <a href={rowData.addressProof} target="_blank" rel="noopener noreferrer" className="text-primary">
          View Proof
        </a>
      </div>
    );
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="LoanStatus martop">
        <div className="dataTable ss-card martop">
          <DataTable
            value={data}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            emptyMessage="No loan requests found."
            className="p-datatable-sm"
            showGridlines
            stripedRows
          >
            <Column body={serialNumberTemplate} header="S.No" style={{ width: '5%' }} />
            <Column body={userTemplate} header="User Details" style={{ width: '15%' }} />
            <Column body={bankDetailsTemplate} header="Bank Details" style={{ width: '15%' }} />
            <Column body={loanDetailsTemplate} header="Loan Details" style={{ width: '15%' }} />
            <Column body={personalDetailsTemplate} header="Personal Details" style={{ width: '15%' }} />
            <Column body={addressTemplate} header="Address Details" style={{ width: '15%' }} />
            <Column body={statusTemplate} header="Status" style={{ width: '10%' }} />
            <Column body={dateTimeTemplate} header="Requested Date" style={{ width: '10%' }} />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default LoanStatus;
