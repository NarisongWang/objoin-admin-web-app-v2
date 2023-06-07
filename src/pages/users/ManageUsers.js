import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllUsers,
  getEmployees,
  createUser,
  disableUser,
  enableUser,
} from '../../features/user/userSlice';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';
import ManageUserActions from '../../components/ManageUserActions';
import UserItem from '../../components/UserItem';
import EmployeeList from '../../components/EmployeeList';
import { validateEmail } from '../../utils/utils';

const ManageUsers = () => {
  const [searchText, setSearchText] = useState('');
  const [select, setSelect] = useState();

  // for create new user
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserDisplayName, setNewUserDisplayName] = useState('');
  const [newUserRole, setNewUserRole] = useState('');
  const [newUserPhoneNumber, setNewUserPhoneNumber] = useState(undefined);
  const [newUserPhotoUrl, setNewUserPhotoUrl] = useState(undefined);

  const [showInviteForm, setShowInviteForm] = useState(false);

  const { users, employees, isLoading, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  //search
  const [dispList, setDispList] = useState(users);

  const onInputChange = (e) => {
    const newDispList = users.filter(
      (user) =>
        user.displayName.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
          -1 ||
        user.email.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
    );
    setDispList(newDispList);
    setSearchText(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDispList(users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  useEffect(() => {
    if (error !== '') {
      toast.error(error);
    }
  }, [error]);

  const onCreate = () => {
    //email, displayName, role, phoneNumber, photoURL
    if (!validateEmail(newUserEmail)) {
      toast.warning('Email address is not valid!');
      return;
    }
    if (newUserDisplayName === '') {
      toast.warning('Please enter display name for the user!');
      return;
    }
    if (newUserRole === '') {
      toast.warning('Please assign this user a role!');
      return;
    }
    const user = {
      email: newUserEmail,
      displayName: newUserDisplayName,
      role: newUserRole,
      phoneNumber:
        newUserPhoneNumber && newUserPhoneNumber !== ''
          ? newUserPhoneNumber
          : undefined,
      photoURL:
        newUserPhotoUrl && newUserPhotoUrl !== '' ? newUserPhotoUrl : undefined,
    };
    dispatch(createUser(user))
      .unwrap()
      .then(() => {
        setShowInviteForm(false);
        toast.success('New user created!');
      })
      .catch(toast.error);
  };

  const openInviteForm = () => {
    dispatch(getEmployees())
      .unwrap()
      .then(() => {
        setShowInviteForm(true);
      })
      .catch(toast.error);
  };

  const disableAccount = (uid) => {
    dispatch(disableUser(uid))
      .unwrap()
      .then(() => {
        toast.success('User has been disabled!');
        setSelect(undefined);
      })
      .catch(toast.error);
  };

  const enableAccount = (uid) => {
    dispatch(enableUser(uid))
      .unwrap()
      .then(() => {
        toast.success('User has been enabled!');
        setSelect(undefined);
      })
      .catch(toast.error);
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
          <div className="flex items-center">
            <input
              type="text"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block h-7 p-2.5 "
              value={searchText}
              onChange={(e) => {
                onInputChange(e);
              }}
              placeholder="Filter by name or email"
            />
          </div>
        </div>
        <div className="fixed top-[140px] right-4 md:top-[150px] lg:top-[111px] bg-white">
          <ManageUserActions
            select={select}
            openInviteForm={openInviteForm}
            disableAccount={disableAccount}
            enableAccount={enableAccount}
          />
        </div>
      </div>
      {/* Installation Order Table Part */}
      <div className="overflow-hidden shadow mt-12 md:mt-10 lg:mt-1">
        <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
          <thead className="bg-blue-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="w-4 p-4">
                <div className="flex items-center"></div>
              </th>
              <th
                scope="col"
                className="p-4 text-xs font-medium text-center text-gray-500 uppercase dark:text-gray-400"
              >
                Email
              </th>
              <th
                scope="col"
                className="p-4 hidden md:table-cell text-xs font-medium text-center text-gray-500 uppercase dark:text-gray-400"
              >
                Display Name
              </th>
              <th
                scope="col"
                className="p-4 hidden lg:table-cell text-xs font-medium text-center text-gray-500 uppercase dark:text-gray-400"
              >
                Phone Number
              </th>
              <th
                scope="col"
                className="p-4 hidden sm:table-cell text-xs font-medium text-center text-gray-500 uppercase dark:text-gray-400"
              >
                Account Role
              </th>
              <th
                scope="col"
                className="p-4 hidden xs:table-cell text-xs font-medium text-center text-gray-500 uppercase dark:text-gray-400"
              >
                Account Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 text-center">
            {dispList.map((user) => {
              return (
                <UserItem
                  key={user.uid}
                  user={user}
                  select={select}
                  setSelect={setSelect}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Invite new user form */}
      {showInviteForm && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-500 bg-opacity-70 flex justify-center items-center">
          <div className="md:w-[700px] w-full bg-white h-full md:h-auto md:rounded-lg overflow-y-auto">
            <div className="flex flex-row justify-between pb-2 border-b">
              <span className="mt-2 ml-3 text-2xl text-black">
                Invite New User
              </span>
              <button
                type="button"
                onClick={() => setShowInviteForm(null)}
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
            <div className="p-4 flex flex-row items-start justify-between">
              <div className="w-[400px] mb-4">
                <div>
                  <label className="block mb-2 text-md font-medium text-gray-700">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <div className="flex flex-row justify-between border h-10 border-gray-500 p-2 rounded-md ">
                    <input
                      className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                      value={newUserEmail}
                      onChange={(e) => {
                        setNewUserEmail(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block my-2 text-md font-medium text-gray-700">
                    Display Name <span className="text-red-600">*</span>
                  </label>
                  <div className="flex flex-row justify-between h-10 border border-gray-500 p-2 rounded-md ">
                    <input
                      className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                      value={newUserDisplayName}
                      onChange={(e) => {
                        setNewUserDisplayName(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block my-2 text-md font-medium text-gray-700">
                    User Role <span className="text-red-600">*</span>
                  </label>

                  <select
                    className="border h-10 border-gray-500 p-2 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                    onChange={(e) => {
                      setNewUserRole(e.target.value);
                    }}
                  >
                    <option value="">-- Please choose a role --</option>
                    {process.env.REACT_APP_USER_ROLES.split('|').map(
                      (role, index) => (
                        <option key={index} value={role}>
                          {role.toUpperCase()}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div>
                  <label className="block my-2 text-md font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="flex flex-row justify-between h-10 border border-gray-500 p-2 rounded-md ">
                    <input
                      className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                      value={newUserPhoneNumber}
                      onChange={(e) => {
                        setNewUserPhoneNumber(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block my-2 text-md font-medium text-gray-700">
                    Photo URL
                  </label>
                  <div className="flex flex-row justify-between h-10 border border-gray-500 p-2 rounded-md ">
                    <input
                      className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                      value={newUserPhotoUrl}
                      onChange={(e) => {
                        setNewUserPhotoUrl(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex mt-3 items-center justify-center">
                  <button
                    className={`bg-blue-500 hover:bg-blue-600mb-3 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-1`}
                    onClick={() => onCreate()}
                  >
                    Invite User
                  </button>
                </div>
              </div>
              <div>
                <div className=" bg-slate-50 rounded-lg w-[300px] h-[450px] mx-5 p-3 overflow-y-auto">
                  <EmployeeList
                    employees={employees}
                    setNewUserEmail={setNewUserEmail}
                    setNewUserDisplayName={setNewUserDisplayName}
                    setNewUserPhoneNumber={setNewUserPhoneNumber}
                  />
                </div>
                <div className="text-center text-sm italic text-red-500 mt-1">
                  *Double click the staff to auto fill.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ManageUsers;
