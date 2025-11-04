import axios from "axios";
import type {
    AxiosInstance,
    RawAxiosRequestHeaders,
} from "axios"

export const createAxiosInstance = (clientUrl: string, headers?: RawAxiosRequestHeaders): AxiosInstance => {
    const baseURL = import.meta.env.API_BASE + clientUrl;

    return axios.create({
        baseURL,
        timeout: 60000,
        withCredentials: true,
        headers: {
            ...headers,
        }
    })
}