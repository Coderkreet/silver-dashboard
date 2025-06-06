import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { getDashboardStats } from "../../api/admin-api";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalInvestmentUsers: 0,
    totalInvestmentAmount: 0,
    totalPlanAmount: 0,
    totalWithdrawalAmount: 0,
    todayInvestment: 0,
    todayWithdrawalAmount: 0
  });

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await getDashboardStats();
      if (response) {
        setDashboardData(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <>
      {loading && <PageLoader />}

      <div className="UserHome AdminDashboard">
        <div className="income-wrapper mar-top">
          <div className="income-card ss-card">
            <div className="left">
              <h5>Total Users</h5>
              <p>{dashboardData.totalUsers || 0}</p>
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
              <h5>Total Investment Users</h5>
              <p>{dashboardData.totalInvestmentUsers || 0}</p>
            </div>
            <div className="right">
              <img
                src="https://img.icons8.com/3d-fluency/94/expensive-price.png"
                alt=""
              />
            </div>
          </div>

          <div className="income-card ss-card">
            <div className="left">
              <h5>Total Investment Amount</h5>
              <p>₹{(dashboardData.totalInvestmentAmount || 0).toLocaleString()}</p>
            </div>
            <div className="right">
              <img
                src="https://img.icons8.com/3d-fluency/94/expensive-price.png"
                alt=""
              />
            </div>
          </div>

          <div className="income-card ss-card">
            <div className="left">
              <h5>Total Plan Amount</h5>
              <p>₹{(dashboardData.totalPlanAmount || 0).toLocaleString()}</p>
            </div>
            <div className="right">
              <img
                src="https://img.icons8.com/3d-fluency/94/expensive-price.png"
                alt=""
              />
            </div>
          </div>

          <div className="income-card ss-card">
            <div className="left">
              <h5>Total Withdrawal Amount</h5>
              <p>₹{(dashboardData.totalWithdrawalAmount || 0).toLocaleString()}</p>
            </div>
            <div className="right">
              <img
                src="https://img.icons8.com/3d-fluency/94/coin-wallet.png"
                alt=""
              />
            </div>
          </div>

          <div className="income-card ss-card">
            <div className="left">
              <h5>Today Investment</h5>
              <p>₹{(dashboardData.todayInvestment || 0).toLocaleString()}</p>
            </div>
            <div className="right">
              <img
                src="https://img.icons8.com/3d-fluency/94/expensive-price.png"
                alt=""
              />
            </div>
          </div>

          <div className="income-card ss-card">
            <div className="left">
              <h5>Today Withdrawal Amount</h5>
              <p>₹{(dashboardData.todayWithdrawalAmount || 0).toLocaleString()}</p>
            </div>
            <div className="right">
              <img
                src="https://img.icons8.com/3d-fluency/94/coin-wallet.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .income-wrapper {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          padding: 1rem;
        }
        .income-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-radius: 12px;
          background: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }
        .income-card:hover {
          transform: translateY(-5px);
        }
        .income-card .left h5 {
          color: #666;
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }
        .income-card .left p {
          color: #2c3e50;
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
        }
        .income-card .right img {
          width: 50px;
          height: 50px;
          object-fit: contain;
        }
      `}</style>
    </>
  );
};

export default AdminDashboard;
