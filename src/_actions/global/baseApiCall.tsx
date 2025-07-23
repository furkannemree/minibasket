
import general from "../../utils/general";
import { BaseApiCallPayload } from "../types";
import apiService from "./apiService";
 
async function BaseApicall(payload:BaseApiCallPayload) {
    try {
        const apiCall = await apiService.makeApiCall({
            controller: payload.controller,
            action: payload.action,
            query: payload.query,
            headers: payload.headers,
            data: payload.data,
            method: payload.method,
            axiosOptions: payload.axiosOptions,
            itemId: payload.itemId,
            baseUrl: payload.baseUrl,
        })
            if (!general.isNullOrEmpty(apiCall) && payload.onSuccess instanceof Function && !apiCall.error) {
                payload.onSuccess(apiCall)
            }
            if(!general.isNullOrEmpty(apiCall) && payload.onError instanceof Function && apiCall.error) {
                payload.onError(apiCall)
            }
        if (payload.callback instanceof Function) 
            payload.callback(apiCall)
 
    } catch (err) {
        console.log(err)
    }
}
 
export default BaseApicall;