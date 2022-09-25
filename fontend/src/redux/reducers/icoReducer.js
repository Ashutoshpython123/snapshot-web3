import { ICO_TYPES } from "../actions/icoAction";

const initialState = {
	loading: false,
};

const icoReducer = (state = initialState, action) => {
	switch (action.type) {
		case ICO_TYPES.CREATE_ICO:
			return action.payload;
		case ICO_TYPES.GET_ICO:
			return action.payload;
		case ICO_TYPES.GET_COMPLETED:
			return action.payload
		case ICO_TYPES.GET_PROFILE:
			return action.payload
		case ICO_TYPES.DEPLOY:
			return action.payload
		case ICO_TYPES.CONTRACT_DETAIL:
			return action.payload
		default:
			return state;
	}
};

export default icoReducer;
