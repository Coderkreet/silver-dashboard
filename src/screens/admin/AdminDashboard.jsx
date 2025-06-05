import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { getAllUsers } from "../../api/account-api";
import { Column } from "primereact/column";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(null);
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [totalUsers, setTotalUsers] = useState([]);
  console.log(totalUsers);
  const fetchWithdrawalHistory = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      setTotalUsers(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWithdrawalHistory();
  }, []);

  const [totalValues, setTotalValues] = useState({
    totalUser: 0,
    totalInvestment: 0,
    totalWithdrawal: 0,
    todayWithdrawal: 0,
    totalRejectWithdrawal: 0,
    totalCompletedWithdrawal: 0,
  });

  useEffect(() => {
    if (userInfo) {
      setTotalValues({
        totalUser: userInfo?.totalUsers || 0,
        todayInvestment: userInfo?.todayInvestment || 0,
        totalInvestment: userInfo?.totalInvestment || 0,
        totalWithdrawal: userInfo?.totalWithdrawal || 0,
        todayWithdrawal: userInfo?.todayWithdrawal || 0,
        totalRejectWithdrawal: userInfo?.totalRejectWithdrawal || 0,
        totalCompletedWithdrawal: userInfo?.totalCompletedWithdrawal || 0,
      });
    }
  }, [userInfo]);

  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };

  return (
    <>
      {loading && <PageLoader />}

      <div className="UserHome AdminDashboard">
        <div className="income-wrapper mar-top">
          <div className="income-card ss-card">
            <div className="left">
              <h5>Total User</h5>
              <p>{totalValues.totalUser}</p>
            </div>
            <div className="right">
              <img
                src="https://img.icons8.com/3d-fluency/94/change-user-male.png"
                alt=""
              />
            </div>
          </div>

          <div className="income-card ss-card">
            <div className="left">
              <h5>Total Investment</h5>
              <p>${totalValues.totalInvestment}</p>
            </div>
            <div className="right">
              <img
                src={"https://img.icons8.com/3d-fluency/94/expensive-price.png"}
                alt=""
              />
            </div>
          </div>
          <div className="income-card ss-card">
            <div className="left">
              <h5>Today Investment</h5>
              <p>${totalValues.todayInvestment}</p>
            </div>
            <div className="right">
              <img
                src={"https://img.icons8.com/3d-fluency/94/expensive-price.png"}
                alt=""
              />
            </div>
          </div>

          <div className="income-card ss-card">
            <div className="left">
              <h5>Total Withdrawal</h5>
              <p>${totalValues.totalWithdrawal}</p>
            </div>
            <div className="right">
              <img
                src={
                  "https://img.icons8.com/3d-fluency/94/coin-wallet.png"
                }
                alt=""
              />
            </div>
          </div>
          <div className="income-card ss-card">
            <div className="left">
              <h5>Today Withdrawal</h5>
              <p>${totalValues.todayWithdrawal}</p>
            </div>
            <div className="right">
              <img
                src={
                  "https://img.icons8.com/3d-fluency/94/coin-wallet.png"
                }
                alt=""
              />
            </div>
          </div>
          <div className="income-card ss-card">
            <div className="left">
              <h5>Completed Withdrawal</h5>
              <p>${totalValues.totalCompletedWithdrawal}</p>
            </div>
            <div className="right">
              <img
                src={
                  "https://img.icons8.com/3d-fluency/94/coin-wallet.png"
                }
                alt=""
              />
            </div>
          </div>
          <div className="income-card ss-card">
            <div className="left">
              <h5>Rejected Withdrawal</h5>
              <p>${totalValues.totalRejectWithdrawal}</p>
            </div>
            <div className="right">
              <img
                src={
                  "https://img.icons8.com/3d-fluency/94/coin-wallet.png"
                }
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="ss-card  mar-top">
          <div className="head">
            <h5 className="cardHeading">Total Users</h5>
          </div>
          <div className="dataTable">
            <DataTable
              value={totalUsers}
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
              <Column field="username" header="Username" filter sortable />
              <Column field="email" header="Email" filter sortable />
              <Column field="mobile" header="Mobile No" filter sortable />
            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
