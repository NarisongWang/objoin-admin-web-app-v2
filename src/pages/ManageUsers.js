import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';

const ManageUsers = () => {
  const [customClaims, setCustomClaims] = useState(null);
  //  const [token, setToken] = useState('');
  const auth = getAuth();

  useEffect(() => {
    const getCustomClaims = async () => {
      const tokenResult = await auth.currentUser.getIdTokenResult();
      setCustomClaims(tokenResult.claims);
    };
    getCustomClaims();
  }, [auth]);

  return (
    <div className="flex items-center justify-center">
      <div className="w-[700px] bg-gray-200 rounded-lg m-5">
        {customClaims && (
          <div>
            <p>User ID: {auth.currentUser.uid}</p>
            <p>User Role: {JSON.stringify(customClaims.role)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
