import React from 'react';

const ButtonWithIcon = ({ buttonName, icon: Icon, color, disabled }) => {
  return (
    <button
      className={`flex flex-row items-center justify-center p-2 ${
        disabled
          ? 'text-gray-500 cursor-not-allowed'
          : 'text-blue-700 hover:bg-gray-100'
      } rounded-lg cursor-pointer  dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
      disabled
    >
      <Icon className="mr-1" />
      {buttonName}
    </button>
  );
};

export default ButtonWithIcon;
