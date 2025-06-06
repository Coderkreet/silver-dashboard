import { useState } from 'react'
import { SwalError, SwalSuccess } from '../../../utils/custom-alert'
import { requestLoan } from '../../../api/user-api'

const LoanRequestForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    loanAmount: '',
    bankName: '',
    AccountNo: '',
    IFSCCode: '',
    branchName: '',
    dob: '',
    address: '',
    panCard: '',
    aadharCard: '',
    loanType: '',
    gender: '',
    mobile: '',
    addressProof: ''
  })
  

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prevState => ({
          ...prevState,
          addressProof: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await requestLoan(formData)
      if (response?.success) {
        SwalSuccess.fire({
          icon: 'success',
          title: 'Success!',
          text: response?.message || 'Loan request submitted successfully'
        })
        // Reset form after successful submission
        setFormData({
          loanAmount: '',
          bankName: '',
          AccountNo: '',
          IFSCCode: '',
          branchName: '',
          dob: '',
          address: '',
          panCard: '',
          aadharCard: '',
          loanType: '',
          gender: '',
          mobile: '',
          addressProof: ''
        })
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]')
        if (fileInput) {
          fileInput.value = ''
        }
      } else {
        SwalError.fire({
          icon: 'error',
          title: 'Error!',
          text: response?.message || 'Failed to submit loan request'
        })
      }
    } catch (error) {
      console.error('Error submitting loan request:', error)
      SwalError.fire({
        icon: 'error',
        title: 'Error',
        text: error?.response?.data?.message || 'Something went wrong!'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
              }}>Loan Request Form</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Loan Details */}
                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold" style={{ fontSize: '1.1rem', color: '#4a5568' }}>
                    Loan Amount
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
                      name="loanAmount"
                      value={formData.loanAmount}
                      onChange={handleChange}
                      required
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

                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold" style={{ fontSize: '1.1rem', color: '#4a5568' }}>
                    Loan Type
                  </label>
                  <select
                    className="form-select form-select-lg"
                    name="loanType"
                    value={formData.loanType}
                    onChange={handleChange}
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
                    <option value="">Select Loan Type</option>
                    <option value="personal">Personal Loan</option>
                    <option value="home">Home Loan</option>
                    <option value="car">Car Loan</option>
                    <option value="education">Education Loan</option>
                    <option value="business">Business Loan</option>
                  </select>
                </div>

                {/* Bank Details */}
                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold" style={{ fontSize: '1.1rem', color: '#4a5568' }}>
                    Bank Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
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
                </div>

                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold" style={{ fontSize: '1.1rem', color: '#4a5568' }}>
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="IFSCCode"
                    value={formData.IFSCCode}
                    onChange={handleChange}
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
                </div>

                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold" style={{ fontSize: '1.1rem', color: '#4a5568' }}>
                    Account Number
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="AccountNo"
                    value={formData.AccountNo}
                    onChange={handleChange}
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
                </div>

                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold" style={{ fontSize: '1.1rem', color: '#4a5568' }}>
                    Branch Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="branchName"
                    value={formData.branchName}
                    onChange={handleChange}
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
                </div>

                {/* Personal Information */}
                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold" style={{ fontSize: '1.1rem', color: '#4a5568' }}>
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
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
                </div>

                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold" style={{ fontSize: '1.1rem', color: '#4a5568' }}>
                    Gender
                  </label>
                  <select
                    className="form-select form-select-lg"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
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
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold" style={{ fontSize: '1.1rem', color: '#4a5568' }}>
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    className="form-control form-control-lg"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
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
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
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
                </div>

                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold" style={{ fontSize: '1.1rem', color: '#4a5568' }}>
                    PAN Card Number
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="panCard"
                    value={formData.panCard}
                    onChange={handleChange}
                    required
                    pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
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
                    Aadhar Card Number
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="aadharCard"
                    value={formData.aadharCard}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{12}"
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

                <div className="col-12 mb-4">
                  <label className="form-label fw-semibold" style={{ fontSize: '1.1rem', color: '#4a5568' }}>
                    Address Proof (Image)
                  </label>
                  <input
                    type="file"
                    className="form-control form-control-lg"
                    accept="image/*"
                    onChange={handleImageChange}
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
                  {formData.addressProof && (
                    <div className="mt-3">
                      <img 
                        src={formData.addressProof} 
                        alt="Address Proof Preview" 
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
                </div>

                <div className="col-12 text-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-lg px-5"
                    disabled={isSubmitting}
                    style={{
                      background: isSubmitting 
                        ? 'linear-gradient(135deg, #a5b4fc 0%, #a78bfa 100%)'
                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      borderRadius: '15px',
                      color: 'white',
                      fontSize: '1.2rem',
                      fontWeight: '600',
                      padding: '1rem 3rem',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      opacity: isSubmitting ? 0.7 : 1
                    }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoanRequestForm
