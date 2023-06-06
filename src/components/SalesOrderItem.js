import React, { useState } from 'react';
import { parseDate } from '../utils/utils';

const SalesOrderItem = ({
  index,
  salesOrder,
  select,
  setSelect,
  setShowDetail,
}) => {
  const [checked, setChecked] = useState(false);
  const checkSelection = () => {
    if (!salesOrder.loaded) {
      const newChecked = !checked;
      let newSelect = [...select];
      if (newChecked) {
        newSelect.push(index);
      } else {
        var i = newSelect.indexOf(index);
        if (i !== -1) {
          newSelect.splice(i, 1);
        }
      }
      setSelect(newSelect);
      setChecked(newChecked);
    }
  };
  return (
    <tr
      className={`dark:hover:bg-gray-700 ${
        checked ? 'bg-blue-200' : 'hover:bg-gray-100'
      }`}
      onClick={checkSelection}
    >
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            checked={salesOrder.loaded ? true : checked}
            type="checkbox"
            className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
            disabled={salesOrder.loaded}
            readOnly
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
