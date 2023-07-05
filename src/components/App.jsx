import ContactsList from './ContactsList/ContactsList';
import Filter from './FilterByName/Filter';
import Message from './Message/Message';
import Header from './Header/Header';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/slice';
import css from './App.module.css';

function App() {
  const contacts = useSelector(getContacts);

  return (
    <div className={css.Container}>
      <Header />
      <Filter />
        {contacts.length > 0 ? <ContactsList /> : <Message text="Contact list is empty." />}
    </div>
  );
}

export default App;
