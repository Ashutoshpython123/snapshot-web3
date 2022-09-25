import { COMPLETEDPOOL_TYPES } from "../actions/completedPoolAction";

const initialState = {
	loading: false,
};

const completedPoolReducer = (state = initialState, action) => {
	switch (action.type) {
		case COMPLETEDPOOL_TYPES.CREATE_COMPLETEDPOOL:
			return action.payload;
		case COMPLETEDPOOL_TYPES.GET_COMPLETEDPOOL:
			return action.payload;
		case COMPLETEDPOOL_TYPES.GET_COMPLETEDPOOLBYID:
			return action.payload;

		default:
			return state;
	}
};

export default completedPoolReducer;
