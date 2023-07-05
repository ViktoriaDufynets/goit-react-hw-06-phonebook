import { useState } from 'react';
import Modal from 'components/Modal/Modal';
import Form from 'components/Form/Form';
import css from './Header.module.css';

function Header() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(prevShowModal => !prevShowModal);

  return (
    <>
      <h1>Phonebook</h1>
      <button className={css.openButton}type="button" onClick={toggleModal}>Add contact 📲</button>
      {showModal && (
        <Modal onClose={toggleModal}>
        <div className={css.header}>
    <h3 className={css.add}>Add contact</h3>
    <button  className={css.closeButton} type="button" onClick={toggleModal}>Close</button>
    </div>
          <Form onSubmit={toggleModal} />
        </Modal>
      )}
    </>
  );
}

export default Header;