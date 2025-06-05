import { useEffect, useState } from "react";
import { getAdminInfo, getUserInfo } from "../../api/auth-api";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../redux/slice/UserInfoSlice";
import { AuthenticatedRoutes } from "../../constants/Routes";
import { useLocation, useNavigate } from "react-router-dom";
import PageLoader from "./PageLoader";
import { SwalError } from "../../utils/custom-alert";
import { AiOutlineLogout } from "react-icons/ai";

/* eslint-disable react/prop-types */
const DashboardHeader = ({ name }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const adminPaymentInfo = useSelector(
    (state) => state.userInfo.AdminPaymentInfo
  );
  // console.log(location);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!userInfo && role !== "Admin") {
      const fetchUserInfo = async () => {
        try {
          setLoading(true);
          // const user = await getUserInfo();
          // // console.log(user);
          // dispatch(setUserInfo(user));
        } catch (error) {
          console.error("Error fetching user info:", error);
          SwalError.fire({
            title: "Error",
            text: error?.response?.data?.message || "Error fetching user info",
            confirmButtonText: "OK",
          });

          // setTimeout(() => {
          //   localStorage.clear();
          //   navigate(AuthenticatedRoutes.USER_HOME);
          //   window.location.reload();
          // }, 3000);
        } finally {
          setLoading(false);
        }
      };
      fetchUserInfo();
    } else if (!userInfo && role === "Admin") {
      const fetchUserInfo = async () => {
        try {
          // setLoading(true);
          // const user = await getAdminInfo();
          // dispatch(setUserInfo(user));
        } catch (error) {
          // console.error("Error fetching user info:", error);

          // SwalError.fire({
          //   title: "Error",
          //   text: error?.response?.data?.message || "Error fetching user info",
          //   confirmButtonText: "OK",
          // });

          // setTimeout(() => {
          //   localStorage.clear();
          //   navigate(AuthenticatedRoutes.USER_HOME);
          //   window.location.reload();
          // }, 3000);
        } finally {
          setLoading(false);
        }
      };
      fetchUserInfo();
    }
  }, [dispatch, userInfo, adminPaymentInfo, location, location.pathname]);
  const logoutHandler = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="DashboardHeader ss-card">
        <div className="pageName">{name}</div>
        <div className="right">
          <div
            onClick={() => navigate(AuthenticatedRoutes.USER_PROFILE)}
            className="user-login"
            style={{ cursor: "pointer" }}
          >
            <div className="img-card ss-card">
              <img
                src="https://img.icons8.com/3d-fluency/94/guest-male--v2.png"
                alt="user"
              />
            </div>
            <h5 className="name">Hii, {userInfo?.data?.name || "User"}</h5>
          </div>
          <button onClick={logoutHandler} className="logoutBTN">
            <AiOutlineLogout />
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
