import React from 'react';
import { FaUserPlus, FaUserTimes, FaUserCheck } from 'react-icons/fa';
import ButtonWithIcon from './ButtonWithIcon';

const ManageUserActions = ({ select, setShowInviteForm }) => {
  return (
    <div className="flex flex-row justify-center items-center">
      <ButtonWithIcon
        buttonName="Invite New User"
        icon={FaUserPlus}
        disabled={false}
        action={() => setShowInviteForm(true)}
      />
      <ButtonWithIcon
        buttonName="Disable Account"
        icon={FaUserTimes}
        disabled={false}
        action={() => {}}
      />
      <ButtonWithIcon
        buttonName="Enable Account"
        icon={FaUserCheck}
        disabled={false}
        action={() => {}}
      />
    </div>
  );
};

export default ManageUserActions;
