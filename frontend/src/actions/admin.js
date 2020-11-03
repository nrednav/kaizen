import axios from 'axios';
import * as ac from '../constants/admin';

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

    data = data.filter((user) => user._id !== profile._id);

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
    dispatch({ type: ac.USER_DELETE_REQUEST });

    const {
      user: { profile },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${profile.token}`,
      },
    };

    const { data } = await axios.delete(`/api/users/${id}`, config);

    dispatch({ type: ac.USER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: ac.USER_DELETE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
