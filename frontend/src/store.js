import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import {
  productListReducer,
  productDetailsReducer,
  productAddReviewReducer,
  productTopRatedReducer,
} from './reducers/product';
import { cartReducer } from './reducers/cart';
import { userReducer } from './reducers/user';
import { userProfileReducer } from './reducers/userProfile';
import {
  shippingAddressReducer,
  paymentMethodReducer,
} from './reducers/checkout';
import {
  createdOrderReducer,
  fetchedOrderReducer,
  orderPaymentReducer,
  userOrdersReducer,
} from './reducers/order';
import {
  deletedUserReducer,
  ordersReducer,
  updatedUserReducer,
  usersReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  orderDeliverReducer,
} from './reducers/admin';

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productAddReview: productAddReviewReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  user: userReducer,
  userProfile: userProfileReducer,
  userOrders: userOrdersReducer,
  checkout: combineReducers({
    shippingAddress: shippingAddressReducer,
    paymentMethod: paymentMethodReducer,
  }),
  createdOrder: createdOrderReducer,
  fetchedOrder: fetchedOrderReducer,
  orderPayment: orderPaymentReducer,
  admin: combineReducers({
    users: usersReducer,
    orders: ordersReducer,
    deletedUser: deletedUserReducer,
    updatedUser: updatedUserReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    orderDeliver: orderDeliverReducer,
  }),
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userProfileFromStorage = localStorage.getItem('userProfile')
  ? JSON.parse(localStorage.getItem('userProfile'))
  : null;

const checkoutDetailsFromStorage = localStorage.getItem('checkoutDetails')
  ? JSON.parse(localStorage.getItem('checkoutDetails'))
  : {};

const initialState = {
  productList: { products: [] },
  productDetails: { product: {} },
  cart: { items: cartItemsFromStorage },
  user: { profile: userProfileFromStorage },
  userProfile: {},
  checkout: {
    ...checkoutDetailsFromStorage,
  },
};
const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
