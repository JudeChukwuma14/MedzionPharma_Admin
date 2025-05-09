// frontend/src/services/productApi.js
import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api/v1/product";
export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials:true
});

// Simplified API calls that match your backend routes
export const getAllProducts = async () => {
  const response = await api.get("/allproducts");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await api.post("/postproduct", productData);
  console.log(response)
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await api.put(`/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};