import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
    const isErrorExpected = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!isErrorExpected) {
        toast.error("Something went wrong");
    }
    return Promise.reject(error);
});

export default {
    request: axios.request,
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};