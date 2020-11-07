import * as pc from '../constants/product';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case pc.FETCH_PRODUCTS_REQUEST:
      return { loading: true, products: [] };
    case pc.FETCH_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload };
    case pc.FETCH_PRODUCTS_FAILURE:
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
    case pc.FETCH_PRODUCT_REQUEST:
      return { loading: true, ...state };
    case pc.FETCH_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload };
    case pc.FETCH_PRODUCT_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case pc.DELETE_PRODUCT_REQUEST:
      return { loading: true, ...state };
    case pc.DELETE_PRODUCT_SUCCESS:
      return { loading: false, success: true };
    case pc.DELETE_PRODUCT_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
