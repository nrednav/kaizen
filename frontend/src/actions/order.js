import axios from 'axios';

import * as oc from '../constants/order';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: oc.CREATE_ORDER_REQUEST });

    const {
      user: { profile },
    } = getState();

    const config = {
      'Content-Type': 'application/json',
      headers: {
        Authorization: `Bearer ${profile.token}`,
      },
    };

    const { data } = await axios.post('/api/orders', order, config);

    dispatch({ type: oc.CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: oc.CREATE_ORDER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
