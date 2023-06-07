import React, { useState } from 'react';

const EmployeeList = ({
  employees,
  setNewUserEmail,
  setNewUserDisplayName,
  setNewUserPhoneNumber,
}) => {
  //search
  const [searchText, setSearchText] = useState();
  const [dispList, setDispList] = useState(employees);

  const onInputChange = (e) => {
    const newDispList = employees.filter(
      (employee) =>
        employee.FirstName.toLowerCase().indexOf(
          e.target.value.toLowerCase()
        ) !== -1 ||
        employee.LastName.toLowerCase().indexOf(
          e.target.value.toLowerCase()
        ) !== -1 ||
        employee.email.toLowerCase().indexOf(e.target.value.toLowerCase()) !==
          -1
    );
    setDispList(newDispList);
    setSearchText(e.target.value);
  };
  const onDoubleClick = (employee) => {
    setNewUserEmail(employee.email);
    setNewUserDisplayName(employee.FirstName);
    setNewUserPhoneNumber(
      '+61' + employee.CellPhone.substring(1).replaceAll(' ', '')
    );
  };
  return (
    <div>
      <div className="flex flex-row justify-between h-10 border border-slate-500 p-2 rounded-md ">
        <input
          className="p-1 px-2 appearance-none outline-none w-full bg-slate-50 text-gray-800"
          placeholder="Search by name or email"
          value={searchText}
          onChange={onInputChange}
        />
      </div>
      <div>
        {dispList &&
          dispList.map((employee, index) => (
            <div
              key={index}
              id={index}
              className="hover:bg-gray-200 bg-white border rounded-md mx-1 px-1 my-2"
              onDoubleClick={() => {
                onDoubleClick(employee);
              }}
            >
              <div className="flex flex-row items-center justify-between">
                <div className="text-sm text-green-700">
                  {employee.FirstName}
                </div>
                <div className="text-sm  text-green-700">
                  {employee.LastName}
                </div>
              </div>
              {employee.email ? (
                <div className="text-sm  text-blue-700">{employee.email}</div>
              ) : (
                <div className="text-sm  text-red-700">No email found</div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default EmployeeList;
