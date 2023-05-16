import React, { useState } from 'react';

const SelectStaff = ({ label, staffList, onSelect }) => {
  const [input, setInput] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [dispList, setDispList] = useState(staffList);

  const onInputChange = (e) => {
    setShowMenu(true);
    const newDispList = staffList.filter(
      (staff) =>
        staff.displayName
          .toLowerCase()
          .indexOf(e.target.value.toLowerCase()) !== -1
    );
    setDispList(newDispList);
    setInput(e.target.value);
  };

  const selectUser = (user) => {
    onSelect([user]);
    setShowMenu(false);
    setInput(user.displayName);
  };
  return (
    <div className="relative mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex flex-row justify-between border border-gray-500 p-2 rounded-md ">
        <input
          placeholder="Search by name"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          value={input}
          onChange={(e) => {
            onInputChange(e);
          }}
        />
        <div className="text-gray-300 w-8 py-1 pl-2 pr-1 flex items-center">
          <button
            className="cursor-pointer w-7 h-7 rounded-md px-1 text-gray-600 outline-none focus:outline-none hover:bg-gray-200"
            onClick={() => setShowMenu(!showMenu)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-up w-4 h-4"
            >
              <polyline points="18 9 12 15 6 9"></polyline>
            </svg>
          </button>
        </div>
      </div>
      <div
        id="dropdown"
        className={`absolute ${
          showMenu ? '' : 'hidden'
        } w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
      >
        {dispList && dispList.length > 0 ? (
          dispList.map((staff, index) => {
            return (
              <div
                key={index}
                onClick={() => selectUser(staff)}
                className="flex z-50 bg-white w-full items-center p-2 pl-2 border-transparent border-l-2 relative cursor-pointer hover:bg-gray-100"
              >
                <div className="w-7 flex flex-col items-center">
                  <div className="flex relative w-7 h-7 bg-orange-500 justify-center items-center m-1 mr-2 mt-1 rounded-full ">
                    <img
                      className="rounded-full"
                      alt="A"
                      src={
                        staff.photoURL && staff.photoURL !== ''
                          ? staff.photoURL
                          : 'default-profile.jpg'
                      }
                    />
                  </div>
                </div>
                <div className="w-full items-center flex">
                  <div className="mx-2 -mt-1">{staff.displayName}</div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="italic bg-white text-red-500 p-2">*No user found</div>
        )}
      </div>
    </div>
  );
};

export default SelectStaff;
