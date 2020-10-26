import * as sc from '../constants/shipping';

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: sc.SAVE_SHIPPING_ADDRESS, payload: data });

  localStorage.setItem('shippingAddress', JSON.stringify(data));
};
