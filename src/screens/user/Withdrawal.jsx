import { useState } from "react";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";
import PageLoader from "../../components/ui/PageLoader";
import { useSelector } from "react-redux";
import { raiseWithdrawalRequest } from "../../api/user-api";
import { Wallet } from "lucide-react";

const Withdrawal = () => {
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const [formData, setFormData] = useState({
    wallet: "",
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
        reason: null,
        wallet: formData.wallet
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
        wallet: "",
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

  const walletOptions = [
    { value: "rupeeWallet", label: "Rupee Wallet" },
    { value: "eCoinWallet", label: "E-Coin Wallet" },
    { value: "investmentWallet", label: "Investment Wallet" }
  ];

  return (
    <div className="container mt-4" style={{ minHeight: '100vh' }}>
      {loading && <PageLoader />}
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card" style={{
            backdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
            borderRadius: '30px',
            padding: '2rem'
          }}>
            <div className="card-header text-center mb-4" style={{
              background: 'rgba(255, 255, 255, 0.3)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
              borderRadius: '25px',
              padding: '1.5rem'
            }}>
              <div className="d-flex align-items-center justify-content-center gap-3">
                <Wallet size={32} color="#2d3748" />
                <h2 className="mb-0" style={{
                  color: '#2d3748',
                  fontWeight: '800',
                  textShadow: '0 2px 4px rgba(0,0,0,0.15)',
                  fontSize: '2.2rem'
                }}>Withdrawal Form</h2>
              </div>
              <div className="mt-3" style={{ color: '#4a5568', fontSize: '1.2rem' }}>
                Available Balance: ${userInfo?.user?.currentIncome?.toFixed(2)}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Wallet Selection */}
                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold" style={{ fontSize: '1.1rem', color: '#4a5568' }}>
                    Select Wallet
                  </label>
                  <select
                    className="form-select form-select-lg"
                    value={formData.wallet}
                    onChange={(e) => setFormData(prev => ({ ...prev, wallet: e.target.value }))}
                    required
                    style={{
                      borderRadius: '15px',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      background: 'rgba(255, 255, 255, 0.5)',
                      backdropFilter: 'blur(5px)',
                      fontSize: '1.1rem',
                      padding: '0.8rem 1rem'
                    }}
                  >
                    <option value="">Select Wallet</option>
                    {walletOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Amount */}
                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold" style={{ fontSize: '1.1rem', color: '#4a5568' }}>
                    Withdrawal Amount
                  </label>
                  <div className="input-group">
                    <span className="input-group-text" style={{
                      borderRadius: '15px 0 0 15px',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      background: 'rgba(255, 255, 255, 0.5)',
                      backdropFilter: 'blur(5px)',
                      fontSize: '1.1rem'
                    }}>$</span>
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      required
                      placeholder="Enter amount"
                      style={{
                        borderRadius: '0 15px 15px 0',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        background: 'rgba(255, 255, 255, 0.5)',
                        backdropFilter: 'blur(5px)',
                        fontSize: '1.1rem',
                        padding: '0.8rem 1rem'
                      }}
                    />
                  </div>
                </div>

                {/* Bank Details Section */}
                <div className="col-12 mb-4">
                  <h3 className="mb-3" style={{ color: '#2d3748', fontWeight: '600' }}>Bank Details</h3>
                </div>

                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold" style={{ fontSize: '1.1rem', color: '#4a5568' }}>
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="bank.accountHolder"
                    value={formData.bankDetails.accountHolder}
                    onChange={handleChange}
                    required
                    placeholder="Enter account holder name"
                    style={{
                      borderRadius: '15px',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      background: 'rgba(255, 255, 255, 0.5)',
                      backdropFilter: 'blur(5px)',
                      fontSize: '1.1rem',
                      padding: '0.8rem 1rem'
                    }}
                  />
                </div>

                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold" style={{ fontSize: '1.1rem', color: '#4a5568' }}>
                    Account Number
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="bank.accountNumber"
                    value={formData.bankDetails.accountNumber}
                    onChange={handleChange}
                    required
                    placeholder="Enter account number"
                    style={{
                      borderRadius: '15px',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      background: 'rgba(255, 255, 255, 0.5)',
                      backdropFilter: 'blur(5px)',
                      fontSize: '1.1rem',
                      padding: '0.8rem 1rem'
                    }}
                  />
                </div>

                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold" style={{ fontSize: '1.1rem', color: '#4a5568' }}>
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="bank.ifscCode"
                    value={formData.bankDetails.ifscCode}
                    onChange={handleChange}
                    required
                    placeholder="Enter IFSC code"
                    style={{
                      borderRadius: '15px',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      background: 'rgba(255, 255, 255, 0.5)',
                      backdropFilter: 'blur(5px)',
                      fontSize: '1.1rem',
                      padding: '0.8rem 1rem'
                    }}
                  />
                </div>

                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold" style={{ fontSize: '1.1rem', color: '#4a5568' }}>
                    Bank Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="bank.bankName"
                    value={formData.bankDetails.bankName}
                    onChange={handleChange}
                    required
                    placeholder="Enter bank name"
                    style={{
                      borderRadius: '15px',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      background: 'rgba(255, 255, 255, 0.5)',
                      backdropFilter: 'blur(5px)',
                      fontSize: '1.1rem',
                      padding: '0.8rem 1rem'
                    }}
                  />
                </div>

                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold" style={{ fontSize: '1.1rem', color: '#4a5568' }}>
                    UPI ID
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="bank.upiId"
                    value={formData.bankDetails.upiId}
                    onChange={handleChange}
                    required
                    placeholder="Enter UPI ID"
                    style={{
                      borderRadius: '15px',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      background: 'rgba(255, 255, 255, 0.5)',
                      backdropFilter: 'blur(5px)',
                      fontSize: '1.1rem',
                      padding: '0.8rem 1rem'
                    }}
                  />
                </div>

                <div className="col-12 text-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-lg px-5"
                    disabled={loading}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      borderRadius: '15px',
                      color: 'white',
                      fontSize: '1.2rem',
                      fontWeight: '600',
                      padding: '1rem 3rem',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                      opacity: loading ? 0.7 : 1,
                      cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {loading ? 'Processing...' : 'Submit Withdrawal'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;
