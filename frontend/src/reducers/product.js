import * as pc from '../constants/product';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case pc.FETCH_PRODUCTS_REQUEST:
      return { loading: true };
    case pc.FETCH_PRODUCTS_SUCCESS:
      const { products, pages, page } = action.payload;
      return {
        loading: false,
        products,
        pages,
        page,
      };
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
    case pc.FETCH_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const productAddReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case pc.ADD_REVIEW_REQUEST:
      return { loading: true, ...state };
    case pc.ADD_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case pc.ADD_REVIEW_FAILURE:
      return { loading: false, error: action.payload };
    case pc.ADD_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const productTopRatedReducer = (state = {}, action) => {
  switch (action.type) {
    case pc.FETCH_TOP_PRODUCTS_REQUEST:
      return { loading: true, ...state };
    case pc.FETCH_TOP_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload };
    case pc.FETCH_TOP_PRODUCTS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
