import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";
import ViewPaymentDetailModal from "../../components/ui/ViewPaymentDetailModal";
import {
  deleteUserAdminEnd,
  getAllUserList,
  userStatusToggle,
} from "../../api/admin-api";
import Swal from "sweetalert2";

const AllUsersList = () => {
  const [loading, setLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [UserList, setUserList] = useState([]);
  const [viewDetail, setViewDetail] = useState([]);

  const toggleUserStatusHandler = async (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: `User will be ${!data?.userBlock ? "Blocked" : "Unblocked"}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await userStatusToggle(data?._id);
          SwalSuccess.fire({
            icon: "success",
            title: `${!data?.userBlock ? "Blocked" : "Unblocked"} Successfully`,
          });

          setUserList((prevList) =>
            prevList.map((user) =>
              user._id === data._id
                ? { ...user, userBlock: !user.userBlock }
                : user
            )
          );
        } catch (error) {
          console.log(error);
          SwalError.fire({
            icon: "error",
            title: "Error",
            text: error?.response?.data?.message || "Something went wrong!",
          });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUserList();
      setUserList(response?.data || []);
    } catch (error) {
      console.log(error);
      SwalError.fire({
        icon: "error",
        title: "Error fetching users",
        text: error?.response?.data?.message || "Failed to fetch user list",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };

  const actionTemplate = (rowData) => {
    return (
      <div className="action-buttons">
        <Button
          label={!rowData?.userBlock ? "Unblock" : "Block"}
          onClick={() => {
            toggleUserStatusHandler(rowData);
          }}
          style={{ color: !rowData?.userBlock ? "green" : "red" }}
        />
        <Button
          label="Delete"
          onClick={() => {
            deleteUserHandler(rowData);
          }}
          style={{ color: "red" }}
        />
      </div>
    );
  };

  const deleteUserHandler = async (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: `User will be deleted`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await deleteUserAdminEnd(data?._id);
          SwalSuccess.fire({
            icon: "success",
            title: `User deleted Successfully`,
          });

          fetchAllUsers();
        } catch (error) {
          console.log(error);
          SwalError.fire({
            icon: "error",
            title: "Error",
            text: error?.response?.data?.message || "Something went wrong!",
          });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const dateTimeTemplate = (rowData) => {
    return new Date(rowData.createdAt).toLocaleString();
  };

  const rupeeWalletTemplate = (rowData) => {
    return <span className="p-2">{rowData?.wallet?.rupeeWallet ? Number(rowData.wallet.rupeeWallet).toFixed(2) : '0.00'}</span>;
  };

  const eCoinWalletTemplate = (rowData) => {
    return <span className="p-2">{rowData?.wallet?.eCoinWallet ? Number(rowData.wallet.eCoinWallet).toFixed(2) : '0.00'}</span>;
  };

  const investmentWalletTemplate = (rowData) => {
    return <span className="p-2">{rowData?.wallet?.investmentWallet ? Number(rowData.wallet.investmentWallet).toFixed(2) : '0.00'}</span>;
  };

  const investmentTemplate = (rowData) => {
    return <span className="p-2">{rowData?.investmentAmount ? Number(rowData.investmentAmount).toFixed(2) : '0.00'}</span>;
  };

  const earningsTemplate = (rowData) => {
    return <span className="p-2">{rowData?.earnings ? Number(rowData.earnings).toFixed(2) : '0.00'}</span>;
  };

  return (
    <>
      {loading && <PageLoader />}

      {showDetail && (
        <ViewPaymentDetailModal
          data={viewDetail}
          show={showDetail}
          onHide={() => setShowDetail(false)}
        />
      )}

      <div className="WithdrawalReport martop">
        <div className="dataTable ss-card martop">
          <DataTable
            value={UserList}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25, 50, 100, 200, 500, 1000]}
            filterDisplay="row"
          >
            <Column
              style={{ width: "5%" }}
              body={serialNumberTemplate}
              header="S.No"
            />
            <Column sortable field="name" header="Name" />
            <Column sortable field="email" header="Email" />
            <Column sortable field="sponsorId" header="Sponsor ID" />
            <Column sortable field="referralCode" header="Referral Code" />
            <Column body={rupeeWalletTemplate} header="Rupee Wallet" sortable />
            <Column body={eCoinWalletTemplate} header="eCoin Wallet" sortable />
            <Column body={investmentWalletTemplate} header="Investment Wallet" sortable />
            <Column body={investmentTemplate} header="Investment Amount" sortable />
            <Column body={earningsTemplate} header="Earnings" sortable />
            <Column field="isVerified" header="Verified" sortable />
            <Column field="hasActivePlan" header="Active Plan" sortable />
            <Column body={dateTimeTemplate} header="Join Date" sortable />
            {/* <Column body={actionTemplate} header="Actions" /> */}
          </DataTable>
        </div>
      </div>

      <style>{`
        .wallet-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 8px;
        }
        .wallet-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 4px 8px;
          background: rgba(0, 0, 0, 0.02);
          border-radius: 4px;
        }
        .wallet-label {
          font-weight: 500;
          color: #666;
          font-size: 0.9rem;
        }
        .wallet-value {
          font-weight: 600;
          color: #2c3e50;
          font-size: 0.9rem;
        }
      `}</style>
    </>
  );
};

export default AllUsersList;
