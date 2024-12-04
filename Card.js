import React, { useState } from "react";
import Modal from "react-modal";
import "./Card.css";
import Location from "./location.svg";
import Phone from "./phone.svg";
import ProfilePhoto from "./profile.svg";
import { UserDetails } from "../UserDetails/UserDetails";

const UserCard = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState();

  const openModal = () => {
    console.log(user);
    setIsOpen(true);
    setData(user);
  };
  const closeModal = () => setIsOpen(false);

  return (
    <div className="card-container">
      <div className="card">
        <div>
          <img src={ProfilePhoto} alt="Profile" className="profile-image" />
        </div>
        <h3 className="userNameHeading">
          {user.first_name} {user.last_name}
        </h3>

        <div className="d-flex mb-3">
          <span className="mt-1 mx-2">
            <img src={Location} alt="location-icon" />
          </span>
          <span> {user.city}</span>
        </div>

        <div className="card-footer">
          <div>
            {" "}
            <p>
              <img src={Phone} alt="phone-icon" className="mx-1 mb-1" />
              <span>{user.contact_number}</span>
            </p>
            {/* Available on Phone now displayed below the phone number */}
            <p className="pre-Text">Available on Phone</p>
          </div>
          <div>
            <button className="fetch-button" onClick={openModal}>
              Fetch Details
            </button>
          </div>
        </div>
      </div>

      {isOpen === true && (
        <UserDetails
          show={isOpen}
          onHide={() => setIsOpen(false)}
          setIsOpen={setIsOpen}
          selectedRowData={data}
          popupTitle=""
        />
      )}
    </div>
  );
};

export default UserCard;
