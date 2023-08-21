import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Section } from './Section/Section';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { addContact, deleteContact, updateFilter } from '../redux/contactsSlice';
import { nanoid } from '@reduxjs/toolkit';

export const App = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const [duplicateContactMessage, setDuplicateContactMessage] = useState('');
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

 const filteredContacts = contacts.filter(contact =>
  contact.name && contact.name.toLowerCase().includes(filter.toLowerCase())
);


  const addContactHandler = ({ name, number }) => {
    const existingContact = contacts.find(contact => contact.name && contact.name.toLowerCase() === name.toLowerCase());

    if (existingContact) {
      setDuplicateContactMessage(`${name} is already in contacts`);
      return;
    }

    dispatch(addContact({ id: nanoid(), name, number }));
    setDuplicateContactMessage(''); 
  };

  const filterChangeHandler = e => {
    dispatch(updateFilter(e.target.value));
  };

  const onDelete = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContactHandler} />
        {duplicateContactMessage && alert(`${duplicateContactMessage}`)}
      </Section>

      <Section title="Contacts">
        <Filter filter={filter} handleChange={filterChangeHandler} />
        <ContactList contacts={filteredContacts} onDelete={onDelete} />
      </Section>
    </>
  );
};
