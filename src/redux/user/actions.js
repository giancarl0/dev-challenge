import types from './types';

const user_data_request = () => ({
  type: types.USER_DATA_REQUEST,
  payload: {},
});

const user_data_success = (userData) => ({
  type: types.USER_DATA_SUCCESS,
  payload: { userData },
});

const user_data_error = (error) => ({
  type: types.USER_DATA_ERROR,
  payload: error,
});

const user_update_request = (userId) => ({
  type: types.USER_DATA_UPDATE_REQUEST,
  payload: { userId },
});

const user_update_success = (response) => ({
  type: types.USER_DATA_UPDATE_SUCCESS,
  payload: response,
});

const user_update_error = (error) => ({
  type: types.USER_DATA_UPDATE_ERROR,
  payload: error,
});

export default {
  user_data_request,
  user_data_success,
  user_data_error,
  user_update_request,
  user_update_success,
  user_update_error,
};
