import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/product';
import { cartReducer } from './reducers/cart';
import { userReducer } from './reducers/user';
import { userProfileReducer } from './reducers/userProfile';
import { shippingReducer } from './reducers/shipping';

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  user: userReducer,
  userProfile: userProfileReducer,
  shippingAddress: shippingReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userProfileFromStorage = localStorage.getItem('userProfile')
  ? JSON.parse(localStorage.getItem('userProfile'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const initialState = {
  productList: { products: [] },
  productDetails: { product: {} },
  cart: { items: cartItemsFromStorage },
  user: { profile: userProfileFromStorage },
  userProfile: {},
  shippingAddress: { ...shippingAddressFromStorage },
};
const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
