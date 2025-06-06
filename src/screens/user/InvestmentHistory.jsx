import React, { useEffect, useState } from 'react';
import PageLoader from '../../components/ui/PageLoader';
import { getInvestmentHistory } from '../../api/user-api';

const InvestmentHistory = () => {
  const [loading, setLoading] = useState(false);
  const [investments, setInvestments] = useState([]);

  const fetchInvestmentHistory = async () => {
    try {
      setLoading(true);
      const response = await getInvestmentHistory();
      if (response?.data) {
        setInvestments(response.data);
      }
    } catch (error) {
      console.error('Error fetching investment history:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestmentHistory();
  }, []);

  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };

  const dateTimeTemplate = (rowData) => {
    return new Date(rowData.createdAt).toLocaleString();
  };

  const bankDetailsTemplate = (rowData) => {
    return (
      <div>
        <div>Name: {rowData.bankdetails?.holderName}</div>
        <div>Bank: {rowData.bankdetails?.bankName}</div>
        <div>Account: {rowData.bankdetails?.accountNo}</div>
        <div>IFSC: {rowData.bankdetails?.ifscCode}</div>
      </div>
    );
  };

  const amountTemplate = (rowData) => {
    return (
      <div>
        <div>Amount: ₹{rowData.amount?.toLocaleString()}</div>
        <div>Transaction ID: {rowData.transactionId}</div>
      </div>
    );
  };

  const statusTemplate = (rowData) => {
    const statusColors = {
      'pending': 'bg-yellow-500',
      'approved': 'bg-green-500',
      'rejected': 'bg-red-500'
    };
    
    return (
      <span className={`badge ${statusColors[rowData.status] || 'bg-gray-500'} text-black px-3 py-1 rounded-full text-sm`}>
        {rowData.status?.toUpperCase()}
      </span>
    );
  };

  const paymentProofTemplate = (rowData) => {
    return (
      <div className="payment-proof">
        <a 
          href={rowData.paymentProof} 
          target="_blank" 
          rel="noopener noreferrer"
          className="view-proof-link"
        >
          View Proof
        </a>
      </div>
    );
  };

  return (
    <div className="investment-history-container">
      {loading && <PageLoader />}
      
      <div className="history-card">
        <h2>Investment History</h2>
        <div className="table-container">
          <table className="investment-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Bank Details</th>
                <th>Amount Details</th>
                <th>Status</th>
                <th>Payment Proof</th>
                <th>Created Date</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((investment, index) => (
                <tr key={investment._id}>
                  <td>{index + 1}</td>
                  <td>{bankDetailsTemplate(investment)}</td>
                  <td>{amountTemplate(investment)}</td>
                  <td>{statusTemplate(investment)}</td>
                  <td>{paymentProofTemplate(investment)}</td>
                  <td>{dateTimeTemplate(investment)}</td>
                </tr>
              ))}
              {investments.length === 0 && (
                <tr>
                  <td colSpan="6" className="no-data">No investment history found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .investment-history-container {
          padding: 2rem;
          min-height: 100vh;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
        }

        .history-card {
          max-width: 80vw;
          margin: 0 auto;
          padding: 2.5rem;
          background: rgba(255, 255, 255, 0.23);
          border-radius: 20px;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(4px);
        }

        h2 {
          color: #2c3e50;
          text-align: center;
          margin-bottom: 2rem;
          font-size: 2.5rem;
          font-weight: 700;
        }

        .table-container {
          overflow-x: auto;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 15px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .investment-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 1.1rem;
        }

        .investment-table th,
        .investment-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .investment-table th {
          background: rgba(52, 152, 219, 0.1);
          color: #2c3e50;
          font-weight: 600;
          white-space: nowrap;
        }

        .investment-table tr:hover {
          background: rgba(52, 152, 219, 0.05);
        }

        .badge {
          display: inline-block;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
        }

        .payment-proof {
          text-align: center;
        }

        .view-proof-link {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: #3498db;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .view-proof-link:hover {
          background: #2980b9;
          transform: translateY(-2px);
        }

        .no-data {
          text-align: center;
          padding: 2rem;
          color: #7f8c8d;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .history-card {
            padding: 1rem;
          }

          .investment-table {
            font-size: 0.9rem;
          }

          .investment-table th,
          .investment-table td {
            padding: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default InvestmentHistory;
