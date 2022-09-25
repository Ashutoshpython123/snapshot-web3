import {METAMASK_TYPES} from "../actions/metamaskAction";

const initialState = {
    active: true,
	design: false,
};

const metamaskReducer = (state = initialState, action) => {
	switch (action.type) {
		case METAMASK_TYPES.CONNECT:
			return action.payload;

		default:
			return state;
	}
};

export default metamaskReducer;
