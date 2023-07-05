import React, { useState } from 'react';
import styles from '../SearchBar/SearchBar.module.css';

const SearchBar = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = event => {
    setSearchText(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    handleSearch(searchText);
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles['SearchForm-button']}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="#007BFF"
          >
            <path d="M15.3 14.88l5.74 5.74a1 1 0 0 1-1.42 1.42l-5.74-5.74a8 8 0 1 1 1.42-1.42zM9 16a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />
          </svg>
        </button>

        <input
          className={styles['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchText}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

export default SearchBar;
