/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button2 } from "../ui/Buttons";
import TextInput from "../ui/TextInput";
import { AuthenticatedRoutes, AuthRoutes } from "../../constants/Routes";
import {
  emailValidator,
  nameValidator,
  passwordValidator,
} from "../../utils/inputValidator";
import { SwalSuccess, SwalError } from "../../utils/custom-alert";
import PageLoader from "../ui/PageLoader";
import { registerWithEmailApi } from "../../api/auth-api"; // removed verifyRegisterOtp
import TextInputPassword from "../ui/TextInputPassword";
import OTPPopup_v1 from "../ui/OTPPopup_v1"; // Commented

const AuthRegisterForm = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const [modalIsOpen, setIsOpen] = useState(false); // Commented
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    // confirmPassword: "",
    referralCode: "",
  });

  useEffect(() => {
    setFormData({
      ...formData,
      referralCode: search?.split("=")[1] || "",
    });
  }, [search]);

  const [errors, setErrors] = useState({});

  const handleChange = (e, field) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleNavigate = () => {
    // navigate(AuthRoutes.LOGIN);
  };

  const validate = () => {
    const validationErrors = {};
    let isValid = true;

    const nameError = nameValidator(formData.name);
    const emailError = emailValidator(formData.email);
    const passwordError = passwordValidator(formData.password);
    const confirmPasswordError =
      formData.password !== formData.confirmPassword
        ? "Passwords do not match"
        : "";
    // Removed referralCodeError and its validation

    if (nameError) {
      validationErrors.name = nameError;
      isValid = false;
    }
    if (emailError) {
      validationErrors.email = emailError;
      isValid = false;
    }
    if (passwordError) {
      validationErrors.password = passwordError;
      isValid = false;
    }
    if (confirmPasswordError) {
      validationErrors.confirmPassword = confirmPasswordError;
      isValid = false;
    }
    // Removed referralCodeError check

    setErrors(validationErrors);
    return isValid;
  };

  const handleRegisterClick = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await registerWithEmailApi(formData);
      SwalSuccess.fire({
        icon: "success",
        title: "Registration Successful",
        text: response?.message || "You have registered successfully!",
      });

      localStorage.setItem("sponsorId", response.sponsorId);
      localStorage.setItem("role", "User");

      // Open OTP popup instead of navigating immediately
      setIsOpen(true);
    } catch (error) {
      console.log(error);
      SwalError.fire({
        icon: "error",
        title: "Registration Failed",
        text: error?.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = () => {
    setIsOpen(false);
    SwalSuccess.fire({
      icon: "success",
      title: "OTP Verified",
      text: "Your OTP has been verified successfully!",
    });
    // Redirect to login page after OTP verification
    navigate(AuthRoutes.LOGIN);
  };

  return (
    <>
      {loading && <PageLoader />}

      <div className="AuthRegisterForm content">
        <h5 className="main-heading" data-aos="fade-up">
          Register
        </h5>
        <div data-aos="fade-up" className="input-form">
          <div className="input-container">
            <TextInput
              value={formData.referralCode}
              onChange={(e) => handleChange(e, "referralCode")}
              placeholder="XAR7T12"
              labelName="Referral Code"
              error={errors.referralCode}
            />
            <TextInput
              value={formData.name}
              onChange={(e) => handleChange(e, "name")}
              placeholder="John Doe"
              labelName="Name"
              error={errors.name}
            />
            <TextInput
              value={formData.email}
              onChange={(e) => handleChange(e, "email")}
              placeholder="example@gmail.com"
              labelName="Email Address"
              error={errors.email}
            />
            <TextInputPassword
              value={formData.password}
              onChange={(e) => handleChange(e, "password")}
              placeholder="Enter Password"
              labelName="Password"
              error={errors.password}
            />
            <TextInputPassword
              value={formData.confirmPassword}
              onChange={(e) => handleChange(e, "confirmPassword")}
              placeholder="Confirm Password"
              labelName="Confirm Password"
              error={errors.confirmPassword}
            />
            {search?.split("=")[1] && (
              <TextInput
                value={search?.split("=")[1]}
                placeholder="Refer Code"
                labelName="Referral Code"
                disabled={"disabled"}
              />
            )}
          </div>

          <div className="btns">
            <Button2
              name={"Sign Up"}
              onClick={handleRegisterClick}
              disabled={loading}
            />
          </div>
        </div>

        OTP Popup Disabled
        <OTPPopup_v1
          loader={loading}
          show={modalIsOpen}
          verifiedOtp={handleOtpVerification}
          handleClose={() => setIsOpen(false)}
          contactValue={formData.email}
        />

        <span className="accontTggle">
          Already have an account? <Link to={AuthRoutes.LOGIN}>Sign In</Link>
        </span>
      </div>
    </>
  );
};

export default AuthRegisterForm;
