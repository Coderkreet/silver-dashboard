/* eslint-disable no-unused-vars */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { Tag } from "primereact/tag";
import { maskEmail } from "../../utils/additionalFunc";
import { getReferrals } from "../../api/user-api";

const DirectTeamLists = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchReferrals = async () => {
    try {
      setLoading(true);
      const response = await getReferrals();
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
    fetchReferrals();
  }, []);

  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };

  const maskEmailTemplate = (row) => {
    return maskEmail(row?.email);
  };

  const statusTemplate = (row) => {
    return row.isVerified ? (
      <Tag value="Verified" style={{fontSize:"1.2rem", padding:".2rem .5rem"}} severity="success" />
    ) : (
      <Tag value="Unverified" style={{fontSize:"1.2rem", padding:".2rem .5rem"}} severity="danger" />
    );
  };

  const walletTemplate = (row) => {
    return (
      <div className="space-y-1">
        <div className="text-sm">
          <span className="font-medium">Rupee Wallet:</span> ${row.wallet.rupeeWallet}
        </div>
        <div className="text-sm">
          <span className="font-medium">eCoin Wallet:</span> ${row.wallet.eCoinWallet}
        </div>
        <div className="text-sm">
          <span className="font-medium">Investment Wallet:</span> ${row.wallet.investmentWallet}
        </div>
      </div>
    );
  };

  const planTemplate = (row) => {
    return row.hasActivePlan ? (
      <div className="space-y-1">
        <div className="text-sm">
          <span className="font-medium">Amount:</span> ${row.planAmount}
        </div>
        <div className="text-sm">
          <span className="font-medium">Plan ID:</span> {row.planId}
        </div>
      </div>
    ) : (
      <Tag value="No Active Plan" style={{fontSize:"1.2rem", padding:".2rem .5rem"}} severity="warning" />
    );
  };

  const dateTemplate = (row) => {
    return new Date(row.createdAt).toLocaleString();
  };

  return (
    <>
      <div className="DirectTeamLists martop">
        <div className="dataTable ss-card martop">
          <DataTable
            value={data}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            filterDisplay="row"
            globalFilter={globalFilter}
            emptyMessage="No team members found."
          >
            <Column body={serialNumberTemplate} header="S.No" style={{ width: '70px' }} />
            <Column field="name" header="Name" sortable filter />
            <Column body={maskEmailTemplate} header="Email" sortable filter />
            <Column field="sponsorId" header="Sponsor ID" sortable filter />
            <Column field="referralCode" header="Referral Code" sortable filter />
            <Column body={walletTemplate} header="Wallet Details" />
            <Column body={planTemplate} header="Plan Details" />
            <Column body={statusTemplate} header="Status" sortable filter />
            <Column body={dateTemplate} header="Joined Date" sortable />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default DirectTeamLists;
