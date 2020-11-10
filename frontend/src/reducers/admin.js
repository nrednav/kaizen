import * as ac from '../constants/admin';

// Users
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

// Products
export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ac.DELETE_PRODUCT_REQUEST:
      return { loading: true, ...state };
    case ac.DELETE_PRODUCT_SUCCESS:
      return { loading: false, success: true };
    case ac.DELETE_PRODUCT_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ac.CREATE_PRODUCT_REQUEST:
      return { loading: true, ...state };
    case ac.CREATE_PRODUCT_SUCCESS:
      return { loading: false, success: true };
    case ac.CREATE_PRODUCT_FAILURE:
      return { loading: false, error: action.payload };
    case ac.CREATE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ac.UPDATE_PRODUCT_REQUEST:
      return { loading: true, ...state };
    case ac.UPDATE_PRODUCT_SUCCESS:
      return { loading: false, success: true };
    case ac.UPDATE_PRODUCT_FAILURE:
      return { loading: false, error: action.payload };
    case ac.UPDATE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

// Orders
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
