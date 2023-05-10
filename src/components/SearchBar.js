import React from 'react';
import ButtonWithIcon from './ButtonWithIcon';
import { FaSearch, FaRedoAlt } from 'react-icons/fa';

const SearchBar = ({ placeholder }) => {
  return (
    <div className="flex items-center">
      <input
        type="text"
        name="email"
        id="products-search"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full h-7 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        placeholder={placeholder}
      />
      <div className="flex pl-2 space-x-1">
        <ButtonWithIcon
          buttonName="Search"
          icon={FaSearch}
          color=""
          disabled={false}
        />
        <ButtonWithIcon
          buttonName="Clear"
          icon={FaRedoAlt}
          color=""
          disabled={false}
        />
      </div>
    </div>
  );
};

export default SearchBar;
