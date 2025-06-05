import React, { useState } from 'react'
import { AddPlans } from '../../api/admin-api'

const AddPlansForm = () => {

  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    description: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    await AddPlans(formData)
  }

  // ...existing code...
  return (                      
    <div className="container mt-4" style={{ minHeight: '100vh' }}>
      <div className="row justify-content-center">
        <div className="col-md-8"> {/* Increased from col-md-6 to col-md-8 */}
          <div className="card" style={{
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            borderRadius: '20px'
          }}>
            <div className="card-header" style={{
              background: 'rgba(255, 255, 255, 0.2)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '20px 20px 0 0'
            }}>
              <h3 className="text-center mb-0" style={{
                color: '#2d3748',
                fontWeight: '700',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                fontSize: '2.2rem' // Larger heading
              }}>Add New Plan</h3>
            </div>
            <div className="card-body p-5"> {/* Increased padding */}
              <form onSubmit={handleSubmit}>
                {/* Plan Name Field */}
                <div className="mb-5">
                  <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: '1.3rem' }}>
                    Plan Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter plan name"
                    required
                    style={{
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      background: 'rgba(255, 255, 255, 0.5)',
                      backdropFilter: 'blur(5px)',
                      transition: 'all 0.3s ease',
                      fontSize: '1.3rem', // Larger font
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                      padding: '1rem'
                    }}
                  />
                </div>

                {/* Amount Field */}
                <div className="mb-5">
                  <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: '1.3rem' }}>
                    Amount
                  </label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text" 
                          style={{
                            borderRadius: '12px 0 0 12px',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            background: 'rgba(255, 255, 255, 0.5)',
                            backdropFilter: 'blur(5px)',
                            fontSize: '1.3rem', // Larger font
                            color: '#2d3748',
                            fontWeight: '600',
                            padding: '1rem 1.5rem'
                          }}>
                      $
                    </span>
                    <input
                      type="number"
                      className="form-control"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="0.00"
                      required
                      style={{
                        borderRadius: '0 12px 12px 0',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        background: 'rgba(255, 255, 255, 0.5)',
                        backdropFilter: 'blur(5px)',
                        transition: 'all 0.3s ease',
                        fontSize: '1.3rem', // Larger font
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                        padding: '1rem'
                      }}
                    />
                  </div>
                </div>

                {/* Description Field */}
                <div className="mb-5">
                  <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: '1.3rem' }}>
                    Description
                  </label>
                  <textarea
                    className="form-control form-control-lg"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Enter plan description..."
                    required
                    style={{
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      background: 'rgba(255, 255, 255, 0.5)',
                      backdropFilter: 'blur(5px)',
                      transition: 'all 0.3s ease',
                      fontSize: '1.3rem', // Larger font
                      resize: 'vertical',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                      padding: '1rem'
                    }}
                  />
                </div>

                {/* Submit Button */}
                <div className="d-grid gap-2 mt-4">
                  <button 
                    type="submit"
                    className="btn btn-lg fw-semibold"
                    style={{
                      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)',
                      border: 'none',
                      borderRadius: '12px',
                      color: 'white',
                      padding: '1rem 2.5rem',
                      fontSize: '1.3rem', // Larger font
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                      backdropFilter: 'blur(5px)'
                    }}
                  >
                    Submit Plan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
// ...existing code...
}

export default AddPlansForm
