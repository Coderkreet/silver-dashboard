import React, { useState } from 'react';
// import { createInvestment } from '../../api/payment-api';
import { SwalError, SwalSuccess } from '../../utils/custom-alert';
import PageLoader from '../../components/ui/PageLoader';
import { createInvestment } from '../../api/user-api';

const InvestmentForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    bankdetails: {
      holderName: '',
      bankName: '',
      accountNo: '',
      ifscCode: ''
    },
    transactionId: '',
    paymentProof: null
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (formData.amount < 1000 || formData.amount > 100000) {
      newErrors.amount = 'Amount must be between ₹1,000 and ₹1,00,000';
    }
    
    if (!formData.bankdetails.holderName) {
      newErrors.holderName = 'Account holder name is required';
    }
    
    if (!formData.bankdetails.bankName) {
      newErrors.bankName = 'Bank name is required';
    }
    
    if (!formData.bankdetails.accountNo) {
      newErrors.accountNo = 'Account number is required';
    } else if (!/^\d{9,18}$/.test(formData.bankdetails.accountNo)) {
      newErrors.accountNo = 'Account number must be 9-18 digits';
    }
    
    if (!formData.bankdetails.ifscCode) {
      newErrors.ifscCode = 'IFSC code is required';
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.bankdetails.ifscCode)) {
      newErrors.ifscCode = 'Invalid IFSC code format';
    }
    
    if (!formData.transactionId) {
      newErrors.transactionId = 'Transaction ID is required';
    }
    
    if (!formData.paymentProof) {
      newErrors.paymentProof = 'Payment proof is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('bankdetails.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        bankdetails: {
          ...prev.bankdetails,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      // Convert image to Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          paymentProof: reader.result // This will be the Base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const submitData = {
        ...formData,
        status: 'pending',
        paymentProof: formData.paymentProof
      };

      const response = await createInvestment(submitData);
      
      if (response?.message == "Investment request submitted successfully") {
        await SwalSuccess.fire({
          icon: 'success',
          title: 'Investment Submitted',
          text: 'Your investment request has been submitted successfully',
          confirmButtonText: 'OK'
        });
        
        // Reset form after successful submission
        setFormData({
          amount: '',
          bankdetails: {
            holderName: '',
            bankName: '',
            accountNo: '',
            ifscCode: ''
          },
          transactionId: '',
          paymentProof: null
        });
        setErrors({});
      } else {
        throw new Error(response?.message || 'Failed to submit investment');
      }
    } catch (error) {
      console.error('Investment submission error:', error);
      await SwalError.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: error?.response?.data?.message || 'Failed to submit investment. Please try again.',
        confirmButtonText: 'Try Again'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4" style={{ minHeight: '100vh' }}>
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
              <h2 className="mb-0" style={{
                color: '#2d3748',
                fontWeight: '800',
                textShadow: '0 2px 4px rgba(0,0,0,0.15)',
                fontSize: '2.2rem'
              }}>Investment Form</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Investment Amount */}
                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold" style={{ fontSize: '1.1rem', color: '#4a5568' }}>
                    Investment Amount
                  </label>
                  <div className="input-group">
                    <span className="input-group-text" style={{
                      borderRadius: '15px 0 0 15px',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      background: 'rgba(255, 255, 255, 0.5)',
                      backdropFilter: 'blur(5px)',
                      fontSize: '1.1rem'
                    }}>₹</span>
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      required
                      min="1000"
                      max="100000"
                      placeholder="Enter amount between ₹1000 - ₹100000"
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
                  {errors.amount && (
                    <div className="text-danger mt-2" style={{ fontSize: '0.9rem' }}>{errors.amount}</div>
                  )}
                </div>

                {/* Transaction ID */}
                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold" style={{ fontSize: '1.1rem', color: '#4a5568' }}>
                    Transaction ID
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleChange}
                    required
                    placeholder="Enter your transaction ID"
                    style={{
                      borderRadius: '15px',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      background: 'rgba(255, 255, 255, 0.5)',
                      backdropFilter: 'blur(5px)',
                      fontSize: '1.1rem',
                      padding: '0.8rem 1rem'
                    }}
                  />
                  {errors.transactionId && (
                    <div className="text-danger mt-2" style={{ fontSize: '0.9rem' }}>{errors.transactionId}</div>
                  )}
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
                    name="bankdetails.holderName"
                    value={formData.bankdetails.holderName}
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
                  {errors.holderName && (
                    <div className="text-danger mt-2" style={{ fontSize: '0.9rem' }}>{errors.holderName}</div>
                  )}
                </div>

                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold" style={{ fontSize: '1.1rem', color: '#4a5568' }}>
                    Bank Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="bankdetails.bankName"
                    value={formData.bankdetails.bankName}
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
                  {errors.bankName && (
                    <div className="text-danger mt-2" style={{ fontSize: '0.9rem' }}>{errors.bankName}</div>
                  )}
                </div>

                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold" style={{ fontSize: '1.1rem', color: '#4a5568' }}>
                    Account Number
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="bankdetails.accountNo"
                    value={formData.bankdetails.accountNo}
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
                  {errors.accountNo && (
                    <div className="text-danger mt-2" style={{ fontSize: '0.9rem' }}>{errors.accountNo}</div>
                  )}
                </div>

                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold" style={{ fontSize: '1.1rem', color: '#4a5568' }}>
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="bankdetails.ifscCode"
                    value={formData.bankdetails.ifscCode}
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
                  {errors.ifscCode && (
                    <div className="text-danger mt-2" style={{ fontSize: '0.9rem' }}>{errors.ifscCode}</div>
                  )}
                </div>

                {/* Payment Proof */}
                <div className="col-12 mb-4">
                  <label className="form-label fw-semibold" style={{ fontSize: '1.1rem', color: '#4a5568' }}>
                    Payment Proof
                  </label>
                  <input
                    type="file"
                    className="form-control form-control-lg"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    style={{
                      borderRadius: '15px',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      background: 'rgba(255, 255, 255, 0.5)',
                      backdropFilter: 'blur(5px)',
                      fontSize: '1.1rem',
                      padding: '0.8rem 1rem'
                    }}
                  />
                  {formData.paymentProof && (
                    <div className="mt-3">
                      <img 
                        src={formData.paymentProof} 
                        alt="Payment Proof Preview" 
                        style={{ 
                          maxWidth: '200px', 
                          maxHeight: '200px', 
                          borderRadius: '10px',
                          border: '1px solid rgba(255, 255, 255, 0.5)',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }} 
                      />
                    </div>
                  )}
                  {errors.paymentProof && (
                    <div className="text-danger mt-2" style={{ fontSize: '0.9rem' }}>{errors.paymentProof}</div>
                  )}
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
                    {loading ? 'Submitting...' : 'Submit Investment'}
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

export default InvestmentForm;
