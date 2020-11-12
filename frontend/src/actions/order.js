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

export const fetchOrder = (orderID) => async (dispatch, getState) => {
  try {
    dispatch({ type: oc.FETCH_ORDER_REQUEST });

    const {
      user: { profile },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${profile.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${orderID}`, config);

    dispatch({ type: oc.FETCH_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: oc.FETCH_ORDER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = (orderID, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: oc.ORDER_PAYMENT_REQUEST });

    const {
      user: { profile },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${profile.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${orderID}/pay`,
      paymentResult,
      config
    );

    dispatch({ type: oc.ORDER_PAYMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: oc.ORDER_PAYMENT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchUserOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: oc.FETCH_USER_ORDERS_REQUEST });

    const {
      user: { profile },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${profile.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/users/${profile._id}/orders`,
      config
    );

    dispatch({ type: oc.FETCH_USER_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: oc.FETCH_USER_ORDERS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
