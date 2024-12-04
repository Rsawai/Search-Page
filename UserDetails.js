import React from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import ProfilePhoto from "./ProfileFetchDetails.png";

export const UserDetails = (props) => {
  console.log(props.selectedRowData.first_name, "data");
  return (
    <Modal
      {...props.props}
      show={props.show}
      size="md"
      data-testid="modal-container"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="detailsContainer"
      backdrop="static"
      onHide={props.onHide}
      style={{ zIndex: 999999 }}
    >
      <div className="delete_modal_popup">
        <Modal.Header style={{ border: "none" }}>
          <div className="modal_header_section">
            <div>
              <h2 className="modal_header_panel_text">Fetch Details</h2>
              <span
                style={{
                  color: "gray",
                  fontSize: "0.9em",
                  marginTop: ".0.2rem",
                }}
              >
                Here are the details of following employee
              </span>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="flex_container_custom">
            <div className="modal_text_wrapper">
              <div>
                <span>Name</span>:
                <span className="ms-1">
                  {props?.selectedRowData?.first_name}{" "}
                  {props?.selectedRowData?.last_name}
                </span>
              </div>
              <div>
                <span>Location</span>:
                <span className="ms-1">{props?.selectedRowData?.city} </span>
              </div>
              <div>
                <span>Contact Number</span>:
                <span className="ms-1">
                  {props?.selectedRowData?.contact_number}{" "}
                </span>
              </div>

              <div className="mt-2">
                <span>Profile Image</span>:
                <span className="ms-1">
                  <img src={ProfilePhoto} alt="Profile" className="mt-2" />
                </span>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer style={{ border: "none" }}>
          <div className="modal_footer_section">
            <button
              className="modal_footer_cancel_button"
              onClick={props.onHide}
            >
              Close
            </button>
          </div>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

UserDetails.propTypes = {
  /**
   * Props to be passed to the underlying Modal component.
   */
  props: PropTypes.object.isRequired,

  /**
   * Flag to control the visibility of the modal.
   */
  show: PropTypes.bool.isRequired,

  /**
   * Function to be called when the modal is hidden.
   */
  onHide: PropTypes.func.isRequired,

  /**
   * Function to be called when the button is clicked.
   */
  FetchData: PropTypes.func.isRequired,

  /**
   * Data related to the selected row to be deleted.
   */
  selectedRowData: PropTypes.any.isRequired,
};
