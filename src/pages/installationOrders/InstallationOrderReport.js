import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getInstallationOrder } from '../../features/installationOrder/installationOrderSlice';
import { parseDate, parseTime } from '../../utils/utils';
import Spinner from '../../components/Spinner';
import CheckListItem from '../../components/CheckListItem';

const InstallationOrderReport = () => {
  const [searchParams] = useSearchParams();
  const installationOrderId = searchParams.get('id');

  const { installationOrder, isLoading, error } = useSelector(
    (state) => state.installationOrder
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInstallationOrder(installationOrderId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error !== '') {
      toast.error(error);
    }
  }, [error]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-row items-center justify-center mx-1">
      <div className="w-11/12">
        {/* Basic installation order info */}
        <div className="text-center font-bold text-2xl mt-3">
          Installation Report - {installationOrder.installationOrderNumber}
        </div>
        <div className="text-center text-lg">
          Report Date: {new Date().toLocaleString('en-AU').split(',')[0]}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Installation Order Number
            </label>
            <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
              {installationOrder.installationOrderNumber}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Customer
            </label>
            <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
              {installationOrder.customer}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Ship Name
            </label>
            <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
              {installationOrder.shipName}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Ship Address
            </label>
            <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
              {installationOrder.shipAddress}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Entry Date
            </label>
            <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
              {parseDate(installationOrder.entryDate)}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Due Date
            </label>
            <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
              {parseDate(installationOrder.dueDate)}
            </div>
          </div>
          <div>
            <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Shipping staff
            </label>
            <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
              {installationOrder.deliverers &&
              installationOrder.deliverers.length > 0 ? (
                installationOrder.deliverers.map((user, index) => (
                  <div key={index} className="p-1">
                    {user.fullName}
                  </div>
                ))
              ) : (
                <div className="text-gray-500 italic">
                  * No valid data found.
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Installation staff
            </label>
            <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
              {installationOrder.installers &&
              installationOrder.installers.length > 0 ? (
                installationOrder.installers.map((user, index) => (
                  <div key={index} className="p-1">
                    {user.fullName}
                  </div>
                ))
              ) : (
                <div className="text-gray-500 italic">
                  * No valid data found.
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Time frames
            </label>
            <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
              <div className="flex flex-row items-end justify-between">
                {installationOrder.timeFrames
                  ? installationOrder.timeFrames.map((timeFrame, index) => {
                      return index % 2 === 1 ? (
                        <div
                          key={index}
                          className={`${
                            timeFrame.workStatus === 0
                              ? 'text-gray-500'
                              : timeFrame.workStatus === 1
                              ? 'text-red-800'
                              : timeFrame.workStatus === 2
                              ? 'text-green-400'
                              : timeFrame.workStatus === 3
                              ? 'text-green-600'
                              : timeFrame.workStatus === 4
                              ? 'text-green-800'
                              : timeFrame.workStatus === 5
                              ? 'text-black'
                              : ''
                          } font-bold w-24 text-center`}
                        >
                          {
                            process.env.REACT_APP_WORK_STATUS2.split('|')[
                              timeFrame.workStatus
                            ]
                          }
                        </div>
                      ) : (
                        <div className="text-blue-600 italic">
                          {parseDate(timeFrame.time) +
                            ' ' +
                            parseTime(timeFrame.time)}
                        </div>
                      );
                    })
                  : ''}
              </div>
              <img src="line.png" alt="" className="w-full"></img>
              <div className="flex flex-row items-start justify-between">
                {installationOrder.timeFrames
                  ? installationOrder.timeFrames.map((timeFrame, index) => {
                      return index % 2 !== 1 ? (
                        <div
                          key={index}
                          className={`${
                            timeFrame.workStatus === 0
                              ? 'text-gray-500'
                              : timeFrame.workStatus === 1
                              ? 'text-red-800'
                              : timeFrame.workStatus === 2
                              ? 'text-green-400'
                              : timeFrame.workStatus === 3
                              ? 'text-green-600'
                              : timeFrame.workStatus === 4
                              ? 'text-green-800'
                              : timeFrame.workStatus === 5
                              ? 'text-black'
                              : ''
                          } font-bold w-24 text-center`}
                        >
                          {
                            process.env.REACT_APP_WORK_STATUS2.split('|')[
                              timeFrame.workStatus
                            ]
                          }
                        </div>
                      ) : (
                        <div className="text-blue-600 italic">
                          {parseDate(timeFrame.time) +
                            ' ' +
                            parseTime(timeFrame.time)}
                        </div>
                      );
                    })
                  : ''}
              </div>
            </div>
          </div>
        </div>
        <div className="break-after-page"></div>
        {/* Kitchen install checklist */}
        <div className="flex flex-row items-center justify-between mt-3 ">
          <img alt="OBJOIN" src="OBJOIN.png" className="w-[250px] h-[100px]" />
          <div className="text-right text-xs">
            Unit 2/18a Hull St, Glenorchy, TAS 7010
            <br />
            PO Box: 125 Glenorchy, TAS 7010
            <br />
            Phone: (03) 62733141
            <br />
            email: enquiries@objoin.com.au
            <br />
            web: objoin.com.au
            <br />
            ABN: 39 604 613 916
            <br />
          </div>
        </div>
        <div className="uppercase italic font-bold text-center text-lg">
          Kitchen install checklist
        </div>
        <div className="flex flex-row items-center justify-center my-5">
          <div className="text-right mx-3">
            Installer Name:
            <br />
            Completed Date & Time:
            <br />
            Installation Order Number:
            <br />
            Site Address:
            <br />
          </div>
          <div className="text-left mx-3">
            {installationOrder.installers
              ? installationOrder.installers[0].fullName
              : ''}
            <br />
            {installationOrder.checkListSignature
              ? `${
                  parseDate(installationOrder.checkListSignature.time) +
                  ' ' +
                  parseTime(installationOrder.checkListSignature.time)
                }`
              : ''}
            <br />
            {installationOrder.installationOrderNumber}
            <br />
            {installationOrder.shipAddress}
            <br />
          </div>
        </div>
        {installationOrder.checkList
          ? installationOrder.checkList.map((checkItem, index) => {
              return (
                <CheckListItem
                  key={index}
                  title={checkItem.title}
                  status={checkItem.status}
                  note={checkItem.note}
                />
              );
            })
          : ''}
        <div className="break-after-page"></div>
        {/* Delivery photos & comments */}
        <div className="uppercase font-bold text-center text-lg">
          Shipping Photos
        </div>
        {installationOrder.photos0
          ? installationOrder.photos0.map((photo, index) => {
              return (
                <div key={index} className="float-left w-1/3 mb-5">
                  <div className="flex flex-col items-center justify-center">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={'/display-photo?url=' + photo.replaceAll('/', '-')}
                    >
                      <img
                        className="p-1"
                        src={
                          'https://objoinfiles.blob.core.windows.net/installation-orders/' +
                          photo +
                          '?' +
                          process.env.REACT_APP_AZURE_STORAGE_CONN
                        }
                        alt="delivery"
                      />
                    </a>
                    <div className="p-3 text-center">
                      {photo.split('/').pop()}
                    </div>
                  </div>
                </div>
              );
            })
          : ''}
        {installationOrder.deliveryComment &&
          installationOrder.deliveryComment.length > 0 && (
            <div>
              <br clear="ALL" />
              <div className="break-after-page"></div>
              <div className="uppercase font-bold text-center text-lg mb-5">
                Shipping Comments
              </div>
              <div className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                {installationOrder.deliveryComment}
              </div>
            </div>
          )}
        <div className="break-after-page"></div>
        {/* Delivery photos & comments */}
        <div className="uppercase font-bold text-center text-lg">
          Installation Photos
        </div>
        {installationOrder.photos1
          ? installationOrder.photos1.map((photo, index) => {
              return (
                <div key={index} className="float-left w-1/3 mb-5">
                  <div className="flex flex-col items-center justify-center">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={'/display-photo?url=' + photo.replaceAll('/', '-')}
                    >
                      <img
                        className="p-1"
                        src={
                          'https://objoinfiles.blob.core.windows.net/installation-orders/' +
                          photo +
                          '?' +
                          process.env.REACT_APP_AZURE_STORAGE_CONN
                        }
                        alt="delivery"
                      />
                    </a>
                    <div className="p-3 text-center">
                      {photo.split('/').pop()}
                    </div>
                  </div>
                </div>
              );
            })
          : ''}
      </div>
    </div>
  );
};

export default InstallationOrderReport;
