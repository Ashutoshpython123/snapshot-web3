import GlobalTypes from "./GlobalTypes";
import axios from "axios";
import { getDataAPI, putDataAPI, deleteDataAPI, getAPI, postDataAPI } from "../../utils/API";
import { X_AUTH_TOKEN } from "../../utils/config";

export const ICO_TYPES = {
	LOADING: "LOADING",
	CREATE_ICO: "CREATE_ICO",
	GET_ICO: "GET_ICO",
	ID: "ID",
	GET_COMPLETED: "GET_COMPLETED",
	GET_PROFILE: "GET_PROFILE",
	DEPLOY: "DEPLOY",
	CONTRACT_DETAIL: "CONTRACT_DETAIL"
};

export const creatICO =
	(data, images, abi, text, auth) =>
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

				var abiName = ''
				if (abi) {
					abiName = 'abi';
				}

				var formData = new FormData();
				formData.append("file", images);
				formData.append("abi", abi)
				formData.append("abiName", abiName)

				const resp = await axios.post("/api/upload", formData, {
					headers: { "content-type": "multipart/form-data", Authorization: auth.token },
				});
				const res = await postDataAPI("create_upcPool", {
					...data,
					images: resp.data.url,
					abi_name: abi.name
				}, auth.token);

				dispatch({
					type: ICO_TYPES.ID,
					payload: {
						id: res.data.id
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
					type: ICO_TYPES.ID,
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

export const getico = (page) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
		const res = await getDataAPI("get_upcPool", page);

		dispatch({
			type: ICO_TYPES.GET_ICO,
			payload: {
				pool: res.data.pool,
				upcpool: res.data.upcPool,
				featured: res.data.featured,
				paginatedFeatured_pool: res.data.paginatedFeatured_pool,
				totalfeaturedPage: res.data.totalfeaturedPage,
				paginatedUpcomming_pool: res.data.paginatedUpcomming_pool,
				totalUpcommingPage: res.data.totalUpcommingPage,
				completed_Pool: res.data.completed_Pool,
				totalcompletedPage: res.data.totalcompletedPage,
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

export const getcompleted = (page) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
		const res = await getDataAPI("get_completedPool", page);

		dispatch({
			type: ICO_TYPES.GET_COMPLETED,
			payload: {
				paginatedcompleted_pool: res.data.paginatedcompleted_pool,
				pool: res.data.pool,
				upcpool: res.data.upcPool,
				featured: res.data.featured,
				paginatedFeatured_pool: res.data.paginatedFeatured_pool,
				totalfeaturedPage: res.data.totalfeaturedPage,
				paginatedUpcomming_pool: res.data.paginatedUpcomming_pool,
				totalUpcommingPage: res.data.totalUpcommingPage,
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

export const getprofile = (data) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
		const res = await getDataAPI("get_profile", data);

		dispatch({
			type: ICO_TYPES.GET_PROFILE,
			payload: {
				compleated_profile_pool: res.data.paginatedcompleted_pool,
				num_of_completed_pool: res.data.totalcompletedPage,
				vesting: res.data.vesting
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

export const createUserAllocation = (data, igo_id, igo_type) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
		const res = await postDataAPI("allocation", { data: data, igo_id: igo_id.split(' ').slice(-1)[0], igo_type: igo_type });
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		if (err && err.response && err.response.data) {
			dispatch({
				type: GlobalTypes.NOTIFY,
				payload: {
					error: err.response.data.msg,
				},
			});
		}
	}
};


export const updateico =
	(
		data,
		id,
		image,
		oldimage,
		abi,
		abi_name,
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

				if (abi) {
					var abiName = id + abi.name;
					var ABI = "x";
				} else {
					abiName = abi_name;
					ABI = "y";
				}

				var formData = new FormData();
				formData.append("file", image);
				formData.append("imgname", IMG);

				formData.append("abi", abi)
				formData.append("abiname", ABI)

				formData.append("id", id);
				//upload image
				if (image) {
					const res = await axios.post("/api/uploadtobucket", formData, {
						headers: { "content-type": "multipart/form-data", Authorization: auth.token },
					});

					await putDataAPI("update_upcPool", {
						...data,
						id: id,
						images: res.data.url,
						abi_name: abiName,
					}, auth.token);
				} else {
					await putDataAPI("update_upcPool", {
						...data,
						id: id,
						abi_name: abiName,
					}, auth.token);
				}


				dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
				dispatch({
					type: GlobalTypes.NOTIFY,
					payload: {
						success: "updated successfully",
					},
				});
			} catch (err) {
				dispatch({
					type: GlobalTypes.NOTIFY,
					payload: { error: err.response.data.msg },
				});
			}
		};

export const deleteico = (id, auth) => async (dispatch) => {
	try {
		console.log(id, 'delete ico')
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
		const res = await deleteDataAPI("delete_upcPool", id, auth.token);

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


export const deploynewcontract = (data, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
		const res = await postDataAPI("deploy", { data: data }, auth.token);
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		console.log(res.data.receipt)
		dispatch({
			type: ICO_TYPES.DEPLOY,
			payload: {
				receipt: res.data.receipt
			},
		});
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: 'SUCCESS',
			},
		});

	} catch (err) {
		if (err && err.response && err.response.data) {
			dispatch({
				type: GlobalTypes.NOTIFY,
				payload: {
					error: err.response.data.msg,
				},
			});
		}
	}
};

export const updatetier = (id, data, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
		const res = await postDataAPI("updatetiers", { id: id, data: data }, auth.token);
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		if (err && err.response && err.response.data) {
			dispatch({
				type: GlobalTypes.NOTIFY,
				payload: {
					error: err.response.data.msg,
				},
			});
		}
	}
};

export const updatesalestart = (id, startSale, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
		const res = await postDataAPI("updatesaletime", { id: id, startSale: startSale, }, auth.token);

		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		if (err && err.response && err.response.data) {
			dispatch({
				type: GlobalTypes.NOTIFY,
				payload: {
					error: err.response.data.msg,
				},
			});
		}
	}
};

export const updatesaleend = (id, endSale, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
		const res = await postDataAPI("updatesaleendtime", { id: id, endSale: endSale }, auth.token);
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		if (err && err.response && err.response.data) {
			dispatch({
				type: GlobalTypes.NOTIFY,
				payload: {
					error: err.response.data.msg,
				},
			});
		}
	}
};

export const updatepaused = (id, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
		const res = await postDataAPI("updatesalepaused", { id: id }, auth.token);
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		if (err && err.response && err.response.data) {
			dispatch({
				type: GlobalTypes.NOTIFY,
				payload: {
					error: err.response.data.msg,
				},
			});
		}
	}
};

export const updateunpaused = (id, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
		const res = await postDataAPI("updatesaleunpaused", { id: id }, auth.token);
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		if (err && err.response && err.response.data) {
			dispatch({
				type: GlobalTypes.NOTIFY,
				payload: {
					error: err.response.data.msg,
				},
			});
		}
	}
};

export const contractdetail = (id, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
		const res = await axios.get(`/api/contract_detail/${id}`, {
			headers: { Authorization: auth.token },
		});
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });

		dispatch({
			type: ICO_TYPES.CONTRACT_DETAIL,
			payload: {
				contract_detail: res.data,
			},
		});
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		if (err && err.response && err.response.data) {
			dispatch({
				type: GlobalTypes.NOTIFY,
				payload: {
					error: err.response.data.msg,
				},
			});
		}
	}
};


export const updateconfig = (id, gas, gasPrice, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
		const res = await postDataAPI("updateconfig", { id: id, gas: gas, gasPrice: gasPrice }, auth.token);
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		if (err && err.response && err.response.data) {
			dispatch({
				type: GlobalTypes.NOTIFY,
				payload: {
					error: err.response.data.msg,
				},
			});
		}
	}
};

export const dumpEvent = (data, blockNumber) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
		const res = await getAPI(`eventFetch/${data}?blocknumber=${blockNumber}`);
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

export const addvesting = (data, addr, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
		const res = await postDataAPI("createVestings", { addr: addr, ...data }, auth.token);
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		if (err && err.response && err.response.data) {
			dispatch({
				type: GlobalTypes.NOTIFY,
				payload: {
					error: err.response.data.msg,
				},
			});
		}
	}
};

export const updatemaxcap = (id, maxCap, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
		const res = await postDataAPI("updatemaxcap", { id: id, maxCap: maxCap }, auth.token);
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.msg,
			},
		});

	} catch (err) {
		if (err && err.response && err.response.data) {
			dispatch({
				type: GlobalTypes.NOTIFY,
				payload: {
					error: err.response.data.msg,
				},
			});
		}
	}
};

export const addprofilecsv = (data, addr, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });

		const res = await postDataAPI("addprofilecsv", { data: data, addr: addr.toLowerCase() }, auth.token);

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

export const addProject = (id, title, auth) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
		const res = await axios.post("https://snapshotapi.seedify.fund/api/v1/project/add", { "name": title }, {
			headers: {
				'origin': "https://launchpad.seedify.info",
				'api-key': X_AUTH_TOKEN,
			},
		}); 
		await postDataAPI("add_project", { id: id, projectId: res.data.data.projectId }, auth.token)
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });

		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				success: res.data.message,
			},
		});

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.message,
			},
		});
	}
};

export const userSubscribe = (userid, projectid) => async (dispatch) => {
	try {
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
		const res = await axios.post("https://snapshotapi.seedify.fund/api/v1/user/subscribe", { "userId": userid, "projectId" : projectid }, {
			headers: {
				"origin": "https://launchpad.seedify.info",
				"api-key": X_AUTH_TOKEN,
			},
		}); 
		
		dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
		if(res.data.status){
			dispatch({
				type: GlobalTypes.NOTIFY,
				payload: {
					success: res.data.message,
				},
			});
		}else{
			dispatch({
				type: GlobalTypes.NOTIFY,
				payload: {
					error: res.data.message,
				},
			});
		}		

	} catch (err) {
		dispatch({
			type: GlobalTypes.NOTIFY,
			payload: {
				error: err.response.data.message,
			},
		});
	}
};