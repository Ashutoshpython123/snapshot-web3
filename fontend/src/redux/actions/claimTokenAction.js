import GlobalTypes from "./GlobalTypes";
import { getClaimData, getClaimAPI, getDataAPI } from "../../utils/API";

export const CLAIMTOKEN_TYPES = {
    LOADING: "LOADING",
    GET_TOKEN: "GET_TOKEN",
};


export const gettoken = (address, page) => async (dispatch) => {
    try {
        const addpage = page.toString() + '-' +  address
        dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
        const res = await getClaimData("gettoken",addpage);
        dispatch({
            type: CLAIMTOKEN_TYPES.GET_TOKEN,
            payload: {
                claimToken: res.data.claimToken,
                totalpage : res.data.totalpage
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


export const getstoreClaim = (address) => async (dispatch) => {
    try {
        dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
        const res = await getClaimAPI("getData", address);
        dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
        dispatch({
            type: GlobalTypes.NOTIFY,
            payload: {
                success: res.data.msg,
            },
        });
        await getDataAPI(`generate_csv/${address}`);
       
        
        
    } catch (err) {
        dispatch({
            type: GlobalTypes.NOTIFY,
            payload: { error: err.response.data.msg },
        });
    }
};

export const getsendClaimToken = (address) => async (dispatch) => {
    try {
        dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: true } });
        await getClaimAPI("distribute", address);
        dispatch({ type: GlobalTypes.NOTIFY, payload: { loading: false } });
        dispatch({
            type: GlobalTypes.NOTIFY,
            payload: {
                success: "Tokens have been sent to repective users",
            },
        });
        
    } catch (err) {
        dispatch({
            type: GlobalTypes.NOTIFY,
            payload: { error: err.response.data.msg },
        });
    }
};

