import PropTypes from 'prop-types';
import css from './Form.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, getContacts } from 'redux/slice';
import { nanoid } from 'nanoid';



function Form({onSubmit}) {
   const [name, setName] = useState('');
   const [number, setNumber] = useState('');

   const contacts = useSelector(getContacts);
   const dispatch = useDispatch();

  const handleName = e => {
    setName(e.target.value);
  };

  const handleNumber = e => {
    setNumber(e.target.value);
  };



  const handleSubmit = e => {
    e.preventDefault();
    const newElement = { id: nanoid(), name, number };
    contacts.some(contact => contact.name === name)
    ? alert(`${name} is already in contacts`)
    : dispatch(addContact(newElement));
    onSubmit(newElement);
    reset();
  };


  const reset = () => {
    setName('');
    setNumber('');
  };



   return (
    <form className={css.form} onSubmit={handleSubmit}>
    <label>
      <span className={css.field}>Name</span>
      <input
        onChange={handleName}
        type="text"
        name="name"
        value={name}
//        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
    </label>
    <label>
      <span className={css.field1}>Number</span>
      <input
        onChange={handleNumber}
        type="tel"
        name="number"
        value={number}
//        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
    </label>
    <button className={css.button} type="submit">
      Add contact
    </button>
  </form>
   )
}

Form.propTypes = { 
  onSubmit: PropTypes.func.isRequired, 

 };

 export default Form;



  
