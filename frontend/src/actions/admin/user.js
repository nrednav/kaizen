import axios from 'axios';
import * as ac from '../../constants/admin';

export const fetchUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ac.FETCH_USERS_REQUEST });

    const {
      user: { profile },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${profile.token}`,
      },
    };

    let { data } = await axios.get('/api/users', config);

    dispatch({ type: ac.FETCH_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ac.FETCH_USERS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ac.DELETE_USER_REQUEST });

    const {
      user: { profile },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${profile.token}`,
      },
    };

    await axios.delete(`/api/users/${id}`, config);

    dispatch({ type: ac.DELETE_USER_SUCCESS });
  } catch (error) {
    dispatch({
      type: ac.DELETE_USER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: ac.UPDATE_USER_REQUEST });

    const {
      user: { profile },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${profile.token}`,
      },
    };

    await axios.put(`/api/users/${user._id}`, user, config);

    dispatch({ type: ac.UPDATE_USER_SUCCESS });
  } catch (error) {
    dispatch({
      type: ac.UPDATE_USER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
