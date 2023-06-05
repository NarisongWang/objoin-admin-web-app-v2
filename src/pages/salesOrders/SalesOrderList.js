import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  getSalesOrders,
  getTotalCount,
  createInstallationOrders,
} from '../../features/salesOrder/salesOrderSlice';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import SalesOrderActions from '../../components/SalesOrderActions';
import SalesOrderItem from '../../components/SalesOrderItem';

const SalesOrderList = () => {
  const pageSize = 10;
  const [searchParams] = useSearchParams();
  const paramPage = searchParams.get('paramPage');
  const paramText = searchParams.get('paramText');
  const [currentPage, setCurrentPage] = useState(
    paramPage ? parseInt(paramPage) : 1
  );
  const [searchText, setSearchText] = useState(paramText ? paramText : '');
  const [showDetail, setShowDetail] = useState(null);
  const [select, setSelect] = useState([]);

  const { salesOrders, totalCount, isLoading, error } = useSelector(
    (state) => state.salesOrder
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    dispatch(getSalesOrders({ firstPageIndex, pageSize, searchText }));
    dispatch(getTotalCount({ searchText }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error !== '') {
      toast.error(error);
    }
  }, [error]);

  const onPageChange = (page) => {
    setSelect([]);
    setCurrentPage(page);
    const firstPageIndex = (page - 1) * pageSize;
    dispatch(getSalesOrders({ firstPageIndex, pageSize, searchText }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  const search = () => {
    setSelect([]);
    setCurrentPage(1);
    dispatch(getSalesOrders({ firstPageIndex: 0, pageSize, searchText }));
    dispatch(getTotalCount({ searchText }));
  };

  const clearSearch = () => {
    setSelect([]);
    setSearchText('');
    setCurrentPage(1);
    dispatch(getSalesOrders({ firstPageIndex: 0, pageSize, searchText: '' }));
    dispatch(getTotalCount({ searchText: '' }));
  };

  const loadOrders = () => {
    if (select.length === 0) {
      toast.warning('Please select at least one sales order!');
    } else {
      const sortedOrder = select.sort(function (a, b) {
        return a - b;
      });
      let selectedSalesOrders = [];
      for (let i = 0; i < sortedOrder.length; i++) {
        selectedSalesOrders.push(salesOrders[sortedOrder[i]]);
      }
      dispatch(createInstallationOrders({ salesOrders: selectedSalesOrders }))
        .unwrap()
        .then(() => {
          toast.success('Selected sales orders has been successfully loaded!');
        })
        .catch(toast.error);
    }
  };

  return (
    <main>
      {/* Search bar and action buttons */}
      <div className="mb-0 h-[50px] ">
        <div className="fixed top-0 left-0 bg-white w-full h-[195px] lg:h-[160px] border-b"></div>
        <div className="fixed bg-white right-4 lg:left-[280px]">
          <SearchBar
            placeholder="Sales Order Number"
            searchText={searchText}
            setSearchText={setSearchText}
            search={search}
            clearSearch={clearSearch}
          />
        </div>
        <div className="fixed top-[140px] right-4 md:top-[150px] lg:top-[111px] bg-white">
          <SalesOrderActions loadOrders={loadOrders} />
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
                Sales Order Number
              </th>
              <th
                scope="col"
                className="p-4 hidden sm:table-cell text-xs font-medium text-center text-gray-500 uppercase dark:text-gray-400"
              >
                Customer
              </th>
              <th
                scope="col"
                className="p-4 hidden lg:table-cell text-xs font-medium text-center text-gray-500 uppercase dark:text-gray-400"
              >
                Ship Name
              </th>
              <th
                scope="col"
                className="p-4 hidden xl:table-cell text-xs font-medium text-center text-gray-500 uppercase dark:text-gray-400"
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
                className="p-4 hidden xs:table-cell text-xs font-medium text-center text-gray-500 uppercase dark:text-gray-400"
              >
                Due Data
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 text-center">
            {salesOrders.map((salesOrder, index) => {
              return (
                <SalesOrderItem
                  key={salesOrder.ID}
                  index={index}
                  salesOrder={salesOrder}
                  select={select}
                  setSelect={setSelect}
                  setShowDetail={setShowDetail}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      {/* pagination part */}
      <Pagination
        className="pagination-bar mt-2"
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageChange={(page) => onPageChange(page)}
      />
      {showDetail && (
        <aside
          className="fixed top-0 left-0 z-50 w-full h-full bg-gray-500 bg-opacity-70"
          onClick={() => setShowDetail(null)}
        >
          <div
            className="fixed top-0 right-0 w-full h-full max-w-lg p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800 transform-none"
            onClick={(e) => e.stopPropagation()}
          >
            <h5
              id="drawer-label"
              className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400"
            >
              Sales Order Detail
            </h5>
            <button
              type="button"
              onClick={() => setShowDetail(null)}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Sales Order Number
                </label>
                <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  {showDetail.installationOrderNumber}
                </div>
              </div>
              <div className="block sm:hidden ">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Customer
                </label>
                <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  {showDetail.customer}
                </div>
              </div>
              <div className="block md:hidden ">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Ship Name
                </label>
                <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  {showDetail.shipName}
                </div>
              </div>
              <div className="block xl:hidden ">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Ship Address
                </label>
                <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  {showDetail.shipAddress}
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Installation Items
                </label>
                <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  {showDetail.orderDetails &&
                  showDetail.orderDetails.length > 0 ? (
                    showDetail.orderDetails
                      .replaceAll('&amp;', '&')
                      .split('|')
                      .map((item, index) => (
                        <div key={index} className="p-1">
                          {item}
                        </div>
                      ))
                  ) : (
                    <div className="text-gray-500 italic">
                      * No installation items found
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  PDF Files in
                  <span className="text-red-600"> Local File Server</span>
                </label>
                <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  {showDetail.files && showDetail.files.length > 0 ? (
                    showDetail.files.map((directory, index) => (
                      <div key={index}>
                        <div className="text-amber-900 italic pt-2 pb-1">
                          Directory- ... {directory.file_dir}
                        </div>
                        {directory.files.map((file, index2) => (
                          <li key={index2} className="p-1">
                            <a
                              className="text-blue-600 italic underline"
                              href={
                                directory.file_path
                                  .replaceAll('\\', '/')
                                  .replace(
                                    'objoin-sql/public/SalesOrders/',
                                    '//192.168.2.5:3088/'
                                  ) + file.file_name
                              }
                              target="_blank"
                              rel="noreferrer"
                            >
                              {file.file_name}
                            </a>
                          </li>
                        ))}
                      </div>
                    ))
                  ) : showDetail.installationOrderNumber ? (
                    <div className="text-gray-500 italic">
                      * No PDF files found in{' '}
                      <span style={{ color: 'blue', fontStyle: 'italic' }}>
                        Z:\SalesOrders\
                        {showDetail.entryDate.toString().substring(0, 4)}\
                        {showDetail.customer}\{showDetail.shipName.trim()} -{' '}
                        {showDetail.shipAddress.substring(
                          0,
                          showDetail.shipAddress.length - 6
                        )}{' '}
                        - {showDetail.installationOrderNumber}\
                      </span>{' '}
                      directory.
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}
    </main>
  );
};

export default SalesOrderList;
