import * as oc from '../constants/order';

export const createdOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case oc.CREATE_ORDER_REQUEST:
      return { ...state, loading: true };
    case oc.CREATE_ORDER_SUCCESS:
      return { ...state, loading: false, success: true, order: action.payload };
    case oc.CREATE_ORDER_FAILURE:
      return { ...state, loading: false, createOrderError: action.payload };
    default:
      return state;
  }
};

export const fetchedOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case oc.FETCH_ORDER_REQUEST:
      return { ...state, loading: true };
    case oc.FETCH_ORDER_SUCCESS:
      return { ...state, loading: false, order: action.payload };
    case oc.FETCH_ORDER_FAILURE:
      return { ...state, loading: false, fetchOrderError: action.payload };
    default:
      return state;
  }
};

export const orderPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case oc.ORDER_PAYMENT_REQUEST:
      return { ...state, loading: true };
    case oc.ORDER_PAYMENT_SUCCESS:
      return { ...state, loading: false, success: true };
    case oc.ORDER_PAYMENT_FAILURE:
      return { ...state, paymentError: action.payload };
    case oc.ORDER_PAYMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const userOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case oc.FETCH_USER_ORDERS_REQUEST:
      return { ...state, loading: true };
    case oc.FETCH_USER_ORDERS_SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case oc.FETCH_USER_ORDERS_FAILURE:
      return { ...state, loading: false, userOrdersError: action.payload };
    case oc.FETCH_USER_ORDERS_RESET:
      return { ...state, orders: [] };
    default:
      return state;
  }
};
