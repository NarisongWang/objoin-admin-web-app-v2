import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedMenu } from '../features/system/systemSlice';
import { getAuth, signOut } from 'firebase/auth';
import { FaUserEdit, FaSignOutAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ showMobileMenu, setShowMobileMenu }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const user = getAuth().currentUser;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buttonRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target))
        setShowUserMenu(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClick = (event) => {
    setShowUserMenu(!showUserMenu);
  };

  const handleToggleMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const onSignOut = () => {
    signOut(getAuth())
      .then(() => {
        // Sign-out success
        navigate('/sign-in');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <header>
      <nav className="fixed top-0 z-40 w-full border-b p-3 bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-start">
            <button
              onClick={handleToggleMenu}
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className={`inline-flex items-center p-2 text-sm text-blue-800 rounded-lg md:hidden hover:bg-gray-100 ${
                showMobileMenu ? 'bg-gray-100' : ''
              } focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
            >
              <svg
                className="w-8 h-8"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <Link to="/" onClick={() => dispatch(setSelectedMenu('Dashboard'))}>
              <img
                src="OBJOIN.png"
                alt=""
                className="ml-1 w-[140px] md:w-[180px]"
              ></img>
            </Link>
          </div>
          <button
            id="userMenuButton"
            ref={buttonRef}
            type="button"
            onClick={handleClick}
            aria-expanded="false"
            data-dropdown-toggle="dropdown-user"
          >
            <img
              src={
                user && user.photoURL ? user.photoURL : 'default-profile.jpg'
              }
              alt=""
              className="w-14 h-14 rounded-full mr-2"
            ></img>
          </button>
        </div>
      </nav>
      {showUserMenu ? (
        <nav className="fixed top-[70px] md:top-20 right-2 z-50 w-auto dark:bg-gray-800 dark:border-gray-700">
          <div
            className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
            id="dropdown-user"
          >
            <div className="px-4 py-3" role="none">
              <p
                className="text-sm text-gray-900 dark:text-white mb-2"
                role="none"
              >
                Hi {user.displayName},
              </p>
              <p
                className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                role="none"
              >
                {user.email}
              </p>
            </div>
            <ul className="py-1" role="none">
              <li>
                <Link
                  to="/manage-account"
                  onClick={() => {
                    dispatch(setSelectedMenu(''));
                    setShowMobileMenu(false);
                  }}
                  className="flex flex-row items-center  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                >
                  <FaUserEdit className="mr-2 text-blue-800" />
                  Manage Account
                </Link>
              </li>
              <li>
                <button
                  onClick={onSignOut}
                  className="flex flex-row w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem"
                >
                  <FaSignOutAlt className="mr-2 text-blue-800" />
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </nav>
      ) : null}
    </header>
  );
};

export default Header;
