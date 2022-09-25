import { COMPLETEDPOOL_TYPES } from "../actions/completedPoolAction";

const initialState = {
	loading: false,
};

const completedidReducer = (state = initialState, action) => {
	switch (action.type) {
		case COMPLETEDPOOL_TYPES.ID:
			return action.payload;
		default:
			return state;
	}
};

export default completedidReducer;
