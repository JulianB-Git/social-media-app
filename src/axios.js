import axios from "axios";
import { config } from "./config/config";

export const  makeRequest = axios.create({
    baseURL: config.base_url,
    headers: {
        Authorization : `Bearer ${localStorage.getItem("access_token")}`
    }
})