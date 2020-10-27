import { ADD_CART_ITEM, REMOVE_CART_ITEM } from '../constants/cart';

export const cartReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      const item = action.payload;
      const itemExists = state.items.find(
        (existingItem) => existingItem.product === item.product
      );

      if (itemExists) {
        return {
          ...state,
          items: state.items.map((existingItem) =>
            existingItem.product === item.product ? item : existingItem
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, item],
        };
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.product !== action.payload),
      };

    default:
      return state;
  }
};
