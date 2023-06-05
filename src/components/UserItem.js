import React from 'react';

const UserItem = ({ user, select, setSelect }) => {
  return (
    <tr
      className={` dark:hover:bg-gray-700 ${
        select && select.uid === user.uid ? 'bg-blue-200' : 'hover:bg-gray-100'
      }`}
      onClick={() => {
        setSelect(user);
      }}
    >
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            checked={select && select.uid === user.uid ? true : false}
            readOnly
            type="radio"
            className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </td>
      <td className="p-2">
        <div className="flex flex-row w-full ">
          <div className="flex flex-row items-center justify-center">
            <img
              className="w-10 h-10 rounded-full mr-3"
              alt="A"
              src={
                user.photoURL && user.photoURL !== ''
                  ? user.photoURL
                  : 'default-profile.jpg'
              }
            />
            <div>{user.email}</div>
          </div>
        </div>
      </td>
      <td className="p-4 hidden md:table-cell">{user.displayName}</td>
      <td className="hidden lg:table-cell max-w-sm xl:max-w-xs truncate p-4 overflow-hidden">
        {user.phoneNumber ? (
          user.phoneNumber
        ) : (
          <span className="text-gray-500 italic text-sm">*Not provided</span>
        )}
      </td>
      <td className="p-4 hidden text-indigo-600 text-sm font-bold sm:table-cell">
        {user.customClaims ? user.customClaims.role.toUpperCase() : ''}
      </td>
      <td className="p-4 hidden xs:table-cell ">
        {user.disabled ? (
          <span className="bg-gray-600 px-7 text-white rounded-lg">
            Disabled
          </span>
        ) : (
          <span className="bg-green-600 px-7 text-white rounded-lg">
            Active
          </span>
        )}
      </td>
    </tr>
  );
};

export default UserItem;
