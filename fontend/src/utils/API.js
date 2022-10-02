import axios from "axios";
import { baseUrl, X_AUTH_TOKEN } from "./config";

//here consuming API from backend

const baseurl = baseUrl;

const snapshotbaseurl = "https://snapshotapi.seedify.fund"

export const getChat = async (url, option_id, msg) => {
	const res = await axios.get(`/api/${url}?option_id=${option_id}&msg=${msg}`);
	return res;
};

export const getData = async (url, data) => {
	const res = await axios.get(`/api/${url}?data=${data}`);
	return res;
};

export const getDataAPI = async (url, page) => {
	const res = await axios.get(`/api/${url}?page=${page}`);
	return res;
};

export const getVotingAPI = async (url, page, type) => {
	const res = await axios.get(`/api/${url}?page_no=${page}&type=${type}`);
	return res;
};

export const getAPI = async (url) => {
	const res = await axios.get(`/api/${url}`);
	return res;
};

export const getAPIID = async (url, id) => {
	const res = await axios.get(`/api/${url}/${id}`);
	return res;
};

export const postDataAPI = async (url, post, token) => {

	const res = await axios.post(`${baseurl}/api/${url}`, post, {
		headers: { Authorization: token },
	});
	return res;
};

export const putDataAPI = async (url, post, token) => {
	const res = await axios.put(`/api/${url}`, post, {
		headers: { Authorization: token },
	});
	return res;
};

export const deleteDataAPI = async (url, id, token) => {
	const res = await axios.delete(`/api/${url}/${id}`, {
		headers: { Authorization: token },
	});
	return res;
};

export const getClaimAPI = async (url, address) => {
	const res = await axios.get(`/api/${url}/${address}`);
	return res;
};

export const getClaimData = async (url, addpage) => {
	const res = await axios.get(`/api/${url}?page=${addpage}`);
	return res;
};

export const getTierAPI = async (url, data) => {
	const res = await axios.get(`/api/${url}/${data}`);
	return res;
};

export const getSnftDataAPI = async (address, netWork, claimPage) => {
	const res = await axios.get(`${snapshotbaseurl}/api/v1/claim/users-pools?walletAddress=${address.toLowerCase()}&network=${netWork}&page=${claimPage}`, {
		headers: {
			"x-auth-token": X_AUTH_TOKEN
		}
	}
	);
	return res;
};


export const getIgoParticipatedAPI = async (url) => {
	const res = await axios.get(`${url}`, {
		headers: {
			origin: "https://launchpad.seedify.fund",
		}
	});
	return res;
};

export const get_api = async (url) => {
	const res = await axios.get(`${baseurl}/api/v1/${url}`, {
		headers: {
			origin: "https://launchpad.seedify.fund",
		}
	});
	return res;
};

export const post_api = async (url, data) => {
	const res = await axios.post(`${baseurl}/api/v1/${url}`, data, {
		headers: {
			origin: "https://launchpad.seedify.fund",
		}
	});
	return res;
};

export const getMyData = async (url, data, token) => {
	const res = await axios.get(`${baseurl}/api/v1/${url}/${data}`, {
		headers: { "x-auth-token": token },
	});
	return res;
};

export const getSnftByIdAPI = async (url, data, token) => {
	const res = await axios.get(`${baseurl}/api/v1/${url}/${data}`, {
		headers: { "x-auth-token": token },
	});
	return res;
};

export const postdataAPI = async (url, post, token) => {

	const res = await axios.post(`${baseurl}/api/v1/${url}`, post, {
		headers: { Authorization: token },
	});
	return res;
};
export const getSingleUserAllocation = async (url, token) => {
	const res = await axios.get(`${baseurl}/api/v1/${url}`, {
		headers: { "x-auth-token": token },
	});
	return res;
};




