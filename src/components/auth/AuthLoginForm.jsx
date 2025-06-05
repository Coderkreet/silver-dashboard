/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import { Button2 } from "../ui/Buttons";
import TextInput from "../ui/TextInput";
import { useState } from "react";
import { AuthenticatedRoutes, AuthRoutes } from "../../constants/Routes";
import PageLoader from "../ui/PageLoader";
import { emailValidator, passwordValidator } from "../../utils/inputValidator";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";
import { loginWithEmailApi } from "../../api/auth-api";
import TextInputPassword from "../ui/TextInputPassword";
import ForgotPassword from "../ui/ForgotPassword";
import { resetPasswordApi, sendOtpValidateEmail } from "../../api/user-api";

const AuthLoginForm = () => {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(AuthenticatedRoutes.USER_DASHBOARD);
    window.location.reload();
  };

  const validate = () => {
    let formErrors = {};
    let isValid = true;

    const emailError = emailValidator(payload.email);
    if (emailError) {
      formErrors.email = emailError;
      isValid = false;
    }

    const passwordError = passwordValidator(payload.password);
    if (passwordError) {
      formErrors.password = passwordError;
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    if (loading) return;
    setLoading(true);

    try {
      const response = await loginWithEmailApi({
        email: payload.email,
        password: payload.password,
      });

      SwalSuccess.fire({
        icon: "success",
        title: "Login Success",
        text: "You have logged in successfully",
      });
      localStorage.setItem("token", response.token);
      localStorage.setItem("role", "User");
      localStorage.setItem("sponsorId", response.data.sponsorId);

      setTimeout(() => {
        handleNavigate();
      }, 2000);
    } catch (error) {
      console.log(error);
      SwalError.fire({
        icon: "error",
        title: "Login Failed",
        text: error?.response?.data.message || error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  return (
    <>
      {loading && <PageLoader />}
      {showForgotPassword && <ForgotPassword apiFuncOtp={sendOtpValidateEmail} apiFuncReset={resetPasswordApi} show={showForgotPassword} handleClose={() => setShowForgotPassword(false)} />}
      <div className="AuthLoginForm content">
        <h5 className="main-heading" data-aos="fade-up">
          Welcome Back
        </h5>
        <p data-aos="fade-up">
          Today is a new day. It's your day. You shape it. Sign in to start
          managing your projects.
        </p>

        <div data-aos="fade-up" className="input-container">
          <TextInput
            onChange={(e) => setPayload({ ...payload, email: e.target.value })}
            value={payload?.email}
            placeholder={"Example@gmail.com"}
            labelName="Email"
            error={errors.email}
          />
          <TextInputPassword
            value={payload?.password}
            onChange={(e) =>
              setPayload({ ...payload, password: e.target.value })
            }
            placeholder={"Enter Password"}
            labelName="Password"
            error={errors.password}
          />
          <button style={{margin: "0 auto", fontSize: "1.4rem", color: "var(--primary-color)"}} onClick={handleForgotPassword} className="forgot-password-btn">Forgot Password</button>
        </div>

        <div data-aos="fade-up" className="btns">
          <Button2 onClick={handleSubmit} name={"Sign In"} disabled={loading} />
        </div>

        <span data-aos="fade-up" className="accontTggle">
          Don't you have an account?{" "}
          <Link to={AuthRoutes.REGISTER}>Sign up</Link>
        </span>
      </div>
    </>
  );
};

export default AuthLoginForm;
