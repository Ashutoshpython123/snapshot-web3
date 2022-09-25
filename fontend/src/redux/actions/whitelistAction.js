import GlobalTypes from "./GlobalTypes";
import { postDataAPI,getTierAPI, deleteDataAPI } from "../../utils/API";
import axios from 'axios';

export const WHITELIST_TYPES = {
	LOADING: "LOADING",
	GET_TIER: "GET_TIER"
};

export const addwhitelist1 = (white_list, id, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await postDataAPI("createwhitelist1", {white_list1:white_list, id : id}, auth.token);

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};


export const addwhitelist2 = (white_list, id, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await postDataAPI("createwhitelist2", {white_list2 : white_list, id :id}, auth.token );

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};


export const addwhitelist3 = (white_list, id, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await postDataAPI("createwhitelist3", {white_list3 : white_list, id:id}, auth.token );

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};


export const addwhitelist4 = (white_list, id, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await postDataAPI("createwhitelist4", {white_list4 : white_list, id:id}, auth.token );

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};


export const addwhitelist5 = (white_list, id, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await postDataAPI("createwhitelist5", {white_list5 : white_list, id:id}, auth.token );

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};

export const addwhitelist6 = (white_list, id, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await postDataAPI("createwhitelist6", {white_list6 : white_list, id:id}, auth.token );

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};


export const addwhitelist7 = (white_list, id, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await postDataAPI("createwhitelist7", {white_list7 : white_list, id:id}, auth.token );

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};

export const addwhitelist8 = (white_list, id, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await postDataAPI("createwhitelist8", {white_list8 : white_list, id:id}, auth.token );

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};

export const addwhitelist9 = (white_list, id, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await postDataAPI("createwhitelist9", {white_list9 : white_list, id:id}, auth.token );

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};

export const uploadwhitelistone = (id) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await axios.get(`/api/addwhitelistone/${id}`);

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};

export const uploadwhitelisttwo = (id) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await axios.get(`/api/addwhitelisttwo/${id}`);

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};

export const uploadwhitelistthree = (id) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await axios.get(`/api/addwhitelistthree/${id}`);

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success:  res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};

export const uploadwhitelistfour = (id) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await axios.get(`/api/addwhitelistfour/${id}`);

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};

export const uploadwhitelistfive = (id) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await axios.get(`/api/addwhitelistfive/${id}`);

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};

export const uploadwhitelistsix = (id) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await axios.get(`/api/addwhitelistsix/${id}`);

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};

export const uploadwhitelistseven = (id) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await axios.get(`/api/addwhitelistseven/${id}`);

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};

export const uploadwhitelisteight = (id) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await axios.get(`/api/addwhitelisteight/${id}`);

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};

export const uploadwhitelistnine = (id) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await axios.get(`/api/addwhitelistnine/${id}`);

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};

export const gettier = (id,address) => async (dispatch) => {
	try {
		console.log('getcsv data')
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
		const res = await getTierAPI("csv_get",[id,address]);

		dispatch({
			type: WHITELIST_TYPES.GET_TIER,
			payload: {
				tier_data: res.data.tier_data,	
			},
		});

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success:  res.data.msg,
			},
		});
	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: { error: err.response.data.msg },
		});
	}
};

//adding csv data to whitelist from admin side
export const addcsvfiletowhitelistone = (data, id, auth) => async (dispatch) => {
	try {
		
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await postDataAPI("addcsvfiletowhitelistone",{data : data, id : id}, auth.token);
		
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};

export const addcsvfiletowhitelisttwo = (data, id, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await postDataAPI("addcsvfiletowhitelisttwo",{data : data, id : id},  auth.token);

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};

export const addcsvfiletowhitelistthree = (data, id, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await postDataAPI("addcsvfiletowhitelistthree",{data : data, id : id}, auth.token);
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};

export const addcsvfiletowhitelistfour = (data, id, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await postDataAPI("addcsvfiletowhitelistfour",{data : data, id : id}, auth.token);

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};

export const addcsvfiletowhitelistfive = (data, id, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await postDataAPI("addcsvfiletowhitelistfive",{data : data, id : id},  auth.token);

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};

export const addcsvfiletowhitelistsix = (data, id, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await postDataAPI("addcsvfiletowhitelistsix",{data : data, id : id}, auth.token);

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};

export const addcsvfiletowhitelistseven = (data, id, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await postDataAPI("addcsvfiletowhitelistseven",{data : data, id : id}, auth.token);

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};


export const addcsvfiletowhitelisteight = (data, id, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await postDataAPI("addcsvfiletowhitelisteight",{data : data, id : id}, auth.token);

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};


export const addcsvfiletowhitelistnine = (data, id, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await postDataAPI("addcsvfiletowhitelistnine",{data : data, id : id},  auth.token);

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};

export const deletewhitelist = (checkwhitelist,id,auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
		var res='';

		if(checkwhitelist ===1){
			res = await deleteDataAPI("deletewhitelistone", id, auth.token);
		}else if(checkwhitelist === 2){
			res = await deleteDataAPI("deletewhitelisttwo", id, auth.token);
		}else if(checkwhitelist === 3) {
			res = await deleteDataAPI("deletewhitelistthree", id, auth.token);
		}else if(checkwhitelist === 4){
			res = await deleteDataAPI("deletewhitelistfour", id, auth.token);
		}else if(checkwhitelist === 5){
			res = await deleteDataAPI("deletewhitelistfive", id, auth.token);
		}else if(checkwhitelist === 6){
			res = await deleteDataAPI("deletewhitelistsix", id, auth.token);
		}else if(checkwhitelist === 7){
			res = await deleteDataAPI("deletewhitelistseven", id, auth.token);
		}else if(checkwhitelist === 8){
			res = await deleteDataAPI("deletewhitelisteight", id, auth.token);
		}else if(checkwhitelist === 9){
			res = await deleteDataAPI("deletewhitelistnine", id, auth.token);
		}

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});
	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: { error: err.response.data.msg },
		});
	}
};



export const uploadwhitelistonebulk = (id, token) => async (dispatch) => {
	try {
		console.log(id, 'action')
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await axios.get(`/api/addwhitelistonebulk/${id}`, {
			headers: { Authorization: token },
		} );

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};

export const uploadwhitelisttwobulk = (id, token) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await axios.get(`/api/addwhitelisttwobulk/${id}`, {
			headers: { Authorization: token },
		});

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};

export const uploadwhitelistthreebulk = (id, token) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await axios.get(`/api/addwhitelistthreebulk/${id}`, {
			headers: { Authorization: token },
		});

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success:  res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};

export const uploadwhitelistfourbulk = (id, token) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await axios.get(`/api/addwhitelistfourbulk/${id}`, {
			headers: { Authorization: token },
		});

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};

export const uploadwhitelistfivebulk = (id, token) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await axios.get(`/api/addwhitelistfivebulk/${id}`, {
			headers: { Authorization: token },
		});

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};

export const uploadwhitelistsixbulk = (id, token) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await axios.get(`/api/addwhitelistsixbulk/${id}`, {
			headers: { Authorization: token },
		} );

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};

export const uploadwhitelistsevenbulk = (id, token) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await axios.get(`/api/addwhitelistsevenbulk/${id}`, {
			headers: { Authorization: token },
		});

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};

export const uploadwhitelisteightbulk = (id, token) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await axios.get(`/api/addwhitelisteightbulk/${id}`, {
			headers: { Authorization: token },
		});

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};

export const uploadwhitelistninebulk = (id, token) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await axios.get(`/api/addwhitelistninebulk/${id}`, {
			headers: { Authorization: token },
		});

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.msg,
			},
		});
	}
};