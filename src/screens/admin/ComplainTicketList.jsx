import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import ViewTicketDetail from "../../components/ui/ViewPaymentDetailModal";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";
import { approveComplainRequest, getPendingComplainHistory, rejectComplainRequest } from "../../api/admin-api";

const ComplainTicketList = () => {
  // eslint-disable-next-line no-unused-vars
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [History, setHistory] = useState([]);
  const [viewDetail, setViewDetail] = useState();
  const getRaiseTicketHistory = async () => {
    try {
      setLoading(true);
      const response = await getPendingComplainHistory();
      setHistory(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const rejectUserHandler = async (id) => {
    try {
      setLoading(true);
      await rejectComplainRequest(id);
      SwalSuccess.fire({
        icon: "success",
        title: "Rejected",
        text: "Complain Rejected Successfully",
      });
      setInterval(() => {
        window.location.reload();
      }, 2000);
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
      await approveComplainRequest(id);
      SwalSuccess.fire({
        icon: "success",
        title: "Approved",
        text: "Complain Approved Successfully",
      });
      setInterval(() => {
        window.location.reload();
      }, 2000);
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

  useEffect(() => {
    getRaiseTicketHistory();
  }, []);
  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };

  const showTicketPopup = (rowData) => {
    // approveUserHandler(rowData._id);
    setShowDetail(true);
    setViewDetail(rowData)
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
          label="View"
          className="p-mr-2"
          onClick={() => showTicketPopup(rowData)}
          style={{ color: "#050505", fontWeight: "600", marginRight: "10px" }}
        />
         <Button
          label="Approve"
          icon="pi pi-check"
          className="p-button-success p-mr-2"
          onClick={() => handleApprove(rowData)}
          style={{ color: "green", marginRight: "10px" }}
        />
        <Button
          label="Reject"
          icon="pi pi-times"
          className="p-button-danger"
          onClick={() => handleReject(rowData)}
          style={{ color: "red" }}
        />
      </div>
    );
  };
  const dateTimeTemplate = (rowData) => {
    return new Date(rowData.createdAt).toLocaleString();
  };

  return (
    <>
      {loading && <PageLoader />}

      {showDetail && (
        <ViewTicketDetail
          data={viewDetail}
          show={showDetail}
          onHide={() => setShowDetail(false)}
        />
      )}

      <div className="WithdrawalReport martop">
        <div className="dataTable ss-card martop">
          <DataTable
            value={History}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            filterDisplay="row"
            globalFilter={globalFilter}
          >
            <Column
              style={{ width: "10%" }}
              body={serialNumberTemplate}
              header="S.No"
              filter
              sortable
            />
            <Column field="_id" header="ID" filter sortable />
            <Column field="subject" header="Subject" filter sortable />
            <Column field="message" header="Message" filter sortable />
            <Column field="status" header="Status" filter sortable />
            <Column field="createdAt" body={dateTimeTemplate} header="Date" filter sortable />
            <Column body={actionTemplate} header="Actions" />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default ComplainTicketList;
