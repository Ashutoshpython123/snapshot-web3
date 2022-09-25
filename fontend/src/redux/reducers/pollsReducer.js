import { POLLS_TYPES } from "../actions/pollsAction";

const initialState = {
	loading: false,
};

const pollsReducer = (state = initialState, action) => {
	switch (action.type) {
		case POLLS_TYPES.CREATE_POLLS:
			return action.payload;
		case POLLS_TYPES.GET_POLL:
			return action.payload;
		case POLLS_TYPES.UPDATE_POLL:
			return action.payload;
		case POLLS_TYPES.DELETE_POLL:
			return action.payload;
		case POLLS_TYPES.GET_POLL_BY_ID:
			return action.payload;
		case POLLS_TYPES.GIVE_VOTE:
			return action.payload;
		case POLLS_TYPES.GET_VOTER:
			return action.payload;
		// case ICO_TYPES.GET_COMPLETED:
		// 	return action.payload
		// case ICO_TYPES.GET_PROFILE:
		// 	return action.payload
		// case ICO_TYPES.DEPLOY:
		// 	return action.payload
		// case ICO_TYPES.CONTRACT_DETAIL:
		// 	return action.payload
		default:
			return state;
	}
};

export default pollsReducer;
