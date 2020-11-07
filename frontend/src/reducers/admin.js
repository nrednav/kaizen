import * as ac from '../constants/admin';

export const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case ac.FETCH_USERS_REQUEST:
      return { ...state, loading: true };
    case ac.FETCH_USERS_SUCCESS:
      return { ...state, loading: false, list: action.payload };
    case ac.FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ac.FETCH_USERS_RESET:
      return {};
    default:
      return state;
  }
};

export const ordersReducer = (state = {}, action) => {
  switch (action.type) {
    case ac.FETCH_ORDERS_REQUEST:
      return { ...state, loading: true };
    case ac.FETCH_ORDERS_SUCCESS:
      return { ...state, loading: false, list: action.payload };
    case ac.FETCH_ORDERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ac.FETCH_ORDERS_RESET:
      return {};
    default:
      return state;
  }
};

export const deletedUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ac.DELETE_USER_REQUEST:
      return { ...state, loading: true };
    case ac.DELETE_USER_SUCCESS:
      return { ...state, loading: false, success: true };
    case ac.DELETE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updatedUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ac.UPDATE_USER_REQUEST:
      return { ...state, loading: true };
    case ac.UPDATE_USER_SUCCESS:
      return { ...state, loading: false, success: true };
    case ac.UPDATE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
