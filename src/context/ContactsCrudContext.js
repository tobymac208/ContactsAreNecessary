import { createContext, useContext, useState } from "react";
import api from "../api/objects";
import { v4 as uuid } from "uuid";

const contactsCrudContext = createContext();

export function ContactsCrudContextProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [contact] = useState([]);
  const [text, setText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const sortByProperty = (property) => {  
    return (a,b) => {
       if(a[property] > b[property])  
          return 1;  
       else if(a[property] < b[property])  
          return -1;  
   
       return 0;  
    }
 }

  //RetrieveContacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    if (response.data) {
      setContacts(response.data.sort(sortByProperty("name")));
    }
  };

  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const searchHandler = (searchTerm) => {
    setText(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        console.log(contact);
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  // const ordered = Object.keys(contacts).sort().reduce(
  //   (obj, key) => {
  //     obj[key] = contacts[key];
  //     return obj;
  //   }
  // );

  const value = {
    contact,
    contacts,
    retrieveContacts,
    addContactHandler,
    removeContactHandler,
    updateContactHandler,
    searchHandler,
    text,
    searchResults
  }

  return (
    <contactsCrudContext.Provider value={value}>
      {children}
    </contactsCrudContext.Provider>
  )
}

export function useContactsCrud() {
  return useContext(contactsCrudContext)
}
