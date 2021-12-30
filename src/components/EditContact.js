import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";

const EditContact = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, name, email, number } = location.state.contact;
  const [newEmail, setNewEmail] = useState(email);
  const [newName, setNewName] = useState(name);
  /** Adds new page field: number */
  const [newNumber, setNewNumber] = useState(number);
  const { updateContactHandler } = useContactsCrud();


  const update = (e) => {
    e.preventDefault();
    if (newName === "" || newEmail === "" || newNumber === "") {
      alert("ALl the fields are mandatory!");
      return;
    }
    updateContactHandler({ id, name: newName, email: newEmail, number: newNumber });
    setNewName("");
    setNewEmail("")
    setNewNumber("")
    navigate("/");
  };

  return (
    <div className="ui main">
      <h2>Edit Contact</h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Number</label>
          <input
            type="text"
            name="number"
            placeholder="Number"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <button className="ui button blue">Update</button>
      </form>
    </div>
  );
}

export default EditContact;
