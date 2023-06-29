import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Form from './Form/Form';
import ContactsList from './ContactsList/ContactsList';
import Filter from './FilterByName/Filter';
import Message from './Message/Message';
import Modal from './Modal/Modal';
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    parsedContacts ? setContacts(parsedContacts) : setContacts([]);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const newContact = { id: nanoid(), name, number };
    contacts.some(contact => contact.name === name)
      ? alert(`${name} is already in contacts`)
      : setContacts(prevContacts => [newContact, ...prevContacts]);
    toggleModal();
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId),
    );
  };

  const changeFilter = e => setFilter(e.currentTarget.value);

  const filtredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <div className={css.container}>
        <h1>Phonebook</h1>
        <button className={css.openButton} type="button" onClick={toggleModal}>Add contact 📲</button>
        {showModal &&
  <Modal onClose={toggleModal}>
  <div className={css.header}>
    <h2 className={css.add}>Add contact</h2>
    <button  className={css.closeButton} type="button" onClick={toggleModal}>Close</button>
    </div>
    <Form onSubmit={ addContact } />
  </Modal>}
  <h2 className={css.subtitle}>Contacts</h2>
      <Filter filter={filter} changeFilter={changeFilter} />
      {contacts.length > 0 ? (
        <ContactsList
          contacts={filtredContacts()}
          onDeleteContact={deleteContact}
        />
      ) : (
        <Message text="Contact list is empty." />
      )}
    </div>
  );
};
