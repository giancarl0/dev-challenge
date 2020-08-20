import types from './types';

const initial_state = {
  userData: {},
  isFetching: false,
  isError: false,
};

const userDataReducer = (state = initial_state, action) => {
  switch (action.type) {
    case types.USER_DATA_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });

    case types.USER_DATA_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        isError: true,
      });

    case types.USER_DATA_SUCCESS:
      let userData = action.payload;
      return Object.assign({}, state, {
        ...userData,
        isFetching: false,
      });

    case types.USER_DATA_UPDATE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });

    case types.USER_DATA_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isError: false,
      });

    case types.USER_DATA_UPDATE_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        isError: true,
      });

    default:
      return state;
  }
};

export default userDataReducer;
