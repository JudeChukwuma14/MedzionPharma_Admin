import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/productApi";

export const fetchProducts = createAsyncThunk(
  "product/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/allproducts");
      return response.data.products;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to fetch products";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "product/fetchById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/${productId}`);
      return response.data.product;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to fetch product";
      return rejectWithValue(errorMessage);
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/create",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await api.post("/postproduct", productData);
      return response.data.product;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to create product";
      return rejectWithValue(errorMessage);
    }
  }
);

export const removeProduct = createAsyncThunk(
  "product/delete",
  async (productId, { rejectWithValue }) => {
    try {
      await api.delete(`/${productId}`);
      return productId; // Return productId to remove it from state
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to delete product";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/${productId}`, productData);
      return response.data.product;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to update product";
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
  success: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Product By ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Product
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        state.success = true;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove Product
      .addCase(removeProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((product) => product._id !== action.payload);
        state.success = true;
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
        state.currentProduct = action.payload;
        state.success = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;