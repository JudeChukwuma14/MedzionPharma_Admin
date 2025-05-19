import axios from "axios";
import { logout } from "../util/slices/userSlices";




export const api = axios.create({
    baseURL: "https://medzionpharmaapi.onrender.com/api/v1/auth",
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            store.dispatch(logout());
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);
export const createAccount = async (data) => {
    try {
        const response = await api.post("/register", data)
        return response.data
    } catch (error) {
        console.error("Login error:", {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
        });
        const errorMessage = error.response?.data?.message || error.message || "Failed to createAccount"
        throw new Error(errorMessage)
    }
}
export const loginAccount = async (data) => {
    try {
        const response = await api.post("/login", data)
        return response.data
    } catch (error) {
        console.error("Error creating account", error)
        const errorMessage = error.response?.data?.message || error.message || "Failed to createAccount"
        throw new Error(errorMessage)
    }
}
export const Logout = async () => {
    try {
        const response = await api.get("/logout")
        return response.data
    } catch (error) {
        console.error("Error logging out account", error)
        const errorMessage = error.response?.data?.message || error.message || "Failed to logout"
        throw new Error(errorMessage)
    }
}
export const meAccount = async () => {
    try {
        const response = await api.get("/me")
        return response.data
    } catch (error) {
        console.error(error)
        const errorMessage = error.response?.data?.message || error.message || "User Not Found"
        throw new Error(errorMessage)
    }
}
export const getAllProduct = async () => {
    try {
        const response = await api.get("/allproduct")
        return response.data
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "Failed to get all products"
        throw new Error(errorMessage)
    }
}

export const getProductById = async (productId) => {
    try {
        const response = await api.get(`/productbyid/${productId}`)
        return response.data
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "Failed to get product by id"
        throw new Error(errorMessage)
    }
}