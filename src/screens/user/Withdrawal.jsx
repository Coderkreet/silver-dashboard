import { useState } from "react";
import { Button5 } from "../../components/ui/Buttons";
import TextInput from "../../components/ui/TextInput";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";
import PageLoader from "../../components/ui/PageLoader";
// import { raiseWithdrawalRequest } from "../../api/payment-api";
import { useSelector } from "react-redux";
import { raiseWithdrawalRequest } from "../../api/user-api";

const Withdrawal = () => {
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const [formData, setFormData] = useState({
    amount: "",
    bankDetails: {
      accountHolder: "",
      accountNumber: "",
      ifscCode: "",
      bankName: "",
      upiId: ""
    }
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("bank.")) {
      const bankField = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        bankDetails: {
          ...prev.bankDetails,
          [bankField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.amount > userInfo?.user?.currentIncome) {
      return SwalError.fire({
        title: "Error",
        text: "Amount must be less than your wallet balance",
        confirmButtonText: "OK",
        timer: 4000,
      });
    }

    try {
      setLoading(true);
      const withdrawalData = {
        userId: userInfo?.user?._id,
        amount: Number(formData.amount),
        status: "pending",
        transactionId: null,
        bankDetails: formData.bankDetails,
        requestedAt: new Date().toISOString(),
        processedAt: null,
        reason: null
      };

      const response = await raiseWithdrawalRequest(withdrawalData);
      
      SwalSuccess.fire({
        title: "Success",
        text: response?.message || "Withdrawal request submitted successfully",
        confirmButtonText: "OK",
        timer: 4000,
      });

      // Reset form
      setFormData({
        amount: "",
        bankDetails: {
          accountHolder: "",
          accountNumber: "",
          ifscCode: "",
          bankName: "",
          upiId: ""
        }
      });

    } catch (error) {
      console.error("Error sending withdrawal request:", error);
      SwalError.fire({
        title: "Error",
        text: error?.response?.data?.message || "Error sending withdrawal request",
        confirmButtonText: "OK",
        timer: 4000,
      });
    } finally {
      setLoading(false);
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
          
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <TextInput
                onChange={handleChange}
                placeholder="Enter Amount"
                labelName="Amount"
                name="amount"
                value={formData.amount}
                type="number"
                required
              />

              <TextInput
                onChange={handleChange}
                placeholder="Enter Account Holder Name"
                labelName="Account Holder Name"
                name="bank.accountHolder"
                value={formData.bankDetails.accountHolder}
                required
              />

              <TextInput
                onChange={handleChange}
                placeholder="Enter Account Number"
                labelName="Account Number"
                name="bank.accountNumber"
                value={formData.bankDetails.accountNumber}
                required
              />

              <TextInput
                onChange={handleChange}
                placeholder="Enter IFSC Code"
                labelName="IFSC Code"
                name="bank.ifscCode"
                value={formData.bankDetails.ifscCode}
                required
              />

              <TextInput
                onChange={handleChange}
                placeholder="Enter Bank Name"
                labelName="Bank Name"
                name="bank.bankName"
                value={formData.bankDetails.bankName}
                required
              />

              <TextInput
                onChange={handleChange}
                placeholder="Enter UPI ID"
                labelName="UPI ID"
                name="bank.upiId"
                value={formData.bankDetails.upiId}
                required
              />
            </div>

            <div className="btns">
              <Button5 type="submit" name="Withdraw" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Withdrawal;
