import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { getLoanStatus, updateLoanStatus } from '../../api/admin-api';
import { Modal, Form, Button } from "react-bootstrap";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";

const UpdateLoan = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [formData, setFormData] = useState({
    loanAmount: '',
    status: '',
    interestRate: ''
  });
  

  const fetchLoanStatus = async () => {
    try {
      setLoading(true);
      const response = await getLoanStatus();
      setData(response?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoanStatus();
  }, []);

  const handleApprove = (rowData) => {
    setSelectedLoan(rowData);
    setFormData({
      loanAmount: rowData.loanAmount,
      status: 'approved',
      interestRate: ''
    });
    setShowModal(true);
  };

  const handleReject = (rowData) => {
    setSelectedLoan(rowData);
    setFormData({
      loanAmount: rowData.loanAmount,
      status: 'rejected',
      interestRate: ''
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const jsonData = {
        loanAmount: Number(formData.loanAmount),
        status: formData.status,
        interestRate: Number(formData.interestRate)
      };

      const response = await updateLoanStatus(selectedLoan._id, jsonData);
      
      if (response) {
        SwalSuccess.fire({
          title: "Success",
          text: "Loan status updated successfully",
        });
        setShowModal(false);
        fetchLoanStatus();
      }
    } catch (error) {
      console.error(error);
      SwalError.fire({
        title: "Error",
        text: error?.response?.data?.message || "Error updating loan status",
      });
    } finally {
      setLoading(false);
    }
  };

  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };

  const dateTimeTemplate = (rowData) => {
    return new Date(rowData.requestedAt).toLocaleString();
  };

  const userTemplate = (rowData) => {
    return (
      <div>
        <div>Name: {rowData.user?.name}</div>
        <div>Email: {rowData.user?.email}</div>
        <div>Mobile: {rowData.mobile}</div>
      </div>
    );
  };

  const bankDetailsTemplate = (rowData) => {
    return (
      <div>
        <div>Bank: {rowData.bankName}</div>
        <div>Account: {rowData.AccountNo}</div>
        <div>IFSC: {rowData.IFSCCode}</div>
        <div>Branch: {rowData.branchName}</div>
      </div>
    );
  };

  const loanDetailsTemplate = (rowData) => {
    return (
      <div>
        <div>Amount: ₹{rowData.loanAmount}</div>
        <div>Type: {rowData.loanType}</div>
        <div>Commission: {rowData.commissionPercentage}%</div>
      </div>
    );
  };

  const personalDetailsTemplate = (rowData) => {
    return (
      <div>
        <div>Gender: {rowData.gender}</div>
        <div>DOB: {new Date(rowData.dob).toLocaleDateString()}</div>
        <div>PAN: {rowData.panCard}</div>
        <div>Aadhar: {rowData.aadharCard}</div>
      </div>
    );
  };

  const statusTemplate = (rowData) => {
    return (
      <span className={`badge ${rowData.status === 'pending' ? 'bg-warning' : rowData.status === 'approved' ? 'bg-success' : 'bg-danger'}`}>
        {rowData.status.toUpperCase()}
      </span>
    );
  };

  const addressTemplate = (rowData) => {
    return (
      <div>
        <div>{rowData.address}</div>
        <a href={rowData.addressProof} target="_blank" rel="noopener noreferrer" className="text-primary">
          View Proof
        </a>
      </div>
    );
  };

  const actionTemplate = (rowData) => {
    return (
      <div className="action-buttons">
        <Button Loan Status

          variant="success"
          size="sm"
          className="me-2"
          onClick={() => handleApprove(rowData)}
          disabled={rowData.status !== 'pending'}
        >
          Approve
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleReject(rowData)}
          disabled={rowData.status !== 'pending'}
        >
          Reject
        </Button>
      </div>
    );
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="UpdateLoan martop">
        <div className="dataTable ss-card martop">
          <DataTable
            value={data}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            emptyMessage="No loan requests found."
            className="p-datatable-sm"
            showGridlines
            stripedRows
          >
            <Column body={serialNumberTemplate} header="S.No" style={{ width: '5%' }} />
            <Column body={userTemplate} header="User Details" style={{ width: '15%' }} />
            <Column body={bankDetailsTemplate} header="Bank Details" style={{ width: '15%' }} />
            <Column body={loanDetailsTemplate} header="Loan Details" style={{ width: '15%' }} />
            <Column body={personalDetailsTemplate} header="Personal Details" style={{ width: '15%' }} />
            <Column body={addressTemplate} header="Address Details" style={{ width: '15%' }} />
            <Column body={statusTemplate} header="Status" style={{ width: '10%' }} />
            <Column body={dateTimeTemplate} header="Requested Date" style={{ width: '10%' }} />
            <Column body={actionTemplate} header="Actions" style={{ width: '10%' }} />
          </DataTable>
        </div>
      </div>

      <Modal show={showModal} className="rounded-5" onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title style={{ fontSize: '1.8rem' }}>Update Loan Status</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '1.5rem', color: '#000000' }}>Loan Amount</Form.Label>
              <Form.Control
                type="number"
                value={formData.loanAmount}
                onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                className="custom-input"
                style={{ fontSize: '1.5rem' }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '1.5rem', color: '#000000' }}>Status</Form.Label>
              <Form.Control
                type="text"
                value={formData.status}
                disabled
                className="custom-input disabled"
                style={{ fontSize: '1.5rem' }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: '1.5rem', color: '#000000' }}>Interest Rate (%)</Form.Label>
              <Form.Control
                type="number"
                value={formData.interestRate}
                onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                placeholder="Enter interest rate"
                className="custom-input"
                style={{ fontSize: '1.5rem' }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="modal-footer-custom">
          <Button variant="secondary" onClick={() => setShowModal(false)} className="cancel-btn" style={{ fontSize: '1.5rem' }}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} className="save-btn" style={{ fontSize: '1.5rem' }}>
            Save Changes
          </Button>
        </Modal.Footer>

        <style>{`
          .modal-header-custom,
          .modal-footer-custom {
            background: rgba(0, 123, 255, 0.05);
            border: none;
            backdrop-filter: blur(8px);
          }

          .modal-header-custom .modal-title {
            color: #0d6efd;
            font-weight: 600;
            font-size: 1.8rem;
          }

          .modal-body-custom {
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(12px);
            border-radius: 0 0 12px 12px;
          }

          .custom-input {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(0, 123, 255, 0.2);
            border-radius: 10px;
            padding: 14px 16px;
            color: #2c3e50;
            transition: all 0.3s ease;
            font-size: 1.5rem;
          }

          .custom-input::placeholder {
            color: rgba(44, 62, 80, 0.5);
            font-size: 1.5rem;
          }

          .custom-input:focus {
            outline: none;
            border-color: #0d6efd;
            box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.1);
          }

          .custom-input.disabled {
            background: rgba(255, 255, 255, 0.05);
            color: #6c757d;
          }

          .cancel-btn,
          .save-btn {
            border: none;
            border-radius: 8px;
            padding: 12px 24px;
            font-weight: 500;
            transition: background 0.3s ease;
            font-size: 1.5rem;
          }

          .cancel-btn {
            background-color: rgba(108, 117, 125, 0.15);
            color: #2c3e50;
          }

          .cancel-btn:hover {
            background-color: rgba(108, 117, 125, 0.25);
          }

          .save-btn {
            background-color: rgba(13, 110, 253, 0.3);
            color: white;
          }

          .save-btn:hover {
            background-color: rgba(13, 110, 253, 0.5);
          }
        `}</style>
      </Modal>

    </>
  );
};

export default UpdateLoan;
