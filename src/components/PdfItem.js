import React from 'react';

const PdfItem = ({ file, filePath, handleCheckBoxChange }) => {
  const url =
    filePath
      .replaceAll('\\', '/')
      .replace('objoin-sql/public/SalesOrders/', '//192.168.2.5:3088/') +
    file.file_name;
  return (
    <div className="flex flex-row items-center justify-between mb-2">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={`ml-2 ${
          file.isChecked ? ' font-bold text-blue-700' : 'text-gray-500'
        }`}
      >
        {file.file_name}
      </a>
      <input
        className="mr-2"
        type="checkbox"
        checked={file.isChecked}
        onChange={(e) => {
          handleCheckBoxChange(file, e.target.checked);
        }}
      ></input>
    </div>
  );
};

export default PdfItem;
