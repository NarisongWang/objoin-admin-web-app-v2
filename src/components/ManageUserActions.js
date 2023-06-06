import React from 'react';
import { FaUserPlus, FaUserTimes, FaUserCheck } from 'react-icons/fa';
import ButtonWithIcon from './ButtonWithIcon';

const ManageUserActions = ({
  select,
  openInviteForm,
  disableAccount,
  enableAccount,
}) => {
  return (
    <div className="flex flex-row justify-center items-center">
      <ButtonWithIcon
        buttonName="Invite New User"
        icon={FaUserPlus}
        disabled={false}
        action={() => openInviteForm()}
      />
      <ButtonWithIcon
        buttonName="Disable Account"
        icon={FaUserTimes}
        disabled={select && select.disabled === false ? false : true}
        action={() => {
          disableAccount(select.uid);
        }}
      />
      <ButtonWithIcon
        buttonName="Enable Account"
        icon={FaUserCheck}
        disabled={select && select.disabled === true ? false : true}
        action={() => {
          enableAccount(select.uid);
        }}
      />
    </div>
  );
};

export default ManageUserActions;
