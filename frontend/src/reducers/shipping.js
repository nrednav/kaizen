import * as sc from '../constants/shipping';

export const shippingReducer = (state = { shippingAddress: {} }, action) => {
  switch (action.type) {
    case sc.SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
