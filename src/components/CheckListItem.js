import React, { useState, useEffect } from 'react';

const CheckListItem = ({
  index,
  title,
  handleAdd,
  handleEdit,
  handleDelete,
}) => {
  const originalTitle = title;
  const [editable, setEditable] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  useEffect(() => {
    setInputValue(title);
  }, [title]);

  const editTitle = () => {
    setEditable(true);
  };

  const addItem = () => {
    handleAdd(index);
  };

  const deleteItem = () => {
    handleDelete(index);
  };

  const update = () => {
    handleEdit(index, inputValue);
    setEditable(false);
  };

  const cancel = () => {
    setEditable(false);
    setInputValue(originalTitle);
  };

  return (
    <div
      className={`flex flex-col md:flex-row md:justify-between items-center border rounded-md my-2 p-2 ${
        editable ? 'bg-blue-200' : 'bg-gray-100'
      } `}
    >
      <div className="flex flex-row items-center w-full mb-1">
        <div className="font-bold text-gray-600">{index}</div>
        <input
          type="text"
          className="w-full mx-2"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          disabled={!editable}
        ></input>
      </div>
      {title === 'Other notes' ? null : editable ? (
        <div className="">
          <span
            className="px-3 py-[2px] bg-white text-green-600 mx-1 rounded-md cursor-pointer"
            onClick={update}
          >
            Update✓
          </span>
          <span
            className="px-3 py-[2px] bg-white text-gray-600 mx-1 rounded-md cursor-pointer"
            onClick={cancel}
          >
            Cancel✕
          </span>
        </div>
      ) : (
        <div className="">
          <span
            className="px-3 py-[2px] bg-blue-400 text-white mx-1 rounded-md cursor-pointer"
            onClick={addItem}
          >
            Add
          </span>
          <span
            className="px-4 py-[2px] bg-blue-400 text-white mx-1 rounded-md cursor-pointer"
            onClick={editTitle}
          >
            Edit
          </span>
          <span
            className="px-1 py-[2px] bg-blue-400 text-white mx-1 rounded-md cursor-pointer"
            onClick={deleteItem}
          >
            Delete
          </span>
        </div>
      )}
    </div>
  );
};

export default CheckListItem;
