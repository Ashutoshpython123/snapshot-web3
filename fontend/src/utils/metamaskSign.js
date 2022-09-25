import {getSnftByIdAPI, get_api, postDataAPI, post_api } from "./API"
import {web3} from "../redux/actions/metamaskAction";
import axios from "axios"


export const MetamaskSign = async () => {
    const address = sessionStorage.getItem("address")
    if(!address){
        return
    }
    // const web3 = new Web3(provider.provider);
    const res = await getSnftByIdAPI(`user/get-nonce`,address)
    console.log(res)
    if (res.data.status) {
        const signature = await web3.eth.personal.sign(res.data.data.nonce, address)
        sessionStorage.removeItem("userId")
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("wallet")
        try {
            const result = await post_api("user/login", {
                nonce: res.data.data.nonce,
                signature: signature
            })
            if (result.data.status) {
                sessionStorage.setItem("userId", result.data.data._id)
                sessionStorage.setItem("token", result.data.data.token)
                sessionStorage.setItem("wallet", result.data.data.walletAddress);
                window.dispatchEvent(new Event("storage"));
            }
            // window.location.href = "/"
            // return true
        } catch (error) {
            if (!error.response.data.status) {
                sessionStorage.removeItem("userId")
                sessionStorage.removeItem("token")
                sessionStorage.setItem("wallet", address)
                return "NOT_REGISTER"
            }

        }
    } else {
        sessionStorage.removeItem("userId")
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("wallet")
    }
};

