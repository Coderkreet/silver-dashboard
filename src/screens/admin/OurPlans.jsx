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
                                transition: 'transform 0.3s ease',
                                padding: '1.5rem',
                                minHeight: '400px'
                            }}>
                                <div className="card-header" style={{
                                    background: 'rgba(255, 255, 255, 0.3)',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
                                    borderRadius: '25px 25px 0 0',
                                    padding: '1.5rem'
                                }}>
                                    <h3 className="card-title text-center mb-0" style={{
                                        color: '#2d3748',
                                        fontWeight: '800',
                                        textShadow: '0 2px 4px rgba(0,0,0,0.15)',
                                        fontSize: '2rem'
                                    }}>
                                        {plan.name}
                                    </h3>
                                </div>
                                <div className="card-body" style={{ padding: '2rem' }}>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <span className="fw-bold" style={{ fontSize: '1.4rem' }}>Amount:</span>
                                        <span className="badge bg-primary" style={{
                                            fontSize: '1.3rem',
                                            padding: '0.8rem 1.5rem',
                                            borderRadius: '15px',
                                            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                                        }}>
                                            ₹ {plan.amount}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <h6 className="fw-bold mb-3" style={{ fontSize: '1.3rem' }}>Description:</h6>
                                        <p className="card-text" style={{ 
                                            fontSize: '1.1rem',
                                            lineHeight: '1.6',
                                            color: 'rgba(45, 55, 72, 0.9)'
                                        }}>{plan.description}</p>
                                    </div>
                                    <div className="text-muted" style={{ 
                                        fontSize: '1rem',
                                        padding: '1rem',
                                        background: 'rgba(255, 255, 255, 0.3)',
                                        borderRadius: '15px',
                                        marginTop: '1rem'
                                    }}>
                                        <small>Created: {dateTimeTemplate(plan.createdAt)}</small>
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
