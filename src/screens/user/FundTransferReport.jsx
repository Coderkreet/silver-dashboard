/* eslint-disable no-unused-vars */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { WithdrawalReportContent } from "../../constants/content/dummy/WithdrawalReportContent";
import PageLoader from "../../components/ui/PageLoader";
import { getFundTransferHistory } from "../../api/payment-api";
import { getLoanHistory } from "../../api/user-api";
import { Tag } from "primereact/tag";

const FundTransferReport = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchLoanHistory = async () => {
    try {
      setLoading(true);
      const response = await getLoanHistory();
      if (response?.success) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoanHistory();
  }, []);

  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };

  const amountTemplate = (row) => {
    return `$${row.loanAmount.toFixed(2)}`;
  };

  const statusTemplate = (row) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800"
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[row.status] || 'bg-gray-100 text-gray-800'}`}>
        {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
      </span>
    );
  };

  const bankDetailsTemplate = (row) => {
    return (
      <div className="space-y-1">
        <div className="text-sm">
          <span className="font-medium">Bank:</span> {row.bankName}
        </div>
        <div className="text-sm">
          <span className="font-medium">A/C:</span> {row.AccountNo}
        </div>
        <div className="text-sm">
          <span className="font-medium">IFSC:</span> {row.IFSCCode}
        </div>
        <div className="text-sm">
          <span className="font-medium">Branch:</span> {row.branchName}
        </div>
      </div>
    );
  };

  const personalDetailsTemplate = (row) => {
    return (
      <div className="space-y-1">
        <div className="text-sm">
          <span className="font-medium">Mobile:</span> {row.mobile}
        </div>
        <div className="text-sm">
          <span className="font-medium">PAN:</span> {row.panCard}
        </div>
        <div className="text-sm">
          <span className="font-medium">Aadhar:</span> {row.aadharCard}
        </div>
        <div className="text-sm">
          <span className="font-medium">DOB:</span> {new Date(row.dob).toLocaleDateString()}
        </div>
      </div>
    );
  };

  const dateTemplate = (row) => {
    return new Date(row.requestedAt).toLocaleString();
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="FundTransferReport martop">
        <div className="dataTable ss-card martop">
          <DataTable
            value={data}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            filterDisplay="row"
            globalFilter={globalFilter}
            emptyMessage="No loan history found."
          >
            <Column body={serialNumberTemplate} header="S.No" style={{ width: '70px' }} />
            <Column field="loanType" header="Loan Type" sortable filter />
            <Column body={amountTemplate} header="Amount" sortable filter />
            <Column body={bankDetailsTemplate} header="Bank Details" />
            <Column body={personalDetailsTemplate} header="Personal Details" />
            <Column body={statusTemplate} header="Status" sortable filter />
            <Column body={dateTemplate} header="Requested Date" sortable />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default FundTransferReport;
