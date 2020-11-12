import * as cc from '../constants/checkout';

export const shippingAddressReducer = (state = {}, action) => {
  if (action.type === cc.SAVE_SHIPPING_ADDRESS) {
    return { ...state, ...action.payload };
  } else if (action.type === cc.RESET_SHIPPING_ADDRESS) {
    return {};
  }

  return state;
};

export const paymentMethodReducer = (state = '', action) => {
  if (action.type === cc.SAVE_PAYMENT_METHOD) {
    return action.payload;
  }

  return state;
};
