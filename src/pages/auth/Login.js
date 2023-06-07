import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Spinner from '../../components/Spinner';

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setIsLoading(false);
        navigate('/');
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Card Container */}
      <div className="relative flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0">
        {/* Left Side */}
        <div className="p-6 md:p-20">
          {/* Top Content */}
          <div className="flex items-center justify-center mb-10">
            <img src="OBJOIN.png" alt="" className="w-[250px]"></img>
          </div>
          <input
            name="email"
            type="email"
            className="w-full p-6 border mb-5 border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
            placeholder="Enter your email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              name="password"
              type={visible ? 'text' : 'password'}
              className="w-full p-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute inset-y-5 right-0 px-3 py-2"
              onClick={() => setVisible(!visible)}
            >
              {visible ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>

          {/* Middle Content */}
          <div className="flex flex-col items-center justify-between mt-6 space-y-5 md:space-y-0">
            <button
              onClick={signIn}
              className="w-full flex justify-center items-center mb-5 p-4 space-x-1 font-sans font-bold text-white rounded-md px-9 bg-blue-500 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
            >
              <span>Sign In</span>
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
            <div className="mb-10 font-thin text-cyan-700">
              <Link to="/reset-password">Forgot password?</Link>
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

export default Login;
