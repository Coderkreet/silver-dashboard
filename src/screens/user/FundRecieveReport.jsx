/* eslint-disable no-unused-vars */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { getFundReceiveHistory } from "../../api/payment-api";

const FundRecieveReport = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(false);


 const [data, setData] = useState([]);
  const fetchFundTransferHistory = async () => {
    try {
      setLoading(true);
      const response = await getFundReceiveHistory();
      setData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFundTransferHistory();
  }, []);
  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };
  const dateTimeTemplate = (rowData) => {
    return  new Date(rowData.createdAt).toLocaleString();
  };
  return (
    <>
    {
      loading && <PageLoader />
    }
      <div className="WithdrawalReport martop">
        <div className="dataTable ss-card martop">
          <DataTable
            value={data?.fundTransfer}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            filterDisplay="row"
            globalFilter={globalFilter}
          >
            <Column body={serialNumberTemplate} header="S.No" filter sortable />
            <Column field="fundReceiverClientId.username" header="Username" filter sortable />
            <Column field="amount" header="Amount ($)" filter sortable />
            <Column field="status" header="Status" filter sortable />
            <Column field="createdAt" body={dateTimeTemplate} header="Date" filter sortable />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default FundRecieveReport;
