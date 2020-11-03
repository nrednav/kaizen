import * as ac from '../constants/admin';

export const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case ac.FETCH_USERS_REQUEST:
      return { ...state, loading: true };
    case ac.FETCH_USERS_SUCCESS:
      return { ...state, loading: false, list: action.payload };
    case ac.FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deletedUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ac.USER_DELETE_REQUEST:
      return { ...state, loading: true };
    case ac.USER_DELETE_SUCCESS:
      return { ...state, loading: false, success: true };
    case ac.USER_DELETE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
