import * as sc from '../constants/checkout';

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: sc.SAVE_SHIPPING_ADDRESS, payload: data });
  updateCheckoutDetails('shippingAddress', data);
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: sc.SAVE_PAYMENT_METHOD, payload: data });
  updateCheckoutDetails('paymentMethod', data);
};

const updateCheckoutDetails = (key, data) => {
  const checkoutDetailsFromStorage = localStorage.getItem('checkoutDetails')
    ? JSON.parse(localStorage.getItem('checkoutDetails'))
    : {};

  checkoutDetailsFromStorage[key] = data;

  localStorage.setItem(
    'checkoutDetails',
    JSON.stringify(checkoutDetailsFromStorage)
  );
};
