import axios from 'axios';

import * as pc from '../constants/product';

export const fetchProducts = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: pc.FETCH_PRODUCTS_REQUEST });
    const { data } = await axios.get(
      `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
    );
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

export const addReview = (review, productID) => async (dispatch, getState) => {
  try {
    dispatch({ type: pc.ADD_REVIEW_REQUEST });

    const {
      user: { profile },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${profile.token}`,
      },
    };

    await axios.post(`/api/products/${productID}/reviews`, review, config);

    dispatch({ type: pc.ADD_REVIEW_SUCCESS });
  } catch (error) {
    dispatch({
      type: pc.ADD_REVIEW_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: pc.FETCH_TOP_PRODUCTS_REQUEST });
    const { data } = await axios.get('/api/products/top');
    dispatch({ type: pc.FETCH_TOP_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: pc.FETCH_TOP_PRODUCTS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
