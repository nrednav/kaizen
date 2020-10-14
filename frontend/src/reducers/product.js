import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
} from '../constants/product';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return { loading: true, products: [] };
    case FETCH_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload };
    case FETCH_PRODUCTS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return { loading: true, ...state };
    case FETCH_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload };
    case FETCH_PRODUCT_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
