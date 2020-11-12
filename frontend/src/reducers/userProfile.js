import * as upc from '../constants/userProfile';

export const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case upc.FETCH_PROFILE_REQUEST:
      return { ...state, loading: true };
    case upc.FETCH_PROFILE_SUCCESS:
      return { ...state, loading: false, profile: action.payload };
    case upc.FETCH_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case upc.FETCH_PROFILE_RESET:
      return {};
    case upc.UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case upc.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        profile: action.payload,
      };
    case upc.UPDATE_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
