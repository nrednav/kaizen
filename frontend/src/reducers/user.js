import * as uc from '../constants/user';

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case uc.USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case uc.USER_REGISTER_SUCCESS:
      return { ...state, loading: false, profile: action.payload };
    case uc.USER_REGISTER_FAILURE:
      return { ...state, loading: false, registerError: action.payload };
    case uc.USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case uc.USER_LOGIN_SUCCESS:
      return { ...state, loading: false, profile: action.payload };
    case uc.USER_LOGIN_FAILURE:
      return { ...state, loading: false, loginError: action.payload };
    case uc.USER_LOGOUT_REQUEST:
      return {};
    default:
      return state;
  }
};
