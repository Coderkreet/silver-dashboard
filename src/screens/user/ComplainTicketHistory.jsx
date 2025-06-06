import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import ViewTicketDetail from "../../components/ui/ViewPaymentDetailModal";
import { getPendingComplainHistoryUser } from "../../api/user-api";

const ComplainTicketHistory = () => {
  const [loading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [history, setHistory] = useState([]);
  const [viewDetail, setViewDetail] = useState();

  const getRaiseTicketHistory = async () => {
    try {
      setLoading(true);
      const response = await getPendingComplainHistoryUser();
      if (response?.data) {
        setHistory(response.data);
      }
    } catch (error) {
      console.log(error);
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
    setShowDetail(true);
    setViewDetail(rowData);
  };

  const actionTemplate = (rowData) => {
    return (
      <div style={{fontSize:"1.4rem"}} className="action-buttons">
        <Button
          label="View"
          icon="pi pi-eye"
          className="p-4 gap-3 rounded-5"
          onClick={() => showTicketPopup(rowData)}
          style={{ 
            background: "#3b82f6",
            border: "none",
            padding: "0.5rem 1rem",
            fontSize: ""
          }}
        />
      </div>
    );
  };

  const dateTimeTemplate = (rowData) => {
    return new Date(rowData.createdAt).toLocaleString();
  };

  const statusTemplate = (rowData) => {
    const statusColors = {
      'Processing': 'bg-yellow-500',
      'Resolved': 'bg-green-500',
      'Pending': 'bg-blue-500',
      'Rejected': 'bg-red-500'
    };
    
    return (
      <span className={`badge ${statusColors[rowData.status] || 'bg-gray-500'} text-white px-3 py-1 rounded-full text-sm`}>
        {rowData.status}
      </span>
    );
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
            value={history}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            emptyMessage="No complaint tickets found."
            className="p-datatable-sm"
            showGridlines
            stripedRows
          >
            <Column body={serialNumberTemplate} header="S.No" style={{ width: '5%' }} />
            <Column field="subject" header="Subject" style={{ width: '20%' }} />
            <Column field="message" header="Message" style={{ width: '30%' }} />
            <Column body={statusTemplate} header="Status" style={{ width: '15%' }} />
            <Column body={dateTimeTemplate} header="Created Date" style={{ width: '20%' }} />
            <Column body={actionTemplate} header="Actions" style={{ width: '10%' }} />
          </DataTable>
        </div>
      </div>

      <style>{`
        .action-buttons {
          display: flex;
          gap: 8px;
          justify-content: center;
        }
        .action-buttons .p-button {
          transition: all 0.2s ease;
        }
        .action-buttons .p-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .action-buttons .p-button:active {
          transform: translateY(0);
        }
        .badge {
          display: inline-block;
          font-weight: 500;
        }
      `}</style>
    </>
  );
};

export default ComplainTicketHistory;
