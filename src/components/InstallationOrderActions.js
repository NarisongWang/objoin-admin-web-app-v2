import React from 'react';
import {
  FaCloudUploadAlt,
  FaEdit,
  FaMinusSquare,
  FaTrashAlt,
  FaFileAlt,
} from 'react-icons/fa';
import ButtonWithIcon from './ButtonWithIcon';

const InstallationOrderActions = ({
  select,
  openSetupForm,
  openEditForm,
  closeOrder,
  deleteOrder,
  openReport,
}) => {
  return (
    <div className="flex flex-row justify-center items-center">
      <ButtonWithIcon
        buttonName="Setup"
        icon={FaCloudUploadAlt}
        disabled={select && select.workStatus === 0 ? false : true}
        action={select && select.workStatus === 0 ? openSetupForm : undefined}
      />
      <ButtonWithIcon
        buttonName="Edit"
        icon={FaEdit}
        disabled={select && select.workStatus === 1 ? false : true}
        action={select && select.workStatus === 1 ? openEditForm : undefined}
      />
      <ButtonWithIcon
        buttonName="Close"
        icon={FaMinusSquare}
        disabled={select && select.workStatus === 4 ? false : true}
        action={select && select.workStatus === 1 ? closeOrder : undefined}
      />
      <ButtonWithIcon
        buttonName="Delete"
        icon={FaTrashAlt}
        disabled={
          select && (select.workStatus === 0 || select.workStatus === 1)
            ? false
            : true
        }
        action={
          select && (select.workStatus === 0 || select.workStatus === 1)
            ? deleteOrder
            : undefined
        }
      />
      <ButtonWithIcon
        buttonName="Open Report"
        icon={FaFileAlt}
        disabled={
          select && (select.workStatus === 4 || select.workStatus === 5)
            ? false
            : true
        }
        action={
          select && (select.workStatus === 4 || select.workStatus === 5)
            ? openReport
            : undefined
        }
      />
    </div>
  );
};

export default InstallationOrderActions;
