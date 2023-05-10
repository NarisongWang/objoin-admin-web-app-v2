import React from 'react';
import {
  FaCloudUploadAlt,
  FaEdit,
  FaMinusSquare,
  FaTrashAlt,
  FaFileAlt,
} from 'react-icons/fa';
import ButtonWithIcon from './ButtonWithIcon';

const InstallationOrderActions = () => {
  return (
    <div className="flex flex-row justify-center items-center">
      <ButtonWithIcon
        buttonName="Setup"
        icon={FaCloudUploadAlt}
        disabled={true}
      />
      <ButtonWithIcon buttonName="Edit" icon={FaEdit} disabled={false} />
      <ButtonWithIcon
        buttonName="Close"
        icon={FaMinusSquare}
        disabled={false}
      />
      <ButtonWithIcon buttonName="Delete" icon={FaTrashAlt} disabled={false} />
      <ButtonWithIcon buttonName="Report" icon={FaFileAlt} disabled={false} />
    </div>
  );
};

export default InstallationOrderActions;
