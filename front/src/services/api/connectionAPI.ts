import axios, { AxiosInstance } from "axios";

const ConnectionAPI: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000",
})

export default ConnectionAPI;