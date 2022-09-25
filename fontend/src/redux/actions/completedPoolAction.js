import GlobalTypes from "./GlobalTypes";
import { postDataAPI, getDataAPI, putDataAPI, deleteDataAPI } from "../../utils/API";
import axios from "axios";

export const COMPLETEDPOOL_TYPES = {
	LOADING: "LOADING",
	CREATE_COMPLETEDPOOL: "CREATE_COMPLETEDPOOL",
	GET_COMPLETEDPOOL: "GET_COMPLETEDPOOL",
	ID : "ID",
	GET_COMPLETEDPOOLBYID : "GET_COMPLETEDPOOLBYID"

};

export const creatcompletedpool =
	(data, images, text, auth) =>
	async (dispatch) => {
		data.description = text;
		try {
	
			dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
			if (!images) {
				return dispatch({
					type: GlobalTypes.NOTIFY,
					payload: { error: "please upload logo" },
				});
			}

			var formData = new FormData();
			formData.append("file", images);
			const resp = await axios.post("/api/uploadlogocompletedpool", formData, {
				headers: { "content-type": "multipart/form-data",  Authorization: auth.token  },
			});
            console.log('hello')
			const res = await postDataAPI("create_completed_Pool", {
				...data,
				images: resp.data.url,
			}, auth.token);
			
			dispatch({
				type: COMPLETEDPOOL_TYPES.ID,
				payload: {
					id : res.data.id
				},
			});
			
			dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
			
			dispatch({
				type: GlobalTypes.NOTIFY,
				payload: {
					success: "pool created successfully",
				
				},
			});
			dispatch({
				type: COMPLETEDPOOL_TYPES.ID,
				payload: {
					id : ''
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

export const getcompletedbyid = (id) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
		const res = await getDataAPI(`getCompletedAdmin/${id}`);
		dispatch({
			type: COMPLETEDPOOL_TYPES.GET_COMPLETEDPOOLBYID,
			payload: {
				
				completedpool : res.data.Completedpool,
				
			},
		});

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: { error: err.response.data.msg },
		});
	}
};


export const getcompletedpool = (page) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
		const res = await getDataAPI("get_completedAdminPool", page);
		dispatch({
			type: COMPLETEDPOOL_TYPES.GET_COMPLETEDPOOL,
			payload: {
				paginatedCompletedAdmin_pool : res.data.paginatedCompletedAdmin_pool,				
				totalCompletedPage: res.data.totalCompletedPage,
			},
		});

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: { error: err.response.data.msg },
		});
	}
};

export const getcompletedpoolpagination = (page) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
		const res = await getDataAPI("get_completedAdminPoolPagination", page);
		dispatch({
			type: COMPLETEDPOOL_TYPES.GET_COMPLETEDPOOL,
			payload: {
				totalcompletedPage : res.data.totalcompletedPage,				
				paginatedcompleted_pool: res.data.paginatedcompleted_pool,
			},
		});

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: { error: err.response.data.msg },
		});
	}
};

export const updatecompletedpool =
	(
		data,
		id,
		image,
		oldimage,
		text,
		auth
	) =>
	
	async (dispatch) => {
		data.description = text;
		try {
			
			dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
			if (image) {
				var IMG = "x";
			} else {
				IMG = "y";
			}


			var formData = new FormData();
			formData.append("file", image);
			formData.append("imgname", IMG);
			formData.append("id", id);
			//upload image
			if(image){
				const res = await axios.post("/api/updatelogocompletedpool", formData, {
					headers: { "content-type": "multipart/form-data",  Authorization: auth.token  },
				});
	
				await putDataAPI("update_completed_admin_pool", {
					...data,
					id: id,
					images: res.data.url,
				}, auth.token);
			}else{
				await putDataAPI("update_completed_admin_pool", {
					...data,
					id: id,		
				}, auth.token);
			}
			
			
			dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
			dispatch({
				type: GlobalTypes.NOTIFY,
				payload: {
					success: "completed pool updated successfully",
				},
			});
		} catch (err) {
			dispatch({
				type: GlobalTypes.NOTIFY,
				payload: { error: err.response.data.msg },
			});
		}
	};

	export const deletecompletedPool = (id, auth) => async (dispatch) => {
		try {
			dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
			const res = await deleteDataAPI("delete_completed_Pool", id, auth.token);
	
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
	

