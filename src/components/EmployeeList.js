import React, { useState, useEffect } from 'react';

const EmployeeList = ({
  employees,
  setNewUserEmail,
  setNewUserDisplayName,
  setNewUserPhoneNumber,
}) => {
  const onDoubleClick = (employee) => {
    setNewUserEmail(employee.email);
    setNewUserDisplayName(employee.FirstName);
    setNewUserPhoneNumber(
      '+61' + employee.CellPhone.substring(1).replaceAll(' ', '')
    );
  };
  return (
    <div>
      <div className="flex flex-row justify-between h-10 border border-gray-500 p-2 rounded-md ">
        <input className="p-1 px-2 appearance-none outline-none w-full bg-gray-100 text-gray-800" />
      </div>
      <div>
        {employees &&
          employees.map((employee) => (
            <div
              className="hover:bg-gray-200 bg-white rounded-md mx-1 px-1 my-2"
              onDoubleClick={() => {
                onDoubleClick(employee);
              }}
            >
              <div className="flex flex-row items-center justify-between">
                <div className="text-sm text-green-700">
                  {employee.FirstName}
                </div>
                <div className="text-sm  text-green-700">
                  {employee.CellPhone}
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
