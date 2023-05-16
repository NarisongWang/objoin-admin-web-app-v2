import React from 'react';
import { parseDate } from '../utils/utils';

const InstallationOrderItem = ({
  installationOrder,
  select,
  setSelect,
  setShowDetail,
}) => {
  return (
    <tr
      className={` dark:hover:bg-gray-700 ${
        select &&
        select.installationOrderNumber ===
          installationOrder.installationOrderNumber
          ? 'bg-blue-200'
          : 'hover:bg-gray-100'
      }`}
      onClick={() => {
        setSelect(installationOrder);
      }}
    >
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            checked={
              select &&
              select.installationOrderNumber ===
                installationOrder.installationOrderNumber
                ? true
                : false
            }
            readOnly
            type="radio"
            className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </td>
      <td className="p-4 w-32 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
        <div
          className="text-base font-semibold  text-blue-700 underline dark:text-white cursor-pointer"
          onClick={() => {
            setShowDetail(installationOrder);
          }}
        >
          {installationOrder.installationOrderNumber}
        </div>
        {/*
        environment variable: REACT_APP_WORK_STATUS
           Waitting for Setup:gray-500; 
           Waitting for Delivery:red-800
           Waitting for Installation:green-400 
           Installation in Progress:green-600
           Installation Completed:green-800
           Installation Order Closed:black */}
        <div
          className={`text-sm font-normal ${
            installationOrder.workStatus === 0
              ? 'bg-gray-500'
              : installationOrder.workStatus === 1
              ? 'bg-red-800'
              : installationOrder.workStatus === 2
              ? 'bg-green-400'
              : installationOrder.workStatus === 3
              ? 'bg-green-600'
              : installationOrder.workStatus === 4
              ? 'bg-green-800'
              : installationOrder.workStatus === 5
              ? 'bg-black'
              : ''
          } px-1 rounded-md text-white dark:text-gray-400`}
        >
          {
            process.env.REACT_APP_WORK_STATUS.split('|')[
              installationOrder.workStatus
            ]
          }
        </div>
      </td>
      <td className="p-4 hidden sm:table-cell">{installationOrder.customer}</td>
      <td className="p-4 hidden lg:table-cell">{installationOrder.shipName}</td>
      <td className="hidden xl:table-cell max-w-sm xl:max-w-xs truncate p-4 overflow-hidden">
        {installationOrder.shipAddress}
      </td>
      <td className="p-4 hidden sm:table-cell ">
        {parseDate(installationOrder.entryDate)}
      </td>
      <td className="p-4 hidden xs:table-cell">
        {parseDate(installationOrder.dueDate)}
      </td>
    </tr>
  );
};

export default InstallationOrderItem;
