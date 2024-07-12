import axios from "axios"
require("dotenv").config()

export const httpAxios = axios.create({
    baseURL: process.env.BASE_URL,
})



