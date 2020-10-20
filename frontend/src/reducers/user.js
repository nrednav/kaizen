import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_LOGOUT_REQUEST,
} from '../constants/user';

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, profile: action.payload };
    case USER_LOGIN_FAILURE:
      return { loading: false, loginError: action.payload };
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, profile: action.payload };
    case USER_REGISTER_FAILURE:
      return { loading: false, registerError: action.payload };
    case USER_LOGOUT_REQUEST:
      return {};
    default:
      return state;
  }
};
