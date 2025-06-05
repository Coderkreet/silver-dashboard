import Header from "../../components/website/Header";
import "../../styles/website/UserMain.css";
import UserHome from "./UserHome";

const UserMain = () => {
  return (
    <>
      <div className="UserMain">
        <Header />
        <UserHome />
      </div>
    </>
  );
};

export default UserMain;
