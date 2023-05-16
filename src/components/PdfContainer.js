import React, { useState } from 'react';
import PdfItem from './PdfItem';

const PdfContainer = ({ directory, selectedFiles, setSelectedFiles }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectFiles, setSelectFiles] = useState(directory.files);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const otherDirFiles = selectedFiles.filter(
      (file) =>
        file.substring(0, file.lastIndexOf('\\') + 1) !== directory.file_path
    );
    if (!selectAll) {
      const newSelectFiles = selectFiles.map((selectFile) => {
        return { ...selectFile, isChecked: true };
      });
      setSelectFiles(newSelectFiles);
      let files = [];
      for (const file of selectFiles) {
        const file_unc = directory.file_path + file.file_name;
        files.push(file_unc);
      }
      setSelectedFiles([...otherDirFiles, ...files]);
    } else {
      const newSelectFiles = selectFiles.map((selectFile) => {
        return { ...selectFile, isChecked: false };
      });
      setSelectFiles(newSelectFiles);
      setSelectedFiles([...otherDirFiles]);
    }
  };

  const handleCheckBoxChange = (file, isChecked) => {
    const newSelectFiles = selectFiles.map((selectFile) =>
      selectFile.id === file.id ? { ...selectFile, isChecked } : selectFile
    );
    setSelectFiles(newSelectFiles);

    const file_unc = directory.file_path + file.file_name;

    if (isChecked) {
      //add file to selectedFiles state in setup page
      setSelectedFiles([...selectedFiles, file_unc]);
    } else {
      //remove file from selectedFiles state in setup page
      const newSelectedFiles = selectedFiles.filter(
        (selectedFile) => selectedFile !== file_unc
      );
      setSelectedFiles(newSelectedFiles);
    }

    setSelectAll(newSelectFiles.every((selectFile) => selectFile.isChecked));
  };

  return (
    <div>
      <div className="flex flex-row justify-between mb-2">
        <div className="text-left italic ml-2 text-red-800">
          Directory- ... {directory.file_dir.replaceAll('\\', '/')}
        </div>
        <div className="flex flex-row items-center">
          <div className="text-gray-500 mr-2 text-sm italic text-right">
            Select All
          </div>
          <input
            className="mr-2"
            type="checkbox"
            checked={selectAll}
            onChange={() => {}}
            onClick={handleSelectAll}
          ></input>
        </div>
      </div>
      {selectFiles.map((file, index) => (
        <PdfItem
          key={index}
          file={file}
          filePath={directory.file_path}
          handleCheckBoxChange={handleCheckBoxChange}
        />
      ))}
    </div>
  );
};

export default PdfContainer;
