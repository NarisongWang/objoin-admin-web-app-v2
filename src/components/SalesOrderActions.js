import React from 'react';
import { FaDownload } from 'react-icons/fa';
import ButtonWithIcon from './ButtonWithIcon';

const SalesOrderActions = () => {
  return (
    <div>
      <div className="flex flex-row justify-center items-center">
        <ButtonWithIcon
          buttonName="Load Sales Orders"
          icon={FaDownload}
          disabled={false}
        />
      </div>
    </div>
  );
};

export default SalesOrderActions;
