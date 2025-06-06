import { useEffect, useState } from 'react'
// import { GetPlansUser } from '../../api/admin-api'
import { SwalError } from '../../utils/custom-alert'
import PageLoader from '../../components/ui/PageLoader'
import { GetPlansUser } from '../../api/user-api'
import { useSelector } from 'react-redux'
import { placeOrder, verifyPayment } from '../../api/auth-api'
import Swal from 'sweetalert2'

const OurPlanUser = () => {
    const user = useSelector((state) => state.userInfo?.userInfo);
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchPlans = async () => {
        try {
            setLoading(true)
            const response = await GetPlansUser()
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

    const handlePayment = async (plan) => {
        setLoading(true);
        try {
            const orderPayload = {
                planId: plan._id
            };

            const orderData = await placeOrder(orderPayload);

            if (orderData?.data?.order?.id) {
                const options = {
                    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                    amount: orderData?.data?.amount * 100,
                    order_id: orderData?.data?.order?.id,
                    name: "Excellent Finserve",
                    description: "Complete your order",
                    handler: async function (response) {
                        try {
                            const paymentData = {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                userId: user.data._id,
                                paymentMethod: "Razorpay"
                            };
                            const verification = await verifyPayment(paymentData);
                            if (verification) {
                                Swal.fire("Payment Successful!", "Your order has been placed.", "success");
                            }
                        } catch (error) {
                            console.error("Payment verification error:", error);
                            Swal.fire({
                                icon: "error",
                                title: "Payment Verification Failed",
                                text: "There was an error verifying your payment. Please contact support.",
                            });
                        } finally {
                            setLoading(false);
                        }
                    },
                    prefill: {
                        name: user?.user?.name || "",
                        email: user?.user?.email || "",
                    },
                    theme: { color: "#3399cc" },
                };

                const razorpay = new window.Razorpay(options);
                razorpay.open();
            }
        } catch (error) {
            console.error("Payment error:", error);
            Swal.fire({
                icon: "error",
                title: "Payment Failed",
                text: "There was an error processing your payment. Please try again.",
            });
            setLoading(false);
        }
    };

    const showConfirmation = async (plan) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You are about to purchase the "${plan.name}" plan for ₹${plan.amount}.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Buy Plan",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await handlePayment(plan);
            }
        });
    };

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
                                minHeight: 'auto',
                                display: 'flex',
                                flexDirection: 'column'
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
                                        fontSize: '2.2rem'
                                    }}>
                                        {plan.name}
                                    </h3>
                                </div>
                                <div className="card-body d-flex flex-column justify-content-between" style={{ padding: '2rem' }}>
                                    <div>
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <span className="fw-bold" style={{ fontSize: '1.6rem' }}>Amount:</span>
                                            <span className="badge bg-primary" style={{
                                                fontSize: '1.5rem',
                                                padding: '0.8rem 1.5rem',
                                                borderRadius: '15px',
                                                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)',
                                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                                            }}>
                                                ₹ {plan.amount}
                                            </span>
                                        </div>
                                        <div className="mb-4">
                                            <h6 className="fw-bold mb-3" style={{ fontSize: '1.5rem' }}>Description:</h6>
                                            <p className="card-text" style={{ 
                                                fontSize: '1.3rem',
                                                lineHeight: '1.8',
                                                color: 'rgba(45, 55, 72, 0.9)'
                                            }}>{plan.description}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-muted mb-4" style={{ 
                                            fontSize: '1.1rem',
                                            padding: '1rem',
                                            background: 'rgba(255, 255, 255, 0.3)',
                                            borderRadius: '15px'
                                        }}>
                                            <small>Created: {dateTimeTemplate(plan.createdAt)}</small>
                                        </div>
                                        <div className="text-center">
                                            <button 
                                                onClick={() => showConfirmation(plan)}
                                                className="btn btn-primary" 
                                                style={{
                                                    padding: '1rem 2rem',
                                                    fontSize: '1.4rem',
                                                    fontWeight: '600',
                                                    borderRadius: '15px',
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    border: 'none',
                                                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                                    transition: 'all 0.3s ease',
                                                    width: '100%'
                                                }}
                                                onMouseOver={(e) => {
                                                    e.target.style.transform = 'translateY(-2px)';
                                                    e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
                                                }}
                                                onMouseOut={(e) => {
                                                    e.target.style.transform = 'translateY(0)';
                                                    e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                                                }}
                                            >
                                                Buy Now
                                            </button>
                                        </div>
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

export default OurPlanUser
