import React from 'react';

const ShowCheckListItem = ({ title, status, note }) => {
  return (
    <div className="flex items-center flex-row border-b border-black mb-1">
      <div className="text-sm w-[350px]">{title}</div>
      {title === 'Other notes' ? null : (
        <div className="text-xs w-[150px]">
          <input
            className="mx-1"
            type="checkbox"
            id="check1"
            name="check1"
            checked={status === 1 ? true : false}
            readOnly
          />
          <label htmlFor="check1">YES</label>
          <input
            className="mx-1"
            type="checkbox"
            id="check2"
            name="check2"
            checked={status === 2 ? true : false}
            readOnly
          />
          <label htmlFor="check2">NO</label>
          <input
            className="mx-1"
            type="checkbox"
            id="check3"
            name="check3"
            checked={status === 3 ? true : false}
            readOnly
          />
          <label htmlFor="check3">N/A</label>
        </div>
      )}
      {title === 'Other notes' ? (
        <div className="text-sm h-[40px]">{note}</div>
      ) : (
        <div className="text-sm">{note}</div>
      )}
    </div>
  );
};

export default ShowCheckListItem;
