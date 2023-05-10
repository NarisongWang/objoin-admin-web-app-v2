import React from 'react';

const InstallationOrderItem = () => {
  return (
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id="checkbox-194556"
            aria-describedby="checkbox-1"
            type="radio"
            className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </td>
      <td className="p-4 w-32 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
        <div className="text-base font-semibold text-gray-900 dark:text-white">
          S2212069
        </div>
        <div className="text-sm font-normal bg-gray-500 px-1 rounded-md text-white dark:text-gray-400">
          Waitting for Setup
        </div>
      </td>
      <td className="p-4 hidden sm:table-cell">
        Wilson Homes Tasmania Pty Ltd
      </td>
      <td className="p-4 hidden md:table-cell">Smith</td>
      <td className="hidden lg:table-cell max-w-sm xl:max-w-xs truncate p-4 overflow-hidden">
        4 Lille Street, Brighton, 7030
      </td>
      <td className="p-4 hidden sm:table-cell ">20-12-2022</td>
      <td className="p-4">10-06-2023</td>
    </tr>
  );
};

export default InstallationOrderItem;
