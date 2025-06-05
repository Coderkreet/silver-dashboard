import { useState } from "react";
import { Button5 } from "../../components/ui/Buttons";
import TextInput from "../../components/ui/TextInput";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";
import PageLoader from "../../components/ui/PageLoader";
import {
  raiseWithdrawalRequest,
  sendWithdrawalOtp,
} from "../../api/payment-api";
import { useSelector } from "react-redux";
import OTPPopup_v1 from "../../components/ui/OTPPopup_v1";

const Withdrawal = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const userInfo = useSelector((state) => state.userInfo.userInfo);

  const MIN_WITHDRAWAL_AMOUNT = 50;

  const handleOtpSent = async () => {
    try {
      setLoading(true);
      await sendWithdrawalOtp();
      SwalSuccess.fire({
        title: "Success",
        text: "OTP sent successfully",
        confirmButtonText: "OK",
        timer: 2000,
      });
      setTimeout(() => {
        setIsOpen(true);
      }, 2000);
    } catch (error) {
      console.error("Error during OTP verification:", error);
      SwalError.fire({
        title: "Error",
        text:
          error?.response?.data?.message ||
          "Error during OTP verification, please try again.",
        confirmButtonText: "OK",
        timer: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawal = async (otp) => {
    if (amount < MIN_WITHDRAWAL_AMOUNT) {
      return SwalError.fire({
        title: "Error",
        text: `Amount must be at least $${MIN_WITHDRAWAL_AMOUNT}`,
        confirmButtonText: "OK",
        timer: 4000,
      });
    }

    try {
      setLoading(true);
      const response = await raiseWithdrawalRequest({ amount, otp });
      setIsOpen(false);

      SwalSuccess.fire({
        title: "Success",
        text: response?.message,
        confirmButtonText: "OK",
        timer: 4000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error sending withdrawal request:", error);

      SwalError.fire({
        title: "Error",
        text:
          error?.response?.data?.message || "Error sending withdrawal request",
        confirmButtonText: "OK",
        timer: 4000,
      });
      setIsOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawClick = () => {
    if (amount < MIN_WITHDRAWAL_AMOUNT) {
      return SwalError.fire({
        title: "Error",
        text: `Amount must be at least $${MIN_WITHDRAWAL_AMOUNT}`,
        confirmButtonText: "OK",
        timer: 4000,
      });
    } else if (amount > userInfo?.user?.currentIncome) {
      return SwalError.fire({
        title: "Error",
        text: `Amount must be less than your wallet balance`,
        confirmButtonText: "OK",
        timer: 4000,
      });
    } else {
      handleOtpSent();
    }
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="Withdrawal">
        <div className="ss-card half martop">
          <div className="top">
            <h5 className="heading">
              Main Wallet : ${userInfo?.user?.currentIncome?.toFixed(2)}
            </h5>
          </div>
          <div className="input-container">
            <TextInput
              onChange={(e) => setAmount(e.target.value)}
              placeholder={"Enter Amount"}
              labelName="Amount"
              value={amount}
            />
          </div>
          <div className="btns">
            <Button5 onClick={handleWithdrawClick} name={"Withdraw"} />
          </div>
        </div>
      </div>

      <OTPPopup_v1
        show={modalIsOpen}
        verifiedOtp={handleWithdrawal}
        handleClose={() => setIsOpen(false)}
        contactValue={userInfo?.user?.email}
      />
    </>
  );
};

export default Withdrawal;
