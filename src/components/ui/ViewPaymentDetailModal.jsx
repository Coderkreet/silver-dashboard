/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";
import { Button2 } from "./Buttons";

const ViewTicketDetail = ({ show, onHide, data }) => {
  return (
    <>
      <div className="ViewTicketDetail">
        <Modal
          show={show}
          onHide={onHide}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          scrollable
          className="PaymentAcceptModal-modal"
        >
          <Modal.Body>
            <div className="inner">
              <div className="top-container">
                <h5 className="title">Complain Details</h5>
              </div>
              <div className="inner-wrapper">
                <div className="msg">
                  <h5>Subject:</h5>
                  <p className="para">{data?.subject}</p>
                </div>
                <div className="msg">
                  <h5>Message:</h5>
                  <p className="para">{data?.message}</p>
                </div>
              </div>
              <div className="btns">
                <Button2 name={"Close"} onClick={onHide} />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default ViewTicketDetail;
