import React from 'react';
import { FaUpload } from 'react-icons/fa';
import ButtonWithIcon from './ButtonWithIcon';

const CheckListActions = ({ handleUpdate }) => {
  return (
    <div>
      <div className="flex flex-row justify-center items-center">
        <ButtonWithIcon
          buttonName="Update Checklist"
          icon={FaUpload}
          disabled={false}
          action={handleUpdate}
        />
      </div>
    </div>
  );
};

export default CheckListActions;
