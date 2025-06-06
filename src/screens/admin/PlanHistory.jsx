/* eslint-disable no-unused-vars */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { WithdrawalReportContent } from "../../constants/content/dummy/WithdrawalReportContent";
import PageLoader from "../../components/ui/PageLoader";
import { getPlanHistory } from "../../api/admin-api";

const PlanHistory = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchPlanHistory = async () => {
    try {
      setLoading(true);
      const response = await getPlanHistory();
      if (response?.status == 200) {
        setData(response?.data?.data || []);
      }
    } catch (error) {
      console.error("Error fetching plan history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanHistory();
  }, []);

  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };

  const dateTimeTemplate = (rowData) => {
    return new Date(rowData.createdAt).toLocaleString();
  };

  const walletTemplate = (rowData) => {
    return (
      <div>
        <div>Rupee: ₹{rowData.wallet.rupeeWallet}</div>
        <div>eCoin: {rowData.wallet.eCoinWallet}</div>
        <div>Investment: ₹{rowData.wallet.investmentWallet}</div>
      </div>
    );
  };

  const planTemplate = (rowData) => {
    return (
      <div>
        <div>Plan: {rowData.planId?.name}</div>
        <div>Amount: ₹{rowData.planAmount}</div>
      </div>
    );
  };

  const statusTemplate = (rowData) => {
    return (
      <div>
        <span className={`badge ${rowData.isVerified ? 'bg-success' : 'bg-warning'} me-2`}>
          {rowData.isVerified ? 'Verified' : 'Unverified'}
        </span>
        <span className={`badge ${rowData.paymentVerified ? 'bg-success' : 'bg-warning'}`}>
          {rowData.paymentVerified ? 'Payment Verified' : 'Payment Pending'}
        </span>
      </div>
    );
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="WithdrawalReport PlanHistory martop">
        <div className="dataTable ss-card martop">
          <DataTable
            value={data}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            filterDisplay="row"
            globalFilter={globalFilter}
            emptyMessage="No plan history found."
            className="p-datatable-sm"
          >
            <Column body={serialNumberTemplate} header="S.No" style={{ width: '5%' }} />
            <Column field="name" header="Name" filter sortable style={{ width: '15%' }} />
            <Column field="email" header="Email" filter sortable style={{ width: '15%' }} />
            <Column field="sponsorId" header="Sponsor ID" filter sortable style={{ width: '10%' }} />
            <Column field="referralCode" header="Referral Code" filter sortable style={{ width: '10%' }} />
            <Column body={walletTemplate} header="Wallet Details" style={{ width: '15%' }} />
            <Column body={planTemplate} header="Plan Details" style={{ width: '15%' }} />
            <Column body={statusTemplate} header="Status" style={{ width: '15%' }} />
            <Column body={dateTimeTemplate} header="Joined Date" filter sortable style={{ width: '15%' }} />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default PlanHistory;
