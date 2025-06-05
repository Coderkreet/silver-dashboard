/* eslint-disable react/prop-types */
import sideImg from "../../assets/auth/sideImg.png";
import authBg from "../../assets/auth/authBg.png";
import "../../styles/auth/AuthMain.css";

/* eslint-disable react/no-unescaped-entities */
const AuthMain = ({ inner }) => {
  return (
    <>
      <div
        data-aos="fade-right"
        className="AuthMain"
        style={{ backgroundImage: `url(${authBg})` }}
      >
        <div className="auth-inner">
          <div className="container-box">
            {inner}
            <div data-aos="fade-left" className="side-img">
              <img src={sideImg} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthMain;
