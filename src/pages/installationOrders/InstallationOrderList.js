import React from 'react';
import SearchBar from '../../components/SearchBar';
import InstallationOrderActions from '../../components/InstallationOrderActions';

const InstallationOrderList = () => {
  return (
    <main>
      {/* Search bar and action buttons */}
      <div className="mb-0 h-[50px]">
        <div className="fixed top-0 left-0 bg-white w-full h-[160px]"></div>
        <div className="fixed bg-white">
          <SearchBar placeholder="Installation Order Number" />
        </div>
        <div className="fixed top-[150px] lg:right-4 lg:top-[111px] bg-white">
          <InstallationOrderActions />
        </div>
      </div>

      {/* Installation Order Table Part */}
      <div className="overflow-hidden shadow mt-12 md:mt-10 lg:mt-1">
        <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
          <thead className="bg-blue-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center"></div>
              </th>
              <th
                scope="col"
                className="p-4 text-xs font-medium text-center text-gray-500 uppercase dark:text-gray-400"
              >
                Installation Order Number
              </th>
              <th
                scope="col"
                className="p-4 hidden sm:table-cell text-xs font-medium text-center text-gray-500 uppercase dark:text-gray-400"
              >
                Customer
              </th>
              <th
                scope="col"
                className="p-4 hidden md:table-cell text-xs font-medium text-center text-gray-500 uppercase dark:text-gray-400"
              >
                Ship Name
              </th>
              <th
                scope="col"
                className="p-4 hidden lg:table-cell text-xs font-medium text-center text-gray-500 uppercase dark:text-gray-400"
              >
                Ship Address
              </th>
              <th
                scope="col"
                className="p-4 hidden sm:table-cell text-xs font-medium text-center text-gray-500 uppercase dark:text-gray-400"
              >
                Entry Date
              </th>
              <th
                scope="col"
                className="p-4 text-xs font-medium text-center text-gray-500 uppercase dark:text-gray-400"
              >
                Due Data
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 text-center">
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
              <td className="p-4 w-36 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  S2212069
                </div>
                <div className="text-sm font-normal bg-red-800 px-1 rounded-md text-white dark:text-gray-400">
                  Waitting for Delivery
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
              <td className="p-4 w-36 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  S2212069
                </div>
                <div className="text-sm font-normal bg-green-400 px-1 rounded-md text-white dark:text-gray-400">
                  Waitting for Installation
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
              <td className="p-4 w-36 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  S2212069
                </div>
                <div className="text-sm font-normal bg-green-600 px-1 rounded-md text-white dark:text-gray-400">
                  Installation in Progress
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
              <td className="p-4 w-36 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  S2212069
                </div>
                <div className="text-sm font-normal bg-green-800 rounded-md text-white px-1 dark:text-gray-400">
                  Installation Completed
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
              <td className="p-4 w-36 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  S2212069
                </div>
                <div className="text-sm font-normal px-1 bg-black rounded-md text-white dark:text-gray-400">
                  Installation Order Closed
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
              <td className="p-4 w-36 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  S2212069
                </div>
                <div className="text-sm font-normal bg-green-400 px-1 rounded-md text-white dark:text-gray-400">
                  Waitting for Installation
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
              <td className="p-4 w-36 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  S2212069
                </div>
                <div className="text-sm font-normal bg-green-600 px-1 rounded-md text-white dark:text-gray-400">
                  Installation in Progress
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
              <td className="p-4 w-36 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  S2212069
                </div>
                <div className="text-sm font-normal bg-green-800 rounded-md text-white px-1 dark:text-gray-400">
                  Installation Completed
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
              <td className="p-4 w-36 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  S2212069
                </div>
                <div className="text-sm font-normal px-1 bg-black rounded-md text-white dark:text-gray-400">
                  Installation Order Closed
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
          </tbody>
        </table>
      </div>
      {/* pagination part */}
    </main>
  );
};

export default InstallationOrderList;
