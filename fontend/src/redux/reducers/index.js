import { combineReducers } from "redux";
import auth from "./authReducer";
import notify from "./notifyReducer";
import ico from "./icoReducer";
import whitelistredcr from "./whitelistReducer";
import claimtoken from "./claimTokenReducer"
import icoid from "./idReducer";
import metamask from "./metamaskReducer";
import completedpoolredcr from "./completedPoolReducer"
import completedidredcr from "./completedidReducer"
import profileReducer from "./profileReducer"
import pollsReducer from "./pollsReducer"

export default combineReducers({
	auth,
	notify,
	ico,
	whitelistredcr,
	claimtoken,
	icoid,
	metamask,
	completedpoolredcr,
	completedidredcr,
	profileReducer,
	pollsReducer
});
