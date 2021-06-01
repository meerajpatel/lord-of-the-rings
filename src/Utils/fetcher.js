import axios from "./axios";

export const makeAxiosRequest = (method, urlPath, data) => {

    return axios({
        method,
        url: urlPath,
        data,
    })
        .then((res) => res.data)
        .catch((err) => {
            if (err.response) {
                throw err.response.data;
            } else if (err.request) {
                throw err.request;
            } else {
                throw new Error(`Error: ${err.message}`);
            }
        });
}