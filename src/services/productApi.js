// frontend/src/services/productApi.js
import axios from "axios";
const API_BASE_URL = "https://medzionpharmaapi.onrender.com/api/v1/product";
export const api = axios.create({
  baseURL: API_BASE_URL,
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

export const createProduct = async (productData, token) => {
  const response = await api.post("/postproduct", productData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const productUpdate = async (productId, productData, token) => {
  try {
    if (!token) {
      throw new Error("Authentication token is missing");
    }
    const mappedData = {
      ...productData,
      brandName: productData.brand || productData.brandName,
    };
    delete mappedData.brand;
    const response = await api.put(`/${productId}`, mappedData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Update response:", response.data);
    if (!response.data.product) {
      console.warn("Update response missing product data:", response.data);
    }
    return { product: response.data.product };
  } catch (error) {
    console.error("Update error:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteProduct = async (id, token) => {
  try {
    const response = await api.delete(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Delete error:", error.response?.data);
    throw error;
  }
};