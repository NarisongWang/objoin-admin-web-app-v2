import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';

const ResetPassword = () => {
  const auth = getAuth();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('email'));
  const [isLoading, setIsLoading] = useState(false);

  const sendResetEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.success('Password Reset Email has been sent to ' + email);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      {/* Card Container */}
      <div className="relative flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0">
        {/* Left Side */}
        <div className="p-6 md:p-20">
          {/* Top Content */}
          <div className="flex items-center justify-center mb-10">
            <img src="OBJOIN.png" alt="" className="w-[250px]"></img>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-6 border mb-5 border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
            placeholder="Enter your email address"
          />
          {/* Middle Content */}
          <div className="flex flex-col items-center justify-between mt-6 space-y-5 md:space-y-0">
            <button
              onClick={sendResetEmail}
              className="w-full flex justify-center items-center mb-5 p-4 space-x-1 font-sans font-bold text-white rounded-md px-9 bg-blue-500 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
            >
              <span>Reset Password</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="5" y1="12" x2="19" y2="12" />
                <line x1="13" y1="18" x2="19" y2="12" />
                <line x1="13" y1="6" x2="19" y2="12" />
              </svg>
            </button>
            <div className="font-thin text-cyan-700">
              <a href="/sign-in">Sign in here!</a>
            </div>
            <div className="font-thin pt-4 text-center">
              © 2023 O'Brien Joinery PTY LTD. All Rights Reserved.
            </div>
          </div>
        </div>

        {/* <!-- Right Side --> */}
        <img
          src="FisherStreet3Dark.jpg"
          alt=""
          className="w-[350px] hidden rounded-r-2xl md:block"
        />
      </div>
    </div>
  );
};

export default ResetPassword;
