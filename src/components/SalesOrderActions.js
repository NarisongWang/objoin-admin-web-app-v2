import React from 'react';
import { FaDownload } from 'react-icons/fa';
import ButtonWithIcon from './ButtonWithIcon';

const SalesOrderActions = ({ select, loadOrders }) => {
  return (
    <div>
      <div className="flex flex-row justify-center items-center">
        <ButtonWithIcon
          buttonName="Load Sales Orders"
          icon={FaDownload}
          disabled={select && select.length > 0 ? false : true}
          action={loadOrders}
        />
      </div>
    </div>
  );
};

export default SalesOrderActions;
