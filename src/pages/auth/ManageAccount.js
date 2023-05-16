import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getAuth,
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import { FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';

const ManageAccount = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [isLoading, setIsLoading] = useState(false);

  const [showEditForm, setShowEditForm] = useState(false);
  const [showChangePassForm, setShowChangePassForm] = useState(false);

  const [dispName, setDispName] = useState(user ? user.displayName : '');
  const [photo, setPhoto] = useState(user ? user.photoURL : '');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');

  const onUpdate = (e) => {
    e.preventDefault();
    setIsLoading(true);
    updateProfile(user, {
      displayName: dispName,
      photoURL: photo,
    })
      .then(() => {
        setIsLoading(false);
        window.location.reload();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  const onResetPass = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const credential = EmailAuthProvider.credential(user.email, oldPassword);
    reauthenticateWithCredential(user, credential)
      .then(() => {
        updatePassword(user, newPassword).then(() => {
          setIsLoading(false);
          showChangePassForm(false);
          toast.success('You have successfully reset your password.');
        });
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl">Manage Account</div>
      {/*Profile Info Container */}
      <div className="flex flex-col items-center justify-center m-6 space-y-10 bg-gray-50 rounded-2xl md:flex-row md:w-[500px] w-4/5">
        <img
          src={user.photoURL ? user.photoURL : 'default-profile.jpg'}
          alt=""
          className="w-24 h-24 rounded-full m-5"
        ></img>
        <div>
          <div className="m-5">Email: {user.email}</div>
          <div className="m-5 pb-5">Display Name: {user.displayName}</div>
        </div>
      </div>
      <button
        className="flex md:w-[500px] w-4/5 text-left font-bold p-3 shadow-cyan-100 bg-gray-50 rounded-md hover:-translate-y-0.5 hover:shadow-lg mb-3 items-center"
        onClick={() => setShowEditForm(true)}
      >
        <span className="flex-grow">Edit Profile</span>
        <FaArrowRight />
      </button>
      {showEditForm && (
        <div
          // onClick={() => setShowEditForm(false)}
          className="fixed top-0 left-0 z-50 w-full h-full bg-gray-500 bg-opacity-70 flex justify-center items-center"
        >
          {/* Edit Profile Form */}
          <div
            // onClick={(e) => e.stopPropagation()}
            className="md:w-[700px] w-4/5 bg-white h-[320px] rounded-lg"
          >
            <div className="flex flex-row justify-between pb-2 border-b">
              <span className="mt-2 ml-3 text-2xl text-black">
                Edit Profile
              </span>
              <button
                type="button"
                onClick={() => setShowEditForm(null)}
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
              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="displayName"
                >
                  Display Name
                </label>
                <input
                  className="w-full border border-gray-400 p-2 rounded-md"
                  type="text"
                  name="displayName"
                  id="displayName"
                  value={dispName}
                  onChange={(e) => setDispName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="photoURL">
                  Photo URL
                </label>
                <input
                  className="w-full border border-gray-400 p-2 rounded-md"
                  type="text"
                  name="photoURL"
                  id="photoURL"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-1"
                  onClick={onUpdate}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <button
        className="flex md:w-[500px] w-4/5 text-left font-bold p-3 shadow-cyan-100 bg-gray-50 rounded-md hover:-translate-y-0.5 hover:shadow-lg mb-3 items-center"
        onClick={() => setShowChangePassForm(true)}
      >
        <span className="flex-grow">Change Password</span>
        <FaArrowRight />
      </button>
      {showChangePassForm && (
        <div
          //onClick={() => setShowChangePassForm(false)}
          className="fixed top-0 left-0 z-50 w-full h-full bg-gray-500 bg-opacity-70 flex justify-center items-center"
        >
          {/* Change Password Form */}
          <div
            //onClick={(e) => e.stopPropagation()}
            className="md:w-[600px] w-4/5 bg-white h-[430px] md:h-[400px] rounded-lg"
          >
            <div className="flex flex-row justify-between pb-2 border-b">
              <span className="mt-2 ml-3 text-2xl text-black">
                Change Password
              </span>
              <button
                type="button"
                onClick={() => setShowChangePassForm(null)}
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
              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="oldPassword"
                >
                  Type your <span className="text-red-600">current</span>{' '}
                  password
                </label>
                <input
                  className={`w-full border ${
                    oldPassword === '' ? 'border-red-500' : 'border-gray-400'
                  }  p-2 rounded-md`}
                  type="password"
                  name="oldPassword"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="newPassword"
                >
                  Type your <span className="text-red-600">new</span> password
                </label>
                <input
                  className="w-full border border-gray-400 p-2 rounded-md"
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="newPassword2"
                >
                  Retype your <span className="text-red-600">new</span> password
                </label>
                <input
                  className={`w-full border ${
                    newPassword !== newPassword2
                      ? 'border-red-500'
                      : 'border-gray-400'
                  } p-2 rounded-md`}
                  type="password"
                  name="newPassword2"
                  id="newPassword2"
                  value={newPassword2}
                  onChange={(e) => setNewPassword2(e.target.value)}
                />
              </div>
              <div className="flex flex-col md:flex-row md:justify-between items-center text-blue-600">
                <Link
                  className="hidden md:block"
                  to={`/reset-password?email=${user.email}`}
                  target="blank"
                >
                  Forgot your current password?
                </Link>
                <button
                  className={`${
                    oldPassword !== '' &&
                    newPassword !== '' &&
                    newPassword === newPassword2
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-gray-300 cursor-default'
                  }  mb-3 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-1`}
                  onClick={onResetPass}
                  disabled={
                    !(
                      oldPassword !== '' &&
                      newPassword !== '' &&
                      newPassword === newPassword2
                    )
                  }
                >
                  Change Password
                </button>
                <Link
                  className="block md:hidden"
                  to={`/reset-password?email=${user.email}`}
                  target="blank"
                >
                  Forgot your current password?
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAccount;
