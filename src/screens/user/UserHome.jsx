/* eslint-disable react/no-unescaped-entities */
import "../../styles/user/UserHome.css";
import SSDataTable from "../../components/SSDataTable";
import { Button5 } from "../../components/ui/Buttons";
import Achievement from "../../components/ui/Achievement";
import { useEffect, useState } from "react";
import cardImg from "../../assets/cardImg.png";
import { useNavigate } from "react-router-dom";
import { AuthenticatedRoutes } from "../../constants/Routes";
import PaymentAcceptModal from "../../components/ui/PaymentAcceptModal";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../utils/dateFunctions";
import OverallUserCustomPlan from "./OverallUserCustomPlan";
import SsSpinWheel from "../../components/ui/SsSpinWheel";
import { FaRegCopy } from "react-icons/fa6";
import OfferFeaturesPopup from "../../components/ui/OfferFeaturesPopup";
import { setUserInfo } from "../../redux/slice/UserInfoSlice";
import { getUserDetails } from "../../api/user-api";

const UserHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo?.userInfo);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [copiedText1, setCopiedText1] = useState(false);
  const location = window.location.origin;
  const [showFeatureModal, setShowFeatureModal] = useState(true);
  const sponsorId = localStorage.getItem("sponsorId");

  const referCode = `${location}/register?referral=${sponsorId}`;



  console.log(userInfo)

  // const [loading, setLoading] = useState(false);

  const userData = {
    user_id: userInfo?.data?.sponsorId,
    // subscription: "Premium",
    date_of_activation: formatDate(userInfo?.data?.createdAt) || "NA",
    status: userInfo?.data?.hasActivePlan ? "Active" : "Inactive",
  };

  const handleCopy = (text, setCopiedState) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedState(true);
        setTimeout(() => setCopiedState(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const featureModalHandler = () => {
    setShowFeatureModal(false);
    localStorage.setItem("showFeatureModal", false);
  };

  useEffect(() => {
    if (localStorage.getItem("showFeatureModal") === "false") {
      setShowFeatureModal(false);
    } else {
      setShowFeatureModal(true);
    }
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserDetails({});
        dispatch(setUserInfo(data));
      } catch (e) {
        // Optionally handle error
      }
    };
    fetchUserInfo();
  }, [dispatch]);

  // console.log(userInfo)

  return (
    <>
      
      <div className="UserHome">
        <div className="top-wrapper martop">
          <div className="ss-card welcome-card">
            <div className="top">
              <h5 className="heading">
                Welcome{" "}
                <span className="text-capitalize">
                  {userInfo?.name || "User"}
                </span>
                !
              </h5>
            </div>
            <p className="para1">We're happy to have you on board.</p>
            <div className="content">
              <div className="c-left">
                <span className="para1 bold">Ready to get started?</span>
                <p className="para1">Check out your dashboard to begin!</p>
                <div className="btn-box">
                  <Button5
                    onClick={() => {
                      navigate(AuthenticatedRoutes.OUR_PLANS);
                    }}
                    name={"Buy Plan"}
                  />
                </div>
              </div>
              <div className="c-right">
                <img src={cardImg} alt="gift icon" className="gift-icon" />
              </div>
            </div>
          </div>
        </div>

        <div className="income-wrapper mar-top">
          <div className="income-card ss-card">
            <div className="left">
              <h5>Total Income</h5>
              <p>${userInfo?.totalIncome?.toFixed(2) || "0"}</p>
            </div>
            <div className="right">
              <img
                src={"https://img.icons8.com/3d-fluency/94/coin-wallet.png"}
                alt=""
              />
            </div>
          </div>
          <div className="income-card ss-card">
            <div className="left">
              <h5>Wallet Balance</h5>
              <p>${userInfo?.user?.currentIncome?.toFixed(2) || "0"}</p>
            </div>
            <div className="right">
              <img
                src={"https://img.icons8.com/3d-fluency/94/coin-wallet.png"}
                alt=""
              />
            </div>
          </div>
          <div className="income-card ss-card">
            <div className="left">
              <h5>Total Investment</h5>
              <p>${userInfo?.user?.investment?.toFixed(2) || "0"}</p>
            </div>
            <div className="right">
              <img
                src={"https://img.icons8.com/3d-fluency/94/coin-wallet.png"}
                alt=""
              />
            </div>
          </div>
          {/* <div className="income-card ss-card">
            <div className="left">
              <h5>Self Income</h5>
              <p>${userInfo?.totalSelfIncome?.toFixed(2) || "0"}</p>
            </div>
            <div className="right">
              <img
                src={"https://img.icons8.com/3d-fluency/94/coin-wallet.png"}
                alt=""
              />
            </div>
          </div> */}
         
          {/* <div className="income-card ss-card">
            <div className="left">
              <h5>Direct Income</h5>
              <p>${userInfo?.spinIncome?.toFixed(2) || "0"}</p>
            </div>
            <div className="right">
              <img
                src="https://img.icons8.com/3d-fluency/94/synchronize.png"
                alt=""
              />
            </div>
          </div> */}
          {/* <div className="income-card ss-card">
            <div className="left">
              <h5>Referral Income</h5>
              <p>${userInfo?.totalReferralIncome?.toFixed(2) || "0"}</p>
            </div>
            <div className="right">
              <img
                src={"https://img.icons8.com/3d-fluency/94/expensive-price.png"}
                alt=""
              />
            </div>
          </div> */}
          {/* <div className="income-card ss-card">
            <div className="left">
              <h5>ROI Income</h5>
              <p>${userInfo?.totalRoyaltyIncome?.toFixed(2) || "0"}</p>
            </div>
            <div className="right">
              <img
                src={
                  "https://img.icons8.com/3d-fluency/94/business-management.png"
                }
                alt=""
              />
            </div>
          </div> */}
          {/* <div className="income-card ss-card">
            <div className="left">
              <h5>Level Income</h5>
              <p>${userInfo?.totalLevelIncome?.toFixed(2) || "0"}</p>
            </div>
            <div className="right">
              <img
                src={"https://img.icons8.com/isometric/50/no-connection.png"}
                alt=""
              />
            </div>
          </div> */}
          {/* <div className="income-card ss-card">
            <div className="left">
              <h5>Matching Income</h5>
              <p>${userInfo?.maxPayout?.toFixed(2) || "0"}</p>
            </div>
            <div className="right">
              <img
                src={"https://img.icons8.com/isometric/50/no-connection.png"}
                alt=""
              />
            </div>
          </div> */}
         
          <div className="income-card ss-card">
            <div className="left">
              <h5>Referral Member</h5>
              <p>{userInfo?.totalActiveUserLength || "0"}</p>
            </div>
            <div className="right">
              <img
                src={"https://img.icons8.com/isometric/50/user.png"}
                alt=""
              />
            </div>
          </div>
          {/* <div className="income-card ss-card">
            <div className="left">
              <h5>BB TOKEN</h5>
              <p>${userInfo?.teamInvestment?.toFixed(2) || "0"}</p>
            </div>
            <div className="right">
              <img
                src={"https://img.icons8.com/3d-fluency/94/expensive-price.png"}
                alt=""
              />
            </div>
          </div> */}
        </div>
        {/* <Achievement value={userInfo?.user?.levelType || 0} directUser= {userInfo?.user?.partners?.filter(partner => partner?.isActive)?.length || 0} totalUser= {userInfo?.totalActiveUserLength} /> */}

        {/* details */}
        <div className="detail-wrapper">
          <div className="left ss-card">
            <div className="head">
              <h5 className="cardHeading">About Me</h5>
              <div className="detail-table">
                <table>
                  <tbody>
                    {userData &&
                      Object.entries(userData)?.map(([key, value]) => (
                        <tr key={`detail-${key}`}>
                          <td>{key?.replaceAll("_", " ")}</td>
                          <td>{value}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="ss-card copy-code-wrapper martop">
              <p>Your Refer Code</p>
              <div className="code">
                <span className="codebox">{referCode}</span>
                <button onClick={() => handleCopy(referCode, setCopiedText1)}>
                  {copiedText1 ? "Copied!" : <FaRegCopy />}
                </button>
              </div>
            </div>
          </div>
          {/* {userInfo?.user?.levelType > 2 && ( */}
          {/* <div className="right wheel-card ss-card">
            <SsSpinWheel />
          </div> */}
          {/* )} */}
        </div>
        <div className="ss-card  mar-top">
          <div className="head">
            <h5 className="cardHeading">Direct Referral History</h5>
          </div>
          <SSDataTable data={userInfo?.data} />
        </div>
        <PaymentAcceptModal
          show={showPaymentModal}
          onHide={() => setShowPaymentModal(false)}
        />
        <div className="ss-card mar-top">
          <OverallUserCustomPlan />
        </div>
      </div>
    </>
  );
};

export default UserHome;
