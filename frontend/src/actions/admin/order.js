import axios from 'axios';
import * as ac from '../../constants/admin';

export const fetchOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ac.FETCH_ORDERS_REQUEST });

    const {
      user: { profile },
    } = getState();

    const config = {
      headers: { Authorization: `Bearer ${profile.token}` },
    };

    const { data } = await axios.get('/api/orders', config);

    dispatch({ type: ac.FETCH_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ac.FETCH_ORDERS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deliverOrder = (orderID) => async (dispatch, getState) => {
  try {
    dispatch({ type: ac.DELIVER_ORDER_REQUEST });

    const {
      user: { profile },
    } = getState();

    const config = {
      headers: { Authorization: `Bearer ${profile.token}` },
    };

    await axios.put(`/api/orders/${orderID}/deliver`, {}, config);

    dispatch({ type: ac.DELIVER_ORDER_SUCCESS });
  } catch (error) {
    dispatch({
      type: ac.DELIVER_ORDER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
