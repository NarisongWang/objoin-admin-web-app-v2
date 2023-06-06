import axios from 'axios';
import { getConfig } from '../../utils/utils';

const API_URL_LIST = process.env.REACT_APP_API_SERVER + '/admin/get-all-users/';
const API_URL_EMP_LIST = process.env.REACT_APP_API_SERVER + '/mssql/employees/';
const API_URL_CREATE = process.env.REACT_APP_API_SERVER + '/admin/create-user/';
const API_URL_UPDATE = process.env.REACT_APP_API_SERVER + '/admin/update-user/';

const getAllUsers = async (token) => {
  const config = getConfig(token);
  const response = await axios.get(API_URL_LIST, config);
  return response.data;
};

const getEmployees = async (token) => {
  const config = getConfig(token);
  const response = await axios.get(API_URL_EMP_LIST, config);
  return response.data;
};

const createUser = async (user, token) => {
  const config = getConfig(token);
  const response = await axios.post(API_URL_CREATE, user, config);
  return response.data;
};

const disableUser = async (uid, token) => {
  const config = getConfig(token);
  const response = await axios.post(
    API_URL_UPDATE,
    { uid: uid, update: { disabled: true } },
    config
  );
  return response.data;
};

const enableUser = async (uid, token) => {
  const config = getConfig(token);
  const response = await axios.post(
    API_URL_UPDATE,
    { uid: uid, update: { disabled: false } },
    config
  );
  return response.data;
};

const installationOrderAPI = {
  getAllUsers,
  getEmployees,
  createUser,
  disableUser,
  enableUser,
};

export default installationOrderAPI;
