import React from 'react';
import { useSearchParams } from 'react-router-dom';

const DisplayPhoto = () => {
  const [searchParams] = useSearchParams();
  const photoUrl = searchParams.get('url');
  const src =
    'https://objoinfiles.blob.core.windows.net/installation-orders/' +
    photoUrl.replaceAll('-', '/') +
    '?' +
    process.env.REACT_APP_AZURE_STORAGE_CONN;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-3 font-bold text-lg text-blue-700">
        {photoUrl.replaceAll('-', '/')}
      </div>
      <img className="p-3" src={src} alt="" width="1200" height="1600" />
    </div>
  );
};

export default DisplayPhoto;
