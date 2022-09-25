import { ICO_TYPES } from "../actions/icoAction";

const initialState = {
	loading: false,
};

const idReducer = (state = initialState, action) => {
	switch (action.type) {
		case ICO_TYPES.ID:
			return action.payload;
		default:
			return state;
	}
};

export default idReducer;
