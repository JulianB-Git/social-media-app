import axios from "axios";

export const  makeRequest = axios.create({
    baseURL: 'http://localhost:8082/api/',
    headers: {
        Authorization : `Bearer ${localStorage.getItem("access_token")}`
    }
})