import GlobalTypes from "./GlobalTypes";
import axios from "axios";
import { deleteDataAPI, getAPI, getAPIID, getDataAPI, getVotingAPI, postDataAPI, putDataAPI } from "../../utils/API";

export const POLLS_TYPES = {
	LOADING: "LOADING",
	CREATE_POLLS: "CREATE_POLLS",
	DELETE_POLL: "DELETE_POLL",
	UPDATE_POLL: "UPDATE_POLL",
	GET_POLL: "GET_POLL",
	GET_POLL_BY_ID:"GET_POLL_BY_ID",
	GIVE_VOTE:"GIVE_VOTE",
	GET_VOTER:"GET_VOTER",
	ID: "ID",
};

export const creatPOLL =
	(data, auth) =>
		async (dispatch) => {
			try {

				dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
				const res = await postDataAPI("create_polls", data, auth.token);

				dispatch({
					type: POLLS_TYPES.CREATE_POLLS,
					payload: {
						id: res.data.id
					},
				});

				dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });

				dispatch({
					type: GlobalTypes.NOTIFY,
					payload: {
						success: "poll created successfully",

					},
				});
				dispatch({
					type: POLLS_TYPES.ID,
					payload: {
						id: ''
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

export const updatePOLL =
	(data, auth) =>
		async (dispatch) => {
			try {

				dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
				const res = await putDataAPI("update_poll", data, auth.token);

				dispatch({
					type: POLLS_TYPES.ID,
					payload: {
						id: res.data.id
					},
				});

				dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });

				dispatch({
					type: GlobalTypes.NOTIFY,
					payload: {
						success: "poll update successfully",

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

export const deletePOLL =
	(id, auth) =>
		async (dispatch) => {
			try {

				dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
				const res = await deleteDataAPI("delete_poll", id, auth.token);

				dispatch({
					type: POLLS_TYPES.DELETE_POLL,
					payload: {
						message: res.data.msg
					},
				});

				dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });

				dispatch({
					type: GlobalTypes.NOTIFY,
					payload: {
						success: "poll deleted successfully",

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


export const getPOLLBYID =(id) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
		const res = await getAPIID("get_poll",id);

		dispatch({
			type: POLLS_TYPES.GET_POLL_BY_ID,
			payload: {
				singlepoll: res.data,
			},
		});

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: { error: err.response.data.msg },
		});
	}
}

export const getPOLLS = (page, type) => async (dispatch) => {
	try {
		// dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
		const res = await getVotingAPI("getPolls_pagignation", page, type);

		dispatch({
			type: POLLS_TYPES.GET_POLL,
			payload: {
				poll: res.data,
			},
		});

		// dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: { error: err.response.data.msg },
		});
	}
};

export const giveVote = (data) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
		const res = await postDataAPI("vote", data);

		dispatch({
			type: POLLS_TYPES.GIVE_VOTE,
			payload: {
				voted: res.data,
			},
		});

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });

		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,

			},
		});
		dispatch({
			type: POLLS_TYPES.GIVE_VOTE,
			payload: {
				voted: ''
			},
		});
	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: { error: err.response.data.msg },
		});
	}
};

export const userVotingDetails = (address,poll_id) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
		const res = await getAPI(`voter/?poll_id=${poll_id}&address=${address}`);

		dispatch({
			type: POLLS_TYPES.GET_VOTER,
			payload: {
				voter: res.data,
			},
		});

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: POLLS_TYPES.GET_VOTER,
			payload: {
				voter: ''
			},
		});
	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: { error: err.response.data.msg },
		});
	}
};












