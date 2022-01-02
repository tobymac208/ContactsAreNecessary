import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";

const Delete = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, name, email, number } = location.state.contact;
  const { removeContactHandler } = useContactsCrud();

  const removeContact = () => {
    // removes contact from database by id
    removeContactHandler(id);
    goHome();
  };

  const goHome = () => {
      navigate('/');
  }

  return (
    <div className="main">
      <h2>Are you sure?</h2>
      <div className="ui card centered">
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">Email: {email}</div>
          <div className="description">Phone #: {number}</div>
        </div>
      </div>
      <div className="ui menu center">
          <button className="ui button blue" onClick={() => removeContact(id)}>Yes</button>
          <button className="ui button red" onClick={goHome}>No</button>
      </div>
    </div>
  );
};

export default Delete;
