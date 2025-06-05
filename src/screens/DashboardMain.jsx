/* eslint-disable react/prop-types */
import Sidebar from "../components/ui/Sidebar";
import "../styles/DashboardMain.css";
import DashboardHeader from "../components/ui/DashboardHeader";
const DashboardMain = ({ inner, name }) => {
  return (
    <>
      <div className="DashboardMain">
        <Sidebar />
        <div className="right-wrapper">
          <DashboardHeader name={name} />
          {inner}
        </div>
      </div>
    </>
  );
};

export default DashboardMain;
