import { useSelector, useDispatch } from 'react-redux';
import { changeFilter, getFilter } from 'redux/reducer';
import css from './Filter.module.css';

function Filter() {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const changeFieldFilter = e => dispatch(changeFilter(e.currentTarget.value));

  return (
    <div>
    <h2 className={css.contacts}>Contacts</h2>
  <label>
    <p>Find contacts by name</p>
      <input type="text" value={filter} onChange={changeFieldFilter} />
      </label>
      </div>
    );
}

export default Filter;