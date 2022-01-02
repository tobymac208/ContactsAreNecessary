import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";
import Delete from "./Delete";
import Footer from "./Footer";
import { useState } from "react";
import Todo from "./Todo";
import { ContactsCrudContextProvider } from "../context/ContactsCrudContext";

function App() {
  return (
    <div className="ui container">
      <Router>
        <Header />
        <Todo />
        <ContactsCrudContextProvider>
          <Routes>
            <Route
              path="/"
              exact
              element={<ContactList />}
            />
            <Route
              path="/add"
              element={<AddContact />}
            />

            <Route
              path="/edit"
              element={<EditContact />}
            />

            <Route
              path="/delete"
              element={<Delete />}
            />

            <Route path="/contact/:id" element={<ContactDetail />} />
          </Routes>
        </ContactsCrudContextProvider>
        <Footer />
      </Router >
    </div >
  );
}

export default App;
