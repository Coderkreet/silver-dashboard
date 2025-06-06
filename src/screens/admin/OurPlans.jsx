import { useEffect, useState } from 'react'
import { GetPlans } from '../../api/admin-api'
import { SwalError } from '../../utils/custom-alert'
import PageLoader from '../../components/ui/PageLoader'

const OurPlansAdmin = () => {
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchPlans = async () => {
        try {
            setLoading(true)
            const response = await GetPlans()
            console.log('API Response:', response) // Debug log
           
                setPlans(response?.data?.data || [])
                console.log('Plans set to:', response?.data) // Debug log
            
        } catch (error) {
            console.error('Error fetching plans:', error)
            SwalError.fire({
                icon: 'error',
                title: 'Error',
                text: error?.response?.data?.message || 'Failed to fetch plans'
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPlans()
    }, [])

    const dateTimeTemplate = (date) => {
        return new Date(date).toLocaleString()
    }

    console.log('Current plans state:', plans) // Debug log

    return (
        <div className="container mt-4">
            {loading && <PageLoader />}
            
            {plans.length === 0 ? (
                <div className="text-center">
                    <h3>No plans available</h3>
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {plans.map((plan) => (
                        <div key={plan._id} className="col">
                            <div className="card h-100" style={{
                                backdropFilter: 'blur(20px)',
                                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                                border: '1px solid rgba(255, 255, 255, 0.5)',
                                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
                                borderRadius: '30px',
                                transition: 'all 0.3s ease',
                                padding: '1.5rem',
                                minHeight: '400px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}>
                                <div className="card-header text-center" style={{
                                    background: 'rgba(255, 255, 255, 0.3)',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
                                    borderRadius: '25px 25px 0 0',
                                    padding: '1.5rem',
                                    marginBottom: '1rem'
                                }}>
                                    <h3 className="card-title mb-0" style={{
                                        color: '#2d3748',
                                        fontWeight: '800',
                                        textShadow: '0 2px 4px rgba(0,0,0,0.15)',
                                        fontSize: '2rem',
                                        letterSpacing: '0.5px'
                                    }}>
                                        {plan.name}
                                    </h3>
                                </div>
                                <div className="card-body d-flex flex-column justify-content-between" style={{ padding: '2rem' }}>
                                    <div>
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <span className="fw-bold" style={{ fontSize: '1.4rem', color: '#4a5568' }}>Amount:</span>
                                            <span className="badge bg-primary" style={{
                                                fontSize: '1.3rem',
                                                padding: '0.8rem 1.5rem',
                                                borderRadius: '15px',
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                                fontWeight: '600'
                                            }}>
                                                ₹ {plan.amount}
                                            </span>
                                        </div>
                                        <div className="mb-4">
                                            <h6 className="fw-bold mb-3 text-center" style={{ fontSize: '1.3rem', color: '#4a5568' }}>Description</h6>
                                            <p className="card-text text-center" style={{ 
                                                fontSize: '1.1rem',
                                                lineHeight: '1.8',
                                                color: 'rgba(45, 55, 72, 0.9)',
                                                padding: '0 1rem'
                                            }}>{plan.description}</p>
                                        </div>
                                    </div>
                                    <div className="text-center" style={{ 
                                        fontSize: '1rem',
                                        padding: '1rem',
                                        background: 'rgba(255, 255, 255, 0.3)',
                                        borderRadius: '15px',
                                        marginTop: '1rem'
                                    }}>
                                        <small style={{ color: '#718096' }}>Created: {dateTimeTemplate(plan.createdAt)}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default OurPlansAdmin
