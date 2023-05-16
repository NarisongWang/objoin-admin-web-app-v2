import axios from 'axios';
import { getConfig } from '../../utils/utils';

const API_URL_LIST = process.env.REACT_APP_API_SERVER + '/admin/get-all-users/';
const API_URL_CREATE = process.env.REACT_APP_API_SERVER + '/admin/create-user/';

const getAllUsers = async (token) => {
  const config = getConfig(token);
  const response = await axios.get(API_URL_LIST, config);
  return response.data;
};

const createUser = async (user, token) => {
  const config = getConfig(token);
  const response = await axios.post(API_URL_CREATE, user, config);
  return response.data;
};

const installationOrderAPI = { getAllUsers, createUser };

export default installationOrderAPI;
