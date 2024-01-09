import axios from "axios";

export const axiosIns = axios.create({ baseURL: process.env.CLIENT_URL });
