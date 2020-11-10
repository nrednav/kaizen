import axios from 'axios';

import * as pc from '../constants/product';

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch({ type: pc.FETCH_PRODUCTS_REQUEST });
    const { data } = await axios.get('/api/products');
    dispatch({ type: pc.FETCH_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: pc.FETCH_PRODUCTS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: pc.FETCH_PRODUCT_RESET });
    dispatch({ type: pc.FETCH_PRODUCT_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: pc.FETCH_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: pc.FETCH_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
