import { WHITELIST_TYPES } from "../actions/whitelistAction";
const initialState = {
	loading: false,
};

const whitelistReducer = (state = initialState, action) => {
	switch (action.type) {
		case WHITELIST_TYPES.GET_TIER:
			return action.payload;
		default:
			return state;
	}
};

export default whitelistReducer;
