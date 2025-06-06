import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "../../constants/Routes";
import UserMain from "../website/UserMain";
import DashboardMain from "../DashboardMain";
import UserHome from "../user/UserHome";
import ProfilePage from "../user/ProfilePage";
import Withdrawal from "../user/Withdrawal";
import WithdrawalReport from "../user/WithdrawalReport";
import OverallUserCustomPlan from "../user/OverallUserCustomPlan";
import TeamTree from "../user/TeamTree";
import AdminDashboard from "../admin/AdminDashboard";
import PaymentAproval from "../admin/PaymentAproval";
import BankDetails from "../user/BankDetails";
import FundRequestForm from "../user/FundRequestForm";
import FundTransferForm from "../user/FundTransferForm";
import FundRequestReport from "../user/FundRequestReport";
import FundTransferReport from "../user/FundTransferReport";
import DirectTeamLists from "../user/DirectTeamLists";
import FundAproval from "../admin/FundAproval";
import ReferralIncomeReports from "../user/income-pages/ReferralIncomeReports";
import SpinIncomeReports from "../user/income-pages/SpinIncomeReports";
import LevelIncomeReports from "../user/income-pages/LevelIncomeReports";
import RoyaltyIncomeReports from "../user/income-pages/RoyaltyIncomeReports";
import SelfIncomeReports from "../user/income-pages/SelfIncomeReports";
import PendingWithdrawalRequest from "../admin/PendingWithdrawalRequest";
import FundRecieveReport from "../user/FundRecieveReport";
import CompleteWithdrawalRequest from "../admin/CompleteWithdrawalRequest";
import RejectWithdrawalRequest from "../admin/RejectWithdrawalRequest";
import CompleteFundRequest from "../admin/CompleteFundRequest";
import RejectFundRequest from "../admin/RejectFundRequest";
import CompletePlanRequest from "../admin/CompletePlanRequest";
import RejectPlanRequest from "../admin/PlanHistory";
import ComplainRaiseTicket from "../user/ContectUs";
import ComplainTicketHistory from "../user/ComplainTicketHistory";
import ComplainTicketList from "../admin/ComplainTicketList";
import AllUsersList from "../admin/AllUsersList";
import AddPlansForm from "../admin/AddPlansForm";
import EmptyData from "../admin/EmptyData";
import OurPlans from "../admin/OurPlans";
import IncomeHistory from "../admin/IncomeHistory";
import LoanStatus from "../admin/LoanStatus";
import UpdateLoan from "../admin/UpdateLoan";
import LoanRequestForm from "../user/income-pages/LoanRequestForm";
import OurPlanUser from "../user/OurPlanUser";
import PlanHistory from "../admin/PlanHistory";
import AllWithdrawlHistory from "../admin/IncomeHistory";
import AllWithdrawalHistory from "../admin/AllWithdrawalHistory";
const Authenticate = () => {
  const role = localStorage.getItem("role");
  return (
    <>
      <Routes>
        {role === "Admin" ? (
          <>
            <Route
              path={AuthenticatedRoutes.PENDING_FUND_REQUEST}
              element={
                <DashboardMain
                  inner={<FundAproval />}
                  name="Pending Fund Request"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.PENDING_WITHDRAWAL_REQUEST}
              element={
                <DashboardMain
                  inner={<PendingWithdrawalRequest />}
                  name="Pending Withdrawal Request"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.APPROVED_WITHDRAWAL_REQUEST}
              element={
                <DashboardMain
                  inner={<CompleteWithdrawalRequest />}
                  name="Complete Withdrawal Request"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.REJECTED_WITHDRAWAL_REQUEST}
              element={
                <DashboardMain
                  inner={<RejectWithdrawalRequest />}
                  name="Reject Withdrawal Request"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.APPROVED_FUND_REQUEST}
              element={
                <DashboardMain
                  inner={<CompleteFundRequest />}
                  name="Complete Fund Request"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.REJECTED_FUND_REQUEST}
              element={
                <DashboardMain
                  inner={<RejectFundRequest />}
                  name="Reject Fund Request"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.APPROVED_USERS}
              element={
                <DashboardMain
                  inner={<CompletePlanRequest />}
                  name="Complete Plan Request"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.PLAN_HISTORY}
              element={
                <DashboardMain
                  inner={<PlanHistory />}
                  name="Reject Plan Request"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.ADMIN_DASHBOARD}
              element={
                <DashboardMain inner={<AdminDashboard />} name="Dashboard" />
              }
            />
            <Route
              path={"*"}
              element={
                <DashboardMain inner={<AdminDashboard />} name="Dashboard" />
              }
            />
            <Route
              path={AuthenticatedRoutes.ADD_PLANS}
              element={
                <DashboardMain
                  inner={<AddPlansForm />}
                  name="Add Plans Approval"
                />
              }
            />

              <Route
              path={AuthenticatedRoutes.OUR_PLANS_ADMIN}
              element={
                <DashboardMain
                  inner={<OurPlans />}
                  name="Our Plan"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.PENDING_USERS}
              element={
                <DashboardMain
                  inner={<AddPlansForm />}
                  name="Add Plans Approval"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.Empty_ROUTE}
              element={
                <DashboardMain
                  inner={<EmptyData />}
                  name="Pending Plans Approval"
                />
              }
            />
             <Route
              path={AuthenticatedRoutes.RAISE_TICKET_LIST}
              element={
                <DashboardMain
                  inner={<ComplainTicketList />}
                  name="Raise Ticket History"
                />
              }
            />
             <Route
              path={AuthenticatedRoutes.ALL_USERS}
              element={
                <DashboardMain
                  inner={<AllUsersList />}
                  name="All Users List"
                />
              }
            />

<Route
              path={AuthenticatedRoutes.USER_PROFILE}
              element={<DashboardMain inner={<ProfilePage />} name="Profile" />}
            />
           <Route
              path={AuthenticatedRoutes.ALL_INCOME_HISTORY}
              element={<DashboardMain inner={<IncomeHistory />} name="ALL INCOME HISTORY" />}
            />
              <Route
              path={AuthenticatedRoutes.ALL_WITHDRAWAL_HISTORY}
              element={<DashboardMain inner={<AllWithdrawalHistory />} name="ALL INCOME HISTORY" />}
            />
              <Route
              path={AuthenticatedRoutes.LOAN_STATUS}
              element={<DashboardMain inner={<LoanStatus />} name="LOAN_STATUS" />}
            />
               <Route
              path={AuthenticatedRoutes.UPDATE_LOAN_STATUS}
              element={<DashboardMain inner={<UpdateLoan />} name="UPDATE_LOAN_STATUS" />}
            />
          </>
        ) : (
          <>
            <Route
              path={AuthenticatedRoutes.USER_HOME}
              element={<UserMain />}
            />
               <Route
              path={AuthenticatedRoutes.OUR_PLANS}
              element={
                <DashboardMain
                  inner={<OurPlanUser />}
                  name="Our Plan"
                />
              }
            />
         
            <Route
              path={AuthenticatedRoutes.USER_DASHBOARD}
              element={<DashboardMain inner={<UserHome />} name="Dashboard" />}
            />
            <Route path="*" element={<UserMain />} />
            <Route
              path={AuthenticatedRoutes.USER_PROFILE}
              element={<DashboardMain inner={<ProfilePage />} name="Profile" />}
            />
            <Route
              path={AuthenticatedRoutes.BANK_DETAILS}
              element={
                <DashboardMain inner={<BankDetails />} name="Bank Detail" />
              }
            />

            <Route
              path={AuthenticatedRoutes.LOAN_FORM}
              element={
                <DashboardMain inner={<LoanRequestForm />} name=" Loan Form" />
              }
            />
            <Route
              path={AuthenticatedRoutes.REFERRAL_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<ReferralIncomeReports />}
                  name="Referral Income Report"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.SPIN_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<SpinIncomeReports />}
                  name="Spin Income Report"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.ADD_PLANS}
              element={
                <DashboardMain
                  inner={<AddPlansForm />}
                  name="Add Plans"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.LEVEL_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<LevelIncomeReports />}
                  name="Level Income Report"
                />
              }
            />
              <Route
              path={AuthenticatedRoutes.MATCHING_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<LevelIncomeReports />}
                  name="Matching Income Report"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.ROYALTY_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<RoyaltyIncomeReports />}
                  name="Royalty Income Report"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.SELF_INCOME_REPORT}
              element={
                <DashboardMain
                  inner={<SelfIncomeReports />}
                  name="Self Income Report"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.TEAM_TREE}
              element={<DashboardMain inner={<TeamTree />} name="Team Tree" />}
            />
            <Route
              path={AuthenticatedRoutes.WITHDRAWAL_REQUEST}
              element={<DashboardMain inner={<Withdrawal />} name="WITHDRAWAL_REPORT" />}
            />
            <Route
              path={AuthenticatedRoutes.WITHDRAWAL_REPORT}
              element={
                <DashboardMain
                  inner={<WithdrawalReport />}
                  name="Withdrawal Report"
                />
              }
            />
          

            <Route
              path={AuthenticatedRoutes.FUND_REQUEST}
              element={
                <DashboardMain
                  inner={<FundRequestForm />}
                  name="Fund Request"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.FUND_TRANSFER}
              element={
                <DashboardMain
                  inner={<FundTransferForm />}
                  name="Fund Transfer"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.FUND_REQUEST_HISTORY}
              element={
                <DashboardMain
                  inner={<FundRequestReport />}
                  name="Fund Request History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.FUND_TRANSFER_HISTORY}
              element={
                <DashboardMain
                  inner={<FundTransferReport />}
                  name="Fund Transfer History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.FUND_RECEIVE_HISTORY}
              element={
                <DashboardMain
                  inner={<FundRecieveReport />}
                  name="Fund Receive History"
                />
              }
            />
            <Route
              path={AuthenticatedRoutes.TEAM_DIRECT}
              element={
                <DashboardMain inner={<DirectTeamLists />} name="Direct Team" />
              }
            />
             <Route
              path={AuthenticatedRoutes.CONTACT_US}
              element={
                <DashboardMain
                  inner={<ComplainRaiseTicket />}
                  name="Raise Ticket"
                />
              }
            />
             <Route
              path={AuthenticatedRoutes.SUPPORT_RAISE_TICKET_HISTORY}
              element={
                <DashboardMain
                  inner={<ComplainTicketHistory />}
                  name="Raise Ticket"
                />
              }
            />
            
          </>
        )}
      </Routes>
    </>
  );
};

export default Authenticate;
