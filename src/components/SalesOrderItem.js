import React from 'react';
import { parseDate } from '../utils/utils';

const SalesOrderItem = ({
  salesOrder,
  currentPage,
  searchText,
  select,
  setShowDetail,
}) => {
  return (
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id="checkbox-194556"
            aria-describedby="checkbox-1"
            type="checkbox"
            className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
            disabled={salesOrder.loaded}
          />
        </div>
      </td>
      <td className="p-4 w-32 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
        <div
          className="text-base font-semibold text-blue-700 underline dark:text-white cursor-pointer"
          onClick={() => {
            setShowDetail(salesOrder);
          }}
        >
          {salesOrder.installationOrderNumber}
        </div>
        {/* Loaded:green-600; 
            Not Loaded:gray-600 */}
        <div
          className={`text-sm font-normal ${
            salesOrder.loaded ? 'bg-green-600' : 'bg-gray-500'
          } px-1 rounded-md text-white dark:text-gray-400`}
        >
          {salesOrder.loaded ? 'Loaded' : 'Not Loaded'}
        </div>
      </td>
      <td className="p-4 hidden sm:table-cell">{salesOrder.customer}</td>
      <td className="p-4 hidden lg:table-cell">{salesOrder.shipName}</td>
      <td className="hidden xl:table-cell max-w-sm xl:max-w-xs truncate p-4 overflow-hidden">
        {salesOrder.shipAddress}
      </td>
      <td className="p-4 hidden sm:table-cell ">
        {parseDate(salesOrder.entryDate)}
      </td>
      <td className="p-4 hidden xs:table-cell ">
        {parseDate(salesOrder.dueDate)}
      </td>
    </tr>
  );
};

export default SalesOrderItem;
