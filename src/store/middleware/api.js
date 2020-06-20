import { apiCallBegan, apiCallSucceeded, apiCallFailed } from "../api";
import axios from "axios";

export default ({ dispatch, getState }) => next => async action => {
    if (action.type !== apiCallBegan.type) return next(action);

    next(action);

    const { baseUrl, url, method, data, headers, onSuccess, onError, payload } = action.payload;

    try {
        const { data: response } = await axios.request({ url: `${baseUrl}${url}`, method, data, headers });
        if (onSuccess) dispatch({ type: onSuccess, payload: { ...payload, ...response } });
        dispatch(apiCallSucceeded());
    } catch (e) {
        if (onError) dispatch({ type: onError });
        dispatch(apiCallFailed({ error: e.message }));
    }
};