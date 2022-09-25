import { USER_PROFILE_TYPES } from "../actions/profileAction";

const initialState = {
  loading: false,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE_TYPES.GET_COLLECTED:
      return action.payload;
    case USER_PROFILE_TYPES.GET_FAVOURITE:
      return action.payload;
    case USER_PROFILE_TYPES.GET_CLAIM_POOL:
      return action.payload;
    case USER_PROFILE_TYPES.GET_IGO_PARTICIPATED_POOL:
      return action.payload;

    default:
      return state;
  }
};

export default profileReducer;
