import { CLAIMTOKEN_TYPES } from "../actions/claimTokenAction";

const initialState = {
    loading: false,
};

const claimTokenReducer = (state = initialState, action) => {
    switch (action.type) {

        case CLAIMTOKEN_TYPES.GET_TOKEN:
            return action.payload;

        default:
            return state;
    }
};

export default claimTokenReducer;
