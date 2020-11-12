import axios from 'axios';
import { USER_LOGIN_SUCCESS } from '../constants/user';

import * as upc from '../constants/userProfile';

export const fetchProfile = (userID) => async (dispatch, getState) => {
  try {
    dispatch({ type: upc.FETCH_PROFILE_REQUEST });

    const {
      user: { profile },
    } = getState();

    const config = {
      'Content-Type': 'application/json',
      headers: {
        Authorization: `Bearer ${profile.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${userID}`, config);

    dispatch({ type: upc.FETCH_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: upc.FETCH_PROFILE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProfile = (updatedProfile) => async (dispatch, getState) => {
  try {
    dispatch({ type: upc.UPDATE_PROFILE_REQUEST });

    const {
      user: { profile },
    } = getState();

    const config = {
      'Content-Type': 'application/json',
      headers: {
        Authorization: `Bearer ${profile.token}`,
      },
    };

    const { data } = await axios.put(
      '/api/users/profile',
      updatedProfile,
      config
    );

    dispatch({ type: upc.UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userProfile', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: upc.UPDATE_PROFILE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
