import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, getFilter, getContacts } from 'redux/reducer';
import SingleContact from "components/SingleContact/SingleContact";
import css from './ContactsList.module.css';

function ContactsList() {
  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);

  const dispatch = useDispatch();

  const deleteSelectedContact = contactId => dispatch(deleteContact(contactId));

  const filtredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const filteredContactList = filtredContacts();

  return (
    <ul className={css.list}>
      {filteredContactList.map(({ id, name, number }) => {
        return (
          <li className={css.contact} key={id}>
            <SingleContact
              name={name}
              number={number}
              onDeleteContact={() => deleteSelectedContact(id)}
              contactId={id}
            />
          </li>
        );
      })}
    </ul>
  );
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func,
};

export default ContactsList;