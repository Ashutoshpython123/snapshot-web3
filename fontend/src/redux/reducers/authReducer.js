import GlobalTypes from "../actions/GlobalTypes";

const initialState = {};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case GlobalTypes.AUTH:
			return action.payload;

		default:
			return state;
	}
};

export default authReducer;
