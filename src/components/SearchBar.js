import React from 'react';
import ButtonWithIcon from './ButtonWithIcon';
import { FaSearch, FaRedoAlt } from 'react-icons/fa';

const SearchBar = ({
  placeholder,
  searchText,
  setSearchText,
  search,
  clearSearch,
}) => {
  return (
    <div className="flex items-center">
      <input
        type="text"
        name="email"
        id="products-search"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block h-7 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder={placeholder}
      />
      <div className="flex pl-2 space-x-1">
        <ButtonWithIcon
          buttonName="Search"
          icon={FaSearch}
          color=""
          disabled={false}
          action={search}
        />
        <ButtonWithIcon
          buttonName="Clear"
          icon={FaRedoAlt}
          color=""
          disabled={false}
          action={clearSearch}
        />
      </div>
    </div>
  );
};

export default SearchBar;
