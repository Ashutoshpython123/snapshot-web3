import GlobalTypes from "../actions/GlobalTypes";

const initialState = {
	loading: false,
};

const notifyReducer = (state = initialState, action) => {
	switch (action.type) {
		case GlobalTypes.NOTIFY:
			return action.payload;
		default:
			return state;
	}
};

export default notifyReducer;
