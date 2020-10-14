import { ADD_CART_ITEM, REMOVE_CART_ITEM } from '../constants/cart';

export const cartReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      const item = action.payload;
      const itemExists = state.items.find(
        (existingItem) => existingItem.id === item.id
      );

      if (itemExists) {
        return {
          ...state,
          items: state.items.map((existingItem) =>
            existingItem.id === item.id ? item : existingItem
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, item],
        };
      }
      break;

    case REMOVE_CART_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
      break;

    default:
      return state;
  }
};
