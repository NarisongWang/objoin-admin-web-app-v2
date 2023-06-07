import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  getInstallationOrders,
  getTotalCount,
  getUsersAndFiles,
  setupInstallationOrder,
  editInstallationOrder,
  deleteInstallationOrder,
  closeInstallationOrder,
} from '../../features/installationOrder/installationOrderSlice';
import { toast } from 'react-toastify';
import InstallationOrderItem from '../../components/InstallationOrderItem';
import SelectStaff from '../../components/SelectStaff';
import PdfContainer from '../../components/PdfContainer';
import Spinner from '../../components/Spinner';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import InstallationOrderActions from '../../components/InstallationOrderActions';
import { parseDate } from '../../utils/utils';

const InstallationOrderList = () => {
  const pageSize = 10;
  const [searchParams] = useSearchParams();
  const paramPage = searchParams.get('paramPage');
  const paramText = searchParams.get('paramText');
  const [currentPage, setCurrentPage] = useState(
    paramPage ? parseInt(paramPage) : 1
  );
  const [searchText, setSearchText] = useState(paramText ? paramText : '');
  const [showDetail, setShowDetail] = useState(null);
  const [select, setSelect] = useState(null);
  const [isSetup, setIsSetup] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  //states for setup & edit installation order
  const [deliverers, setDeliverers] = useState([]);
  const [installers, setInstallers] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const { installationOrders, totalCount, files, users, isLoading, error } =
    useSelector((state) => state.installationOrder);
  const dispatch = useDispatch();

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    dispatch(getInstallationOrders({ firstPageIndex, pageSize, searchText }));
    dispatch(getTotalCount({ searchText }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error !== '') {
      toast.error(error);
    }
  }, [error]);

  const onPageChange = (page) => {
    setSelect(null);
    setCurrentPage(page);
    const firstPageIndex = (page - 1) * pageSize;
    dispatch(getInstallationOrders({ firstPageIndex, pageSize, searchText }));
  };

  const search = () => {
    setSelect(null);
    setCurrentPage(1);
    dispatch(
      getInstallationOrders({ firstPageIndex: 0, pageSize, searchText })
    );
    dispatch(getTotalCount({ searchText }));
  };

  const clearSearch = () => {
    setSelect(null);
    setSearchText('');
    setCurrentPage(1);
    dispatch(
      getInstallationOrders({ firstPageIndex: 0, pageSize, searchText: '' })
    );
    dispatch(getTotalCount({ searchText: '' }));
  };

  const openSetupForm = () => {
    setIsSetup(true);
    dispatch(getUsersAndFiles(select._id)).then(() => {
      setSelect(select);
    });
  };

  const openEditForm = () => {
    setIsEdit(true);
    dispatch(getUsersAndFiles(select._id)).then(() => {
      setSelect(select);
    });
  };

  const submitOrder = (e, type) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      toast.warning('Please select at least one file');
      return;
    }
    if (deliverers.length === 0) {
      toast.warning('Please select at least one deliverer');
      return;
    }
    if (installers.length === 0) {
      toast.warning('Please select at least one installer');
      return;
    }
    const installationOrderId = select._id;
    const installationOrderNumber = select.installationOrderNumber;
    let fileUrl = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      let url = selectedFiles[i].replaceAll('\\', '/');
      url = url.substring(url.indexOf(installationOrderNumber), url.length);
      fileUrl.push(url);
    }
    const localFilePath = selectedFiles[0].substring(
      0,
      selectedFiles[0].indexOf(installationOrderNumber)
    );
    const newTimeFrame = {
      workStatus: select.workStatus + 1,
      time: new Date(),
    };
    const timeFrames = [...select.timeFrames, newTimeFrame];

    if (type === 'setup') {
      dispatch(
        setupInstallationOrder({
          installationOrderId,
          update: {
            workStatus: select.workStatus + 1,
            deliverers,
            installers,
            timeFrames,
            files: fileUrl,
            localFilePath,
          },
        })
      )
        .unwrap()
        .then(() => {
          setIsSetup(false);
          setInstallers([]);
          setDeliverers([]);
          setSelectedFiles([]);
          setSelect(null);
          toast.success('Installation Order Setup Success!');
        })
        .catch(toast.error);
    } else if (type === 'edit') {
      dispatch(
        editInstallationOrder({
          installationOrderId,
          update: {
            deliverers,
            installers,
            files: fileUrl,
            localFilePath,
          },
        })
      )
        .unwrap()
        .then(() => {
          setIsEdit(false);
          setInstallers([]);
          setDeliverers([]);
          setSelectedFiles([]);
          setSelect(null);
          toast.success('Installation Order Edit Success!');
        })
        .catch(toast.error);
    }
  };

  const closeOrder = () => {
    if (window.confirm('Do you want to close this order?')) {
      dispatch(closeInstallationOrder({ installationOrderId: select._id }))
        .unwrap()
        .then(() => {
          setSelect(null);
          const firstPageIndex = (currentPage - 1) * pageSize;
          dispatch(
            getInstallationOrders({ firstPageIndex, pageSize, searchText })
          );
          toast.success('Installation Order Closed!');
        })
        .catch(toast.error);
    } else {
    }
  };

  const deleteOrder = () => {
    if (window.confirm('Do you want to delete this order?')) {
      dispatch(deleteInstallationOrder({ installationOrderId: select._id }))
        .unwrap()
        .then(() => {
          setSelect(null);
          const firstPageIndex = (currentPage - 1) * pageSize;
          dispatch(
            getInstallationOrders({ firstPageIndex, pageSize, searchText })
          );
          toast.success('Installation Order Deleted!');
        })
        .catch(toast.error);
    } else {
    }
  };

  const openReport = () => {
    window.open(`/installation-order-report?id=${select._id}`, '_blank');
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main>
      {/* Search bar and action buttons */}
      <div className="mb-0 h-[50px]">
        <div className="fixed top-0 left-0 bg-white w-full h-[195px] lg:h-[160px] border-b"></div>
        <div className="fixed bg-white right-4 lg:left-[280px]">
          <SearchBar
            placeholder="Installation Order Number"
            searchText={searchText}
            setSearchText={setSearchText}
            search={search}
            clearSearch={clearSearch}
          />
        </div>
        <div className="fixed top-[140px] right-4 md:top-[150px] lg:top-[111px] bg-white">
          <InstallationOrderActions
            select={select}
            openSetupForm={openSetupForm}
            openEditForm={openEditForm}
            closeOrder={closeOrder}
            deleteOrder={deleteOrder}
            openReport={openReport}
          />
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
            {installationOrders.map((installationOrder) => {
              return (
                <InstallationOrderItem
                  key={installationOrder._id}
                  installationOrder={installationOrder}
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
        className="pagination-bar"
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
              Installation Order Detail
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
                  Installation Order Number
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
              <div className="block lg:hidden ">
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
              <div className="block sm:hidden ">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Entry Date
                </label>
                <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  {parseDate(showDetail.entryDate)}
                </div>
              </div>
              <div className="block xs:hidden ">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Due Date
                </label>
                <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  {parseDate(showDetail.dueDate)}
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Installation Items
                </label>
                <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  {showDetail.checkItems && showDetail.checkItems.length > 0
                    ? showDetail.checkItems.map((item, index) => (
                        <div key={index} className="p-1">
                          {item}
                        </div>
                      ))
                    : '* No installation items found'}
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Shipping staff
                </label>
                <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  {showDetail.deliverers && showDetail.deliverers.length > 0 ? (
                    showDetail.deliverers.map((user, index) => (
                      <div key={index} className="p-1">
                        {user.fullName}
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 italic">
                      * Installation Order hasn't been setup.
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Installation staff
                </label>
                <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  {showDetail.installers && showDetail.installers.length > 0 ? (
                    showDetail.installers.map((user, index) => (
                      <div key={index} className="p-1">
                        {user.fullName}
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 italic">
                      * Installation Order hasn't been setup.
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  PDF Files
                  <span className="text-red-600"> Uploaded to Cloud</span>
                </label>
                <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  {showDetail.files && showDetail.files.length > 0 ? (
                    showDetail.files.map((file, index) => (
                      <li key={index} className="p-1">
                        <a
                          className="text-blue-600 italic underline"
                          href={
                            'http://192.168.2.5:3088/' +
                            showDetail.localFilePath.substring(32) +
                            file
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          {file}
                        </a>
                      </li>
                    ))
                  ) : (
                    <div className="text-gray-500 italic">
                      * No items found.
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Shipping Photos
                  <span className="text-red-600"> Uploaded to Cloud</span>
                </label>
                <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  {showDetail.photos0 && showDetail.photos0.length > 0 ? (
                    showDetail.photos0.map((photo, index) => (
                      <li key={index} className="p-1">
                        <a
                          className="text-blue-600 italic underline"
                          href={
                            '/display-photo?url=' + photo.replaceAll('/', '-')
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          {photo}
                        </a>
                      </li>
                    ))
                  ) : (
                    <div className="text-gray-500 italic">
                      * No items found.
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Installation Photos
                  <span className="text-red-600"> Uploaded to Cloud</span>
                </label>
                <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  {showDetail.photos1 && showDetail.photos1.length > 0 ? (
                    showDetail.photos1.map((photo, index) => (
                      <li key={index} className="p-1">
                        <a
                          className="text-blue-600 italic underline"
                          href={
                            '/display-photo?url=' + photo.replaceAll('/', '-')
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          {photo}
                        </a>
                      </li>
                    ))
                  ) : (
                    <div className="text-gray-500 italic">
                      * No items found.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}
      {isSetup && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-500 bg-opacity-70 flex justify-center items-center">
          {/* Setup installation order form */}
          <div className="md:w-[700px] w-full bg-white h-full md:h-5/6 md:rounded-lg overflow-y-auto">
            <div className="flex flex-row justify-between pb-2 border-b">
              <span className="mt-2 ml-3 text-2xl text-black">
                Setup Installation Order -{' '}
                <span className="text-blue-700">
                  {select.installationOrderNumber}
                </span>
              </span>
              <button
                type="button"
                onClick={() => setIsSetup(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 mt-2 mr-2 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
            </div>
            <div className="p-4">
              <SelectStaff
                label="Select Shipping Staff"
                staffList={
                  users && users.length > 0
                    ? users.filter(
                        (user) => user.customClaims.role === 'deliverer'
                      )
                    : []
                }
                onSelect={setDeliverers}
              />
              <SelectStaff
                label="Select Installation Staff"
                staffList={
                  users && users.length > 0
                    ? users.filter(
                        (user) => user.customClaims.role === 'installer'
                      )
                    : []
                }
                onSelect={setInstallers}
              />
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Select PDF Files
                </label>
                <div
                  className="w-full border border-gray-500 p-2 rounded-md"
                  type="select"
                >
                  {files.length !== 0 ? (
                    files.map((directory, index) => (
                      <PdfContainer
                        key={index}
                        directory={directory}
                        selectedFiles={selectedFiles}
                        setSelectedFiles={setSelectedFiles}
                      />
                    ))
                  ) : select.installationOrderNumber ? (
                    <div style={{ textAlign: 'left', color: 'grey' }}>
                      * No PDF files found in{' '}
                      <span style={{ color: 'blue', fontStyle: 'italic' }}>
                        Z:\SalesOrders\
                        {select.entryDate.toString().substring(0, 4)}\
                        {select.customer}\{select.shipName.trim()} -{' '}
                        {select.shipAddress.substring(
                          0,
                          select.shipAddress.length - 6
                        )}{' '}
                        - {select.installationOrderNumber}\
                      </span>{' '}
                      directory.
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button
                  className={`bg-blue-500 hover:bg-blue-600mb-3 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-1`}
                  onClick={(e) => submitOrder(e, 'setup')}
                >
                  Setup Installation Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isEdit && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-500 bg-opacity-70 flex justify-center items-center">
          {/* Edit installation order form */}
          <div className="md:w-[700px] w-full bg-white h-full md:h-5/6 md:rounded-lg overflow-y-auto">
            <div className="flex flex-row justify-between pb-2 border-b">
              <span className="mt-2 ml-3 text-2xl text-black">
                Edit Installation Order -{' '}
                <span className="text-blue-700">
                  {select.installationOrderNumber}
                </span>
              </span>
              <button
                type="button"
                onClick={() => setIsEdit(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 mt-2 mr-2 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
            </div>
            <div className="p-4">
              <SelectStaff
                label="Select Shipping Staff"
                staffList={
                  users && users.length > 0
                    ? users.filter(
                        (user) => user.customClaims.role === 'deliverer'
                      )
                    : []
                }
                onSelect={setDeliverers}
              />
              <SelectStaff
                label="Select Installation Staff"
                staffList={
                  users && users.length > 0
                    ? users.filter(
                        (user) => user.customClaims.role === 'installer'
                      )
                    : []
                }
                onSelect={setInstallers}
              />
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Select PDF Files
                </label>
                <div
                  className="w-full border border-gray-500 p-2 rounded-md"
                  type="select"
                >
                  {files.length !== 0 ? (
                    files.map((directory, index) => (
                      <PdfContainer
                        key={index}
                        directory={directory}
                        selectedFiles={selectedFiles}
                        setSelectedFiles={setSelectedFiles}
                      />
                    ))
                  ) : select.installationOrderNumber ? (
                    <div style={{ textAlign: 'left', color: 'grey' }}>
                      * No PDF files found in{' '}
                      <span style={{ color: 'blue', fontStyle: 'italic' }}>
                        Z:\SalesOrders\
                        {select.entryDate.toString().substring(0, 4)}\
                        {select.customer}\{select.shipName.trim()} -{' '}
                        {select.shipAddress.substring(
                          0,
                          select.shipAddress.length - 6
                        )}{' '}
                        - {select.installationOrderNumber}\
                      </span>{' '}
                      directory.
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button
                  className={`bg-blue-500 hover:bg-blue-600mb-3 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-1`}
                  onClick={(e) => submitOrder(e, 'edit')}
                >
                  Edit Installation Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default InstallationOrderList;
