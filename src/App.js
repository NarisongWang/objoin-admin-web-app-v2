import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import PrivateRoutes from './components/PrivateRoutes';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import LeftMenu from './components/LeftMenu';
import Footer from './components/Footer';
import Dashboard from './pages/dashboard/Dashboard';
import ManageAccount from './pages/auth/ManageAccount';
import Login from './pages/auth/Login';
import ResetPassword from './pages/auth/ResetPassword';
import ManageUsers from './pages/ManageUsers';
import NotFound from './pages/NotFound';
import Test from './pages/Test';
import Test2 from './pages/Test2';
import 'react-toastify/dist/ReactToastify.css';

const BasicLayoutWithLeftMenu = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <div>
      <Header
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
      />
      <LeftMenu showMobileMenu={showMobileMenu} />
      <div className="p-5 pt-24 md:pt-28 pb-20 md:ml-64">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* No layout no private route */}
          <Route path="/sign-in" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/test" element={<Test />} />
          <Route path="/test2" element={<Test2 />} />
          {/* BasicLayout & PrivateRoute */}
          <Route path="/" element={<PrivateRoutes />}>
            <Route path="/" element={<BasicLayoutWithLeftMenu />}>
              <Route index element={<Dashboard />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/manage-account" element={<ManageAccount />} />
              <Route path="/manage-users" element={<ManageUsers />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
        </Routes>
      </Router>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
