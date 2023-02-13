import React from 'react';
import debounce from 'lodash.debounce';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearch } from '../../redux/slices/searchSlice';
import styles from './Search.module.scss';

export const Search = () => {
  const [value, setValue] = React.useState('');

  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.search.search);
  const inputRef = useRef();

  const onClickClear = () => {
    setValue('');
    dispatch(setSearch(''));
    inputRef.current.focus();
    //**********  inputRef.current.focus() при очистке остаемся в инпуте
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearch(str));
    }, 500),
    [],
  );

  const onChangeInput = (event) => {
    console.log(searchValue);
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 32 32"
        id="Glyph"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
          id="XMLID_223_"
        />
      </svg>
      <input
        ref={inputRef}
        value={value} //Контроль инпута!!!!
        onChange={onChangeInput}
        // (event) => dispatch(setSearch(event.target.value))
        className={styles.input}
        placeholder="Search pizzas..."
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.clearId}
          enableBackground="new 0 0 512 512"
          height="512px"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 512 512"
          width="512px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M256,7C118.467,7,7,118.468,7,256.002C7,393.533,118.467,505,256,505s249-111.467,249-248.998  C505,118.468,393.533,7,256,7z M256,485.08c-126.31,0-229.08-102.771-229.08-229.078C26.92,129.692,129.69,26.92,256,26.92  c126.309,0,229.08,102.771,229.08,229.082C485.08,382.309,382.309,485.08,256,485.08z"
            fill="#425661"
          />
          <polygon
            fill="#425661"
            points="368.545,157.073 354.461,142.988 255.863,241.587 157.733,143.456 143.648,157.54 241.78,255.672   143.648,353.809 157.733,367.893 255.863,269.75 354.461,368.361 368.545,354.275 269.947,255.672 "
          />
        </svg>
      )}
    </div>
  );
};
