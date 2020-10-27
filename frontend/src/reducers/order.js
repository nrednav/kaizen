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
