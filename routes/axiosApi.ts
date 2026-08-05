import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: { "Content-Type": "application/json" }
});