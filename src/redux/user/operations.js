import actions from './actions';
import utils from './utils';

const get_user_data = () => {
  return (dispatch) => {
    dispatch(actions.user_data_request());
    utils
      .getUserData()
      .then((response) => {
        dispatch(actions.user_data_success(response.data));
      })
      .catch((error) => {
        console.error('Error in getting user data');
        dispatch(actions.user_data_error(error));
      });
  };
};

const update_user_data = (userId, dataUpdates) => {
  return (dispatch) => {
    dispatch(actions.user_update_request());
    utils
      .updateUserData(userId, dataUpdates)
      .then((response) => {
        dispatch(actions.user_update_success(response));
      })
      .catch((error) => {
        console.error('Error in getting user data');
        dispatch(actions.user_update_error(error));
      });
  };
};

export default {
  get_user_data,
  update_user_data,
};
