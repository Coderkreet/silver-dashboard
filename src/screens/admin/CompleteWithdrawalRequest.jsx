/* eslint-disable no-unused-vars */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { WithdrawalReportContent } from "../../constants/content/dummy/WithdrawalReportContent";
import PageLoader from "../../components/ui/PageLoader";
import { getCompleteWithdrawal } from "../../api/payment-api";

const CompleteWithdrawalRequest = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // getWithdrawalHistory
  console.log(data)

  const fetchWithdrawalHistory = async () => {
    try {
      setLoading(true);
      const response = await getCompleteWithdrawal();
      setData(response?.data);
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
  const dateTimeTemplate = (rowData) => {
    return new Date(rowData.createdAt).toLocaleString();
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="WithdrawalReport CompleteWithdrawalRequest martop">

        <div className="dataTable ss-card martop">
          <DataTable
            value={data}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            filterDisplay="row"
            globalFilter={globalFilter}
          >
            <Column body={serialNumberTemplate} header="S.No" filter sortable />
            <Column field="_id" header="Request ID" filter sortable />
            <Column field="userId._id" header="User ID" filter sortable />
            <Column field="userId.username" header="Username" filter sortable />
            <Column field="amount" header="Amount" filter sortable />
            <Column field="createdAt" body={dateTimeTemplate} header="Date" filter sortable />
            <Column field="status" header="Status" filter sortable />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default CompleteWithdrawalRequest;
