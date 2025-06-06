/* eslint-disable no-unused-vars */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { WithdrawalReportContent } from "../../constants/content/dummy/WithdrawalReportContent";
import PageLoader from "../../components/ui/PageLoader";
import { getWithdrawalHistory, getWithdrawals } from "../../api/payment-api";

const WithdrawalReport = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // getWithdrawalHistory

  const fetchWithdrawalHistory = async () => {
    try {
      setLoading(true);
      const response = await getWithdrawals();
      setData(response);
    } catch (error) {
      console.log(error);
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

  const amountTemplate = (rowData) => {
    return `₹ ${rowData.amount.toFixed(2)}`;
  };

  const bankDetailsTemplate = (rowData) => {
    return (
      <div className="space-y-1">
        <div className="font-medium">{rowData.bankDetails.accountHolder}</div>
        <div className="text-sm text-gray-600">{rowData.bankDetails.bankName}</div>
        <div className="text-sm text-gray-500">A/C: {rowData.bankDetails.accountNumber}</div>
        <div className="text-sm text-gray-500">IFSC: {rowData.bankDetails.ifscCode}</div>
      </div>
    );
  };

  const statusTemplate = (rowData) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800"
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[rowData.status] || 'bg-gray-100 text-gray-800'}`}>
        {rowData.status.charAt(0).toUpperCase() + rowData.status.slice(1)}
      </span>
    );
  };

  const dateTemplate = (rowData, field) => {
    if (!rowData[field]) return '-';
    return new Date(rowData[field]).toLocaleString();
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="WithdrawalReport martop">
        <div className="top-wrapper">
          <div className="ss-card">
            <div className="txt">
              <h5 className="heading">Total Withdrawal</h5>
              <p className="para1">₹ {data?.totalAmount?.toFixed(2) || 0}</p>
            </div>
            <div className="icon">
              <img
                src="https://img.icons8.com/3d-fluency/94/money-bag.png"
                alt=""
              />
            </div>
          </div>
          <div className="ss-card">
            <div className="txt">
              <h5 className="heading">Paid Withdrawal</h5>
              <p className="para1">₹ {data?.completedAmount?.toFixed(2) || 0}</p>
            </div>
            <div className="icon">
              <img
                src="https://img.icons8.com/3d-fluency/94/approval.png"
                alt=""
              />
            </div>
          </div>
          <div className="ss-card">
            <div className="txt">
              <h5 className="heading">Reject Withdrawal</h5>
              <p className="para1">₹ {data?.totalRejectedAmount?.toFixed(2) || 0}</p>
            </div>
            <div className="icon">
              <img
                src="https://img.icons8.com/3d-fluency/94/cancel.png"
                alt=""
              />
            </div>
          </div>
        </div>
        {/* 
        <div className="global-filter-container">
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Global Search"
            className="p-inputtext-sm"
          />
        </div> */}

        <div className="dataTable ss-card martop">
          <DataTable
            value={data?.withdrawals}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            // filterDisplay="row"
            // globalFilter={globalFilter}
            emptyMessage="No withdrawal records found."
          >
            <Column body={serialNumberTemplate} header="S.No" style={{ width: '70px' }} />
            <Column field="amount" header="Amount" body={amountTemplate} sortable filter />
            <Column field="bankDetails" header="Bank Details" body={bankDetailsTemplate} />
            <Column field="status" header="Status" body={statusTemplate} sortable filter />
            <Column field="requestedAt" header="Requested Date" body={(rowData) => dateTemplate(rowData, 'requestedAt')} sortable />
            {/* <Column field="processedAt" header="Processed Date" body={(rowData) => dateTemplate(rowData, 'processedAt')} sortable /> */}
            <Column field="walletUsed" header="Wallet" sortable filter />
            {/* <Column field="reason" header="Reason" /> */}
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default WithdrawalReport;
