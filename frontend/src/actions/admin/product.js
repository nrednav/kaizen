import axios from 'axios';
import * as ac from '../../constants/admin';

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ac.DELETE_PRODUCT_REQUEST });

    const {
      user: { profile },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${profile.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({ type: ac.DELETE_PRODUCT_SUCCESS });
  } catch (error) {
    dispatch({
      type: ac.DELETE_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: ac.CREATE_PRODUCT_REQUEST });

    const {
      user: { profile },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${profile.token}`,
      },
    };

    await axios.post('/api/products', product, config);

    dispatch({ type: ac.CREATE_PRODUCT_SUCCESS });
  } catch (error) {
    dispatch({
      type: ac.CREATE_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
