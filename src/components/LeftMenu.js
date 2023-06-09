import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedMenu } from '../features/system/systemSlice';

const LeftMenu = ({ showMobileMenu, setShowMobileMenu }) => {
  const { selectedMenu } = useSelector((state) => state.system);
  const dispatch = useDispatch();

  //left menu display content
  const dashboard = 'Dashboard';
  const installationOrder = 'Installation Orders';
  const salesOrder = 'Sales Orders';
  const checkList = 'Manage Check List';
  const manageUser = 'Manage Users';
  //const inbox = 'Inbox';
  const help = 'Help Center';

  useEffect(() => {
    if (showMobileMenu) {
    } else {
    }
  }, [showMobileMenu]);

  const handleClick = (menuItem) => {
    dispatch(setSelectedMenu(menuItem));
    setShowMobileMenu(false);
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-30 w-64 h-screen pt-32 transition-transform -translate-x-full bg-white border-r border-gray-200 ${
        showMobileMenu ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0  dark:bg-gray-800 dark:border-gray-700`}
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-4 font-medium">
          <li>
            <Link
              to="/"
              onClick={() => handleClick(dashboard)}
              className={`flex items-center p-2 text-gray-900 text-lg rounded-lg ${
                selectedMenu === dashboard ? 'bg-blue-100' : ''
              } dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-blue-800 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-3">{dashboard}</span>
            </Link>
          </li>
          <li>
            <Link
              to="/installation-orders"
              onClick={() => handleClick(installationOrder)}
              className={`flex items-center p-2 text-gray-900 text-lg rounded-lg ${
                selectedMenu === installationOrder ? 'bg-blue-100' : ''
              } dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-blue-800 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m5.789 9.281 0.235 -1.992L2.86 4.078a5.233 5.233 0 0 1 2.273 -0.539 5.117 5.117 0 0 1 5.133 5.133c0 0.422 -0.071 0.891 -0.164 1.313l5.836 5.813c1.054 1.079 1.148 2.719 0.188 3.679s-2.625 0.891 -3.704 -0.188l-5.696 -5.742c-0.516 0.164 -1.031 0.281 -1.594 0.281 -2.836 0 -5.133 -2.321 -5.133 -5.156 0 -0.797 0.164 -1.5 0.469 -2.179l3.258 3.304z" />
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">
                {installationOrder}
              </span>
              {/* <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  Pro
                </span> */}
            </Link>
          </li>
          <li>
            <Link
              to="/sales-orders"
              onClick={() => handleClick(salesOrder)}
              className={`flex items-center p-2 text-gray-900 text-lg rounded-lg ${
                selectedMenu === salesOrder ? 'bg-blue-100' : ''
              } dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-blue-800 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">
                {salesOrder}
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/manage-users"
              onClick={() => handleClick(manageUser)}
              className={`flex items-center p-2 text-gray-900 text-lg rounded-lg ${
                selectedMenu === manageUser ? 'bg-blue-100' : ''
              } dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-blue-800 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">
                {manageUser}
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/check-list"
              onClick={() => handleClick(checkList)}
              className={`flex items-center p-2 text-gray-900 text-lg rounded-lg ${
                selectedMenu === checkList ? 'bg-blue-100' : ''
              } dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              <svg
                className="flex-shrink-0 w-6 h-6 ml-1 mt-1 text-blue-800 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                viewBox="0 0 17 17"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.032 4.736a0.469 0.469 0 0 0 0.938 0h-0.938Zm-7.316 8.858a0.469 0.469 0 0 0 0 -0.938v0.938ZM10.411 0.81l0.333 -0.332 -0.333 0.332Zm2.558 3.927V3.168h-0.938v1.568h0.938Zm-0.319 -2.341 -1.906 -1.917 -0.665 0.662 1.908 1.917 0.664 -0.662ZM9.968 0.157H1.563v0.938h8.405V0.157ZM0.157 1.563v10.625h0.938V1.563H0.157Zm1.406 12.032h3.153v-0.938H1.563v0.938ZM0.157 12.188a1.407 1.407 0 0 0 1.407 1.407v-0.938a0.469 0.469 0 0 1 -0.469 -0.469H0.157ZM1.563 0.157A1.407 1.407 0 0 0 0.157 1.563h0.938a0.469 0.469 0 0 1 0.469 -0.469V0.157Zm9.181 0.323a1.094 1.094 0 0 0 -0.775 -0.323v0.938a0.157 0.157 0 0 1 0.11 0.046l0.666 -0.661ZM12.969 3.167a1.094 1.094 0 0 0 -0.319 -0.771l-0.664 0.66a0.157 0.157 0 0 1 0.046 0.111h0.938Z" />
                <path
                  d="M3.125 3.75h6.609"
                  stroke="currentColor"
                  strokeWidth="0.9375"
                  strokeLinecap="round"
                />
                <path
                  d="M3.125 6.875h3.273"
                  stroke="currentColor"
                  strokeWidth="0.9375"
                  strokeLinecap="round"
                />
                <path
                  d="M3.125 10h1.403"
                  stroke="currentColor"
                  strokeWidth="0.9375"
                  strokeLinecap="round"
                />
                <path
                  cx="17.5"
                  cy="17.5"
                  r="5.5"
                  stroke="currentColor"
                  strokeWidth="0.9375"
                  d="M14.375 10.938a3.438 3.438 0 0 1 -3.438 3.438A3.438 3.438 0 0 1 7.5 10.938a3.438 3.438 0 0 1 6.875 0z"
                />
                <path
                  d="m9.688 11.25 0.677 0.677a0.313 0.313 0 0 0 0.475 -0.039L12.188 10"
                  stroke="white"
                  strokeWidth="0.9375"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="flex-1 ml-2 whitespace-nowrap">{checkList}</span>
            </Link>
          </li>

          {/* <li>
            <Link
              to="/inbox"
              onClick={() => handleClick(inbox)}
              className={`flex items-center p-2 text-gray-900 text-lg rounded-lg ${
                selectedMenu === inbox ? 'bg-blue-100' : ''
              } dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-blue-800 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap">{inbox}</span>
              <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                3
              </span>
            </Link>
          </li> */}
          <li>
            <Link
              to="/help"
              onClick={() => handleClick(help)}
              className={`flex items-center p-2 text-gray-900 text-lg rounded-lg ${
                selectedMenu === help ? 'bg-blue-100' : ''
              } dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 ml-[6px] mt-1 text-blue-800 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
              </svg>
              <span className="flex-1 ml-[6px] whitespace-nowrap">{help}</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default LeftMenu;
