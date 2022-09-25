import GlobalTypes from "./GlobalTypes";
import { getSnftDataAPI, getAPI, get_api } from "../../utils/API";

export const USER_PROFILE_TYPES = {
    LOADING: "LOADING",
    GET_COLLECTED: "GET_COLLECTED",
    GET_FAVOURITE: "GET_FAVOURITE",
    GET_CLAIM_POOL: "GET_CLAIM_POOL",
    GET_IGO_PARTICIPATED_POOL: "GET_IGO_PARTICIPATED_POOL"


};


export const getcollectednft = (address) => async (dispatch) => {
    try {
        dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
        const res = await get_api(`transaction/list?userAddress=${address.toLowerCase()}`);
        dispatch({
            type: USER_PROFILE_TYPES.GET_COLLECTED,
            payload: {
                collected: res.data.data,
            },
        });
        dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
    } catch (err) {
        dispatch({
            type: GlobalTypes.NOTIFY,
            payload: { error: err.response },
        });
    }
};

export const getfavouritenft = (address) => async (dispatch) => {
    try {
        dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
        const res = await get_api(`favourite/list?userAddress=${address.toLowerCase()}`);
        if(res.data){
            dispatch({
                type: USER_PROFILE_TYPES.GET_FAVOURITE,
                payload: {
                    favourite: res.data.data.nft,
                    favourite_projects: res.data.data.project,
                },
            });
        }
        dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
    } catch (err) {
        dispatch({
            type: GlobalTypes.NOTIFY,
            payload: { error: err.response },
        });
    }
};

export const getIgoParticipatedPool = (address, page) => async (dispatch) => {
    try {
        dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
        const res = await getAPI(`participatedIGO/?wallet=${address}&page=${page}`);

        dispatch({
            type: USER_PROFILE_TYPES.GET_IGO_PARTICIPATED_POOL,
            payload: {
                igo : res.data,
            },
        });
        dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
    } catch (err) {
        console.log(err)
        // dispatch({
        //     type: GlobalTypes.NOTIFY,
        //     payload: { error: err.response },
        // });
    }
};


export const getclaimpool = (address, network) => async (dispatch) => {
    try {
        dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
        console.log('hello')

        const res = await getSnftDataAPI(`claim/users-pools?walletAddress=${address.toLowerCase()}&network=network`);
        dispatch({
            type: USER_PROFILE_TYPES.GET_CLAIM_POOL,
            payload: {
                claim: res.data.data,
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
