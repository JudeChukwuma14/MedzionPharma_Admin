import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FilterIcon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchProducts,
  removeProduct,
  resetProductState,
  updateProduct, // Assuming you have an updateProduct action in your slice
} from "../util/slices/productSlice";

function ProductList() {
  const dispatch = useDispatch();
  const { products, loading, error, success } = useSelector(
    (state) => state.product
  );

  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products on mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle success and error notifications
  useEffect(() => {
    if (success) {
      dispatch(resetProductState());
      setIsModalOpen(false); // Close modal after successful update
    }
    if (error) {
      toast.error(error);
      dispatch(resetProductState());
    }
  }, [success, error, dispatch]);

  // Define categories and brands dynamically from products
  const categories = [
    ...new Set(products.map((product) => product.category)),
  ].sort();
  const brands = [
    ...new Set(products.map((product) => product.brandName)),
  ].sort();

  // Filter products based on category and brand
  const filteredProducts = products.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) return false;
    if (selectedBrand && product.brandName !== selectedBrand) return false;
    return true;
  });

  // Handle product deletion
  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(removeProduct(productId));
    }
  };

  // Handle edit button click
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Handle form submission in modal
  const handleUpdateProduct = (e) => {
    e.preventDefault();

    if (!selectedProduct || !selectedProduct._id) {
      toast.error("No product selected or invalid product ID.");
      return;
    }

    const updatedProduct = {
      _id: selectedProduct._id, // Ensure this is not undefined
      name: e.target.name.value,
      category: e.target.category.value,
      brandName: e.target.brand.value,
      stock: parseInt(e.target.stock.value) || 0, // Default to 0 if NaN
      price: parseFloat(e.target.price.value) || 0.0, // Default to 0.00 if NaN
    };

    dispatch(
      updateProduct({
        productId: selectedProduct._id,
        productData: updatedProduct,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Product updated successfully!");
      })
      .catch((err) => {
        toast.error(err.message || "Failed to update product");
      });
  };
  return (
    <div>
      <div className="flex flex-col mb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
          <p className="text-gray-600">Manage your supplement products</p>
        </div>
        <div className="flex flex-col gap-3 mt-4 md:mt-0 sm:flex-row">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2196F3]"
          >
            <FilterIcon className="w-5 h-5 mr-2 text-gray-500" />
            Filter
          </button>
          <Link
            to="/products/create"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2196F3] hover:bg-[#1976D2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2196F3]"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Product
          </Link>
        </div>
      </div>

      {filterOpen && (
        <div className="p-4 mb-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-lg font-medium text-gray-800">
            Filter Products
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="category"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#2196F3] focus:border-[#2196F3] sm:text-sm rounded-md"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="brand"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Brand
              </label>
              <select
                id="brand"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#2196F3] focus:border-[#2196F3] sm:text-sm rounded-md"
              >
                <option value="">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => {
                setSelectedCategory("");
                setSelectedBrand("");
              }}
              className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2196F3]"
            >
              Reset
            </button>
            <button
              onClick={() => setFilterOpen(false)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2196F3] hover:bg-[#1976D2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2196F3]"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-4 text-center">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-4 text-center">No products found.</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Brand
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Stock
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="object-cover w-10 h-10"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                   <Link to={`/product-details/${product._id}`}>
                   <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                   </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {product.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {product.brandName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {product.stock}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        ₦ {product.price.toFixed(2)}
                      </div>
                    </td>
                    <td className="flex items-center justify-center gap-6 px-6 text-sm font-medium text-right py-7 whitespace-nowrap">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="text-[#2196F3] hover:text-[#1976D2]"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Edit Product Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">Edit Product</h2>
            <form onSubmit={handleUpdateProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedProduct.name}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#2196F3] focus:border-[#2196F3] sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  defaultValue={selectedProduct.category}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#2196F3] focus:border-[#2196F3] sm:text-sm rounded-md"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Brand
                </label>
                <select
                  name="brand"
                  defaultValue={selectedProduct.brandName}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#2196F3] focus:border-[#2196F3] sm:text-sm rounded-md"
                >
                  <option value="">Select Brand</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  defaultValue={selectedProduct.stock}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#2196F3] focus:border-[#2196F3] sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  defaultValue={selectedProduct.price}
                  step="0.01"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#2196F3] focus:border-[#2196F3] sm:text-sm"
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2196F3] hover:bg-[#1976D2]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
