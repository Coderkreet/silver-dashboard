import { FaUsers, FaUserTie } from "react-icons/fa";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { LuPackageSearch } from "react-icons/lu";
import { AuthenticatedRoutes } from "../Routes";
import { FaMoneyBillTransfer, FaRegMoneyBill1, FaWallet } from "react-icons/fa6";
import { MdOutlineAddCard } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { MainContent } from "./MainContent";
import { History } from "lucide-react";

export const SidebarContent = {
  user: [
    {
      id: "Dashboard",
      icon: <HiOutlineSquares2X2 />,
      name: "Dashboard",
      link: AuthenticatedRoutes.USER_DASHBOARD,
    },

    // {
    //   id: "Income Report",
    //   icon: <LuPackageSearch />,
    //   name: "Income Report",
    //   options: [
    //     {
    //       id: "Self Income",
    //       name: "Direct Income",
    //       link: AuthenticatedRoutes.SELF_INCOME_REPORT,
    //     },
    //     {
    //       id: "Referral Income",
    //       name: "Referral Income",
    //       link: AuthenticatedRoutes.REFERRAL_INCOME_REPORT,
    //     },
    //     // {
    //     //   id: "Spin Income",
    //     //   name: "Spin Income",
    //     //   link: AuthenticatedRoutes.SPIN_INCOME_REPORT,
    //     // },
    //     {
    //       id: "Royalty Income",
    //       name: "ROI Income",
    //       link: AuthenticatedRoutes.ROYALTY_INCOME_REPORT,
    //     },
    //     {
    //       id: "Level Income",
    //       name: "Level Income",
    //       link: AuthenticatedRoutes.LEVEL_INCOME_REPORT,
    //     },
    //        {
    //       id: "Matching Income",
    //       name: "Matching Income",
    //       link: AuthenticatedRoutes.MATCHING_INCOME_REPORT,
    //     },
    //   ],
    // },
    {
      id: "Wallet",
      icon: <FaWallet />,
      name: "Wallet",
      options: [
        {
          id: "Wallet",
          name: "Withdrawal Request",
          link: AuthenticatedRoutes.WITHDRAWAL_REQUEST,
        },
        {
          id: "Withdrawal Report",
          name: "Withdrawal Report",
          link: AuthenticatedRoutes.WITHDRAWAL_REPORT,
        },
      ],
    },
    {
      id: "Fund",
      icon: <FaRegMoneyBill1 />,
      name: "Fund",
      options: [
        // {
        //   id: "Fund Request",
        //   name: "Fund Request",
        //   link: AuthenticatedRoutes.FUND_REQUEST,
        // },
        // {
        //   id: "Fund Transfer",
        //   name: "Fund Transfer",
        //   link: AuthenticatedRoutes.FUND_TRANSFER,
        // },
        {
          id: "Loan Request Form",
          name: " Loan Request Form",
          link: AuthenticatedRoutes.LOAN_FORM,
        },
        {
          id: "Loan Request History",
          name: "Loan Request History",
          link: AuthenticatedRoutes.FUND_TRANSFER_HISTORY,
        },
        // {
        //   id: "Fund Recieve History",
        //   name: "Fund Receive History",
        //   link: AuthenticatedRoutes.FUND_RECEIVE_HISTORY,
        // },
      ],
    },
    {
      id: "Our Team",
      icon: <FaUsers />,
      name: "Our Team",
      link: AuthenticatedRoutes.TEAM_DIRECT,
    },
    {
      id: "OurPlan",
      icon: <MdOutlineAddCard />,
      name: "Our Plan",
      link: AuthenticatedRoutes.OUR_PLANS,
    },
    {
      id: "Support",
      icon: <BiSupport />,
      name: "Help & Support",
      options: [
        {
          id: "Support",
          name: "Contact-Us",
          link: AuthenticatedRoutes.CONTACT_US,
        },
        {
          id: "Support History",
          name: "Raise Ticket History",
          link: AuthenticatedRoutes.SUPPORT_RAISE_TICKET_HISTORY,
        },
        // {
        //   id: "Connect on Telegram",
        //   name: "Connect on Telegram",
        //   link: MainContent.telegram_link,
        //   external: true,
        // },
      ],
    },
    // {
    //   id: "Profile",
    //   icon: <FaUserTie />,
    //   name: "Account Setting",
    //   options: [
    //     {
    //       id: "Profile",
    //       name: "Profile",
    //       link: AuthenticatedRoutes.USER_PROFILE,
    //     },

    //   ],
    // },
  ],
  admin: [
    {
      id: "Dashboard",
      icon: <HiOutlineSquares2X2 />,
      name: "Dashboard",
      link: AuthenticatedRoutes.ADMIN_DASHBOARD,
    },
    {
      id: "All Users",
      icon: <FaUsers />,
      name: "All Users",
      link: AuthenticatedRoutes.ALL_USERS,
    },
    {
      id: "pendingUsers",
      icon: <FaUserTie />,
      name: "Plan Request",
      options: [
        {
          id: "Add Plans",
          name: "Add Plans",
          link: AuthenticatedRoutes.ADD_PLANS,
        },
        {
          id: "Our Plans",
          name: "Our Plans",
          link: AuthenticatedRoutes.OUR_PLANS_ADMIN,
        },
        // {
        //   id: "Approved Plan Request",
        //   name: "Approved Plan Request",
        //   link: AuthenticatedRoutes.APPROVED_USERS,
        // },
        {
          id: "Plan History",
          name: "Plan History",
          link: AuthenticatedRoutes.ALL_INCOME_HISTORY,
        },
      ],
    },
    {
      id: "Fund Request",
      icon: <FaRegMoneyBill1 />,
      name: "Fund Request",
      options: [
        {
          id: "All Investment History",
          name: "All Investment History",
          link: AuthenticatedRoutes.All_Investment_History,
        },
        {
          id: "Pending Fund Request",
          name: "Pending Fund Request",
          link: AuthenticatedRoutes.PENDING_FUND_REQUEST,
        },
        {
          id: "Approved Fund Request",
          name: "Approved Fund Request",
          link: AuthenticatedRoutes.APPROVED_FUND_REQUEST,
        },
        {
          id: "Rejected Fund Request",
          name: "Rejected Fund Request",
          link: AuthenticatedRoutes.REJECTED_FUND_REQUEST,
        },
      ],
    },
    {
      id: "Withdrawal Request",
      icon: <History />,
      name: "Withdrawal Request",
      options: [
        {
          id: "All Withdrawal History",
          name: "All Withdrawal History",
          link: AuthenticatedRoutes.ALL_WITHDRAWAL_HISTORY,
        },
        {
          id: "Pending Withdrawal Request",
          name: "Pending Withdrawal Request",
          link: AuthenticatedRoutes.PENDING_WITHDRAWAL_REQUEST,
        },
        {
          id: "Approved Withdrawal Request",
          name: "Approved Withdrawal Request",
          link: AuthenticatedRoutes.APPROVED_WITHDRAWAL_REQUEST,
        },
        {
          id: "Rejected Withdrawal Request",
          name: "Rejected Withdrawal Request",
          link: AuthenticatedRoutes.REJECTED_WITHDRAWAL_REQUEST,
        },
      ],
    },
    {
      id: "Loan",
      icon: <FaMoneyBillTransfer />,
      name: "Loan",
      options: [
        {
          id: "Loan Status",
          name: "Loan Status",
          link: AuthenticatedRoutes.LOAN_STATUS,
        },
        {
          id: "Update Loan Status",
          name: "Update Loan Status", 
          link: AuthenticatedRoutes.UPDATE_LOAN_STATUS,
        }
      ],
    },


    {
      id: "Support",
      icon: <BiSupport />,
      name: "Help & Support",
      options: [
        {
          id: "Support history",
          name: "Raise Ticket History",
          link: AuthenticatedRoutes.RAISE_TICKET_LIST,
        },
      ],
    },
  ],
};
