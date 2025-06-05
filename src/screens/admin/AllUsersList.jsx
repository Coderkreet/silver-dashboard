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
  const [globalFilter, setGlobalFilter] = useState(null);
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
      setUserList(response?.users);
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

  const spinIncomeTemplate = (rowData) => {
    return <span className="p-2">{rowData?.spinIncome?.toFixed(2)}</span>;
  };

  const totalIncomeTemplate = (rowData) => {
    return <span className="p-2">{rowData?.totalIncome?.toFixed(2)}</span>;
  };

  const currentIncomeTemplate = (rowData) => {
    return <span className="p-2">{rowData?.currentIncome?.toFixed(2)}</span>;
  };

  const levelIncomeTemplate = (rowData) => {
    return <span className="p-2">{rowData?.levelIncome?.toFixed(2)}</span>;
  };

  const royaltyIncomeTemplate = (rowData) => {
    return <span className="p-2">{rowData?.royaltyIncome?.toFixed(2)}</span>;
  };

  const referralIncomeTemplate = (rowData) => {
    return <span className="p-2">{rowData?.ReferralIncome?.toFixed(2)}</span>;
  };

  const selfIncomeTemplate = (rowData) => {
    return <span className="p-2">{rowData?.selfIncome?.toFixed(2)}</span>;
  };

  const totalInvestmentIncomeTemplate = (rowData) => {
    return <span className="p-2">{rowData?.investment?.toFixed(2)}</span>;
  };

  const currentAmountWithdrawalTemplate = (rowData) => {
    return (
      <span className="p-2">
        {(rowData?.totalIncome - rowData?.currentIncome)?.toFixed(2)}
      </span>
    );
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
            globalFilter={globalFilter}
          >
            <Column
              style={{ width: "10%" }}
              body={serialNumberTemplate}
              header="S.No"
            />
            {/* <Column field="_id" header="ID" filter sortable /> */}
            <Column sortable field="name" header="Name"  />
            <Column sortable field="email" header="Email"  />
            <Column sortable field="sponsorId" header="Sponsor Id"  />
            <Column sortable field="referralCode" header="Referred By"  />
            {/* <Column
              body={totalInvestmentIncomeTemplate}
              header="Total Investment"
              filter
              sortable
              field="investment"
            />
            <Column
              body={totalIncomeTemplate}
              header="Total Income"
              filter
              sortable
              field="totalIncome"
            />
            <Column
              body={currentIncomeTemplate}
              header="Wallet Balance"
              filter
              sortable
              field="currentIncome"
            /> */}
            {/* <Column
              body={currentAmountWithdrawalTemplate}
              header="Amount Withdrawal"
              filter
              sortable
              field="currentIncome"
            />
            <Column
              body={levelIncomeTemplate}
              header="Level Income"
              filter
              sortable
              field="levelIncome"
            />
            <Column
              body={royaltyIncomeTemplate}
              header="Royalty Income"
              filter
              sortable
              field="royaltyIncome"
            />
            <Column
              body={referralIncomeTemplate}
              header="Referral Income"
              filter
              sortable
              field="ReferralIncome"
            />
            <Column
              body={selfIncomeTemplate}
              header="Self Income"
              filter
              sortable
              field="selfIncome"
            />
            <Column
              body={spinIncomeTemplate}
              header="Spin Income"
              filter
              sortable
              field="spinIncome"
            /> */}
            <Column sortable field="createdAt" body={dateTimeTemplate} header="Join Date" />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default AllUsersList;
