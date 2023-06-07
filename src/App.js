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
import InstallationOrderList from './pages/installationOrders/InstallationOrderList';
import SalesOrderList from './pages/salesOrders/SalesOrderList';
import ManageUsers from './pages/users/ManageUsers';
import DisplayPhoto from './pages/installationOrders/DisplayPhoto';
import NotFound from './pages/NotFound';
import 'react-toastify/dist/ReactToastify.css';
import InstallationOrderReport from './pages/installationOrders/InstallationOrderReport';
import ManageCheckList from './pages/checkList/ManageCheckList';
import UserManual from './pages/UserManual';

const BasicLayoutWithLeftMenu = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <div>
      <Header
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
      />
      <LeftMenu
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
      />
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
          {/* PrivateRoute */}
          <Route path="/" element={<PrivateRoutes />}>
            {/* No layout */}
            <Route path="/display-photo" element={<DisplayPhoto />} />
            <Route
              path="/installation-order-report"
              element={<InstallationOrderReport />}
            />
            {/* Basic Layout With Left Menu */}
            <Route path="/" element={<BasicLayoutWithLeftMenu />}>
              <Route index element={<Dashboard />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/manage-account" element={<ManageAccount />} />
              <Route path="/manage-users" element={<ManageUsers />} />
              <Route path="/check-list" element={<ManageCheckList />} />
              <Route path="/help" element={<UserManual />} />
              <Route
                path="/installation-orders"
                element={<InstallationOrderList />}
              />
              <Route path="/sales-orders" element={<SalesOrderList />} />
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
