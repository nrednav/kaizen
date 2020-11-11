import axios from 'axios';
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_REQUEST,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
} from '../constants/user';
import { FETCH_PROFILE_RESET } from '../constants/userProfile';

import { FETCH_USER_ORDERS_RESET } from '../constants/order';
import {
  DELIVER_ORDER_RESET,
  FETCH_ORDERS_RESET,
  FETCH_USERS_RESET,
} from '../constants/admin';
import { RESET_SHIPPING_ADDRESS } from '../constants/checkout';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userProfile', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/register',
      { name, email, password },
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userProfile', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userProfile');
  dispatch({ type: FETCH_PROFILE_RESET });
  dispatch({ type: FETCH_USER_ORDERS_RESET });
  dispatch({ type: FETCH_USERS_RESET });
  dispatch({ type: FETCH_ORDERS_RESET });
  dispatch({ type: DELIVER_ORDER_RESET });
  dispatch({ type: RESET_SHIPPING_ADDRESS });
  dispatch({ type: USER_LOGOUT_REQUEST });
};
