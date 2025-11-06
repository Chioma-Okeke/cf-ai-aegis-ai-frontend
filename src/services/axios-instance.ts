import axios from "axios";
import type { AxiosInstance, RawAxiosRequestHeaders } from "axios";

export const createAxiosInstance = (
    clientUrl: string,
    headers?: RawAxiosRequestHeaders
): AxiosInstance => {
    const baseURL = `${import.meta.env.VITE_API_BASE}/api${clientUrl}`;

    return axios.create({
        baseURL,
        timeout: 120000,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
    });
};
