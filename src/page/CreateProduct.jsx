"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../util/slices/productSlice";

function CreateProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, isAuthenticated } = useSelector((state) => state.user);

  // Redirect if not authenticated or not admin
  if (!isAuthenticated || user?.role !== "admin") {
    navigate("/login");
    toast.error("You must be an admin to create products");
    return null;
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      sku: "",
      description: "",
      category: "",
      price: "",
      costPrice: "",
      stock: "",
      weight: "",
      brandName: "",
      brandLogo: null,
      containerType: "",
      productForm: "",
      images: [],
      featured: false,
      published: true,
    },
  });

  const categories = [
    "Vitamins",
    "Protein",
    "Omega Fatty Acids",
    "Performance",
    "Minerals",
    "Herbs",
    "Supplements",
    "Beauty & Personal Care",
    "Medical Devices",
    "Pain Relief",
    "Skin Care",
    "Pharmacy",
    "Sexual Wellbeing",
  ];
  const containerTypes = [
    "Glass Bottle",
    "Plastic Container",
    "Blister Pack",
    "Jar",
    "Pouch",
  ];
  const productForms = ["Softgel", "Capsule", "Tablet", "Powder", "Liquid"];

  // Watch images for preview
  const images = watch("images");

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("price", data.price);
      formData.append("costPrice", data.costPrice || "0");
      formData.append("stock", data.stock);
      formData.append("weight", data.weight || "0");
      formData.append("brandName", data.brandName);
      formData.append("containerType", data.containerType);
      formData.append("productForm", data.productForm);
      formData.append("featured", data.featured.toString());
      formData.append("published", data.published.toString());

      if (data.brandLogo && data.brandLogo[0]) {
        formData.append("brandLogo", data.brandLogo[0]);
      }

      if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach((image) => {
          formData.append("images", image);
        });
      }

      await dispatch(addProduct({ productData: formData, token })).unwrap();
      toast.success("Product created successfully!");
      navigate("/products");
    } catch (error) {
      console.error(error);
      toast.error(error || "Failed to create product");
    }
  };

  // Handle image removal
  const removeImage = (index) => {
    const currentImages = Array.from(images || []);
    currentImages.splice(index, 1);
    setValue("images", currentImages);
  };

  return (
    <div>
      <div className="mb-6">
        <Link
          to="/products"
          className="inline-flex items-center text-sm font-medium text-[#2196F3] hover:text-[#1976D2]"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Back to Products
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-gray-800">
          Create New Product
        </h1>
        <p className="text-gray-600">
          Add a new supplement product to your store
        </p>
      </div>

      <div className="overflow-hidden bg-white rounded-lg shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Basic Information */}
            <div className="md:col-span-2">
              <h2 className="mb-4 text-lg font-medium text-gray-800">
                Basic Information
              </h2>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Product name is required" })}
                className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2196F3] focus:border-[#2196F3] sm:text-sm ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="category"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Category *
              </label>
              <select
                id="category"
                {...register("category", { required: "Category is required" })}
                className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border focus:outline-none focus:ring-[#2196F3] focus:border-[#2196F3] sm:text-sm rounded-md ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="price"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Price *
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="price"
                  step="0.01"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 0, message: "Price cannot be negative" },
                  })}
                  className={`mt-1 block w-full border rounded-md shadow-sm py-2 pl-7 pr-3 focus:outline-none focus:ring-[#2196F3] focus:border-[#2196F3] sm:text-sm ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="0.00"
                />
              </div>
              {errors.price && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="costPrice"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Cost Price
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="costPrice"
                  step="0.01"
                  {...register("costPrice", {
                    min: { value: 0, message: "Cost price cannot be negative" },
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 pl-7 pr-3 focus:outline-none focus:ring-[#2196F3] focus:border-[#2196F3] sm:text-sm"
                  placeholder="0.00"
                />
              </div>
              {errors.costPrice && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.costPrice.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="stock"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Stock Quantity *
              </label>
              <input
                type="number"
                id="stock"
                {...register("stock", {
                  required: "Stock quantity is required",
                  min: { value: 0, message: "Stock cannot be negative" },
                })}
                className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2196F3] focus:border-[#2196F3] sm:text-sm ${
                  errors.stock ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.stock && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.stock.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="weight"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Weight (in grams)
              </label>
              <input
                type="number"
                id="weight"
                {...register("weight", {
                  min: { value: 0, message: "Weight cannot be negative" },
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2196F3] focus:border-[#2196F3] sm:text-sm"
                placeholder="0"
              />
              {errors.weight && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.weight.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Description *
              </label>
              <textarea
                id="description"
                rows={4}
                {...register("description", {
                  required: "Description is required",
                })}
                className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2196F3] focus:border-[#2196F3] sm:text-sm ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Brand Information */}
            <div className="pt-6 mt-4 border-t md:col-span-2">
              <h2 className="mb-4 text-lg font-medium text-gray-800">
                Brand Information
              </h2>
            </div>

            <div>
              <label
                htmlFor="brandName"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Brand Name *
              </label>
              <input
                type="text"
                id="brandName"
                {...register("brandName", {
                  required: "Brand name is required",
                })}
                className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2196F3] focus:border-[#2196F3] sm:text-sm ${
                  errors.brandName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.brandName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.brandName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="brandLogo"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Brand Logo *
              </label>
              <input
                type="file"
                id="brandLogo"
                accept="image/jpeg,image/png,image/jpg"
                className={`mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#87CEEB] file:text-white hover:file:bg-[#2196F3] ${
                  errors.brandLogo ? "border-red-500" : ""
                }`}
              />
            </div>

            {/* Product Images */}
            <div className="pt-6 mt-4 border-t md:col-span-2">
              <h2 className="mb-4 text-lg font-medium text-gray-800">
                Product Images
              </h2>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="images"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Product Images (up to 5)
              </label>
              <input
                type="file"
                id="images"
                accept="image/jpeg,image/png,image/jpg"
                multiple
                {...register("images", {
                  validate: (files) =>
                    !files || files.length <= 5 || "Maximum 5 images allowed",
                })}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#87CEEB] file:text-white hover:file:bg-[#2196F3]"
              />
              {errors.images && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.images.message}
                </p>
              )}
              {images && images.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-4">
                  {Array.from(images).map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Product image ${index + 1}`}
                        className="object-cover w-24 h-24 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-2 -right-2"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="pt-6 mt-4 border-t md:col-span-2">
              <h2 className="mb-4 text-lg font-medium text-gray-800">
                Product Details
              </h2>
            </div>

            <div>
              <label
                htmlFor="containerType"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Container Type *
              </label>
              <select
                id="containerType"
                {...register("containerType", {
                  required: "Container type is required",
                })}
                className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border focus:outline-none focus:ring-[#2196F3] focus:border-[#2196F3] sm:text-sm rounded-md ${
                  errors.containerType ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Container Type</option>
                {containerTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.containerType && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.containerType.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="productForm"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Product Form *
              </label>
              <select
                id="productForm"
                {...register("productForm", {
                  required: "Product form is required",
                })}
                className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border focus:outline-none focus:ring-[#2196F3] focus:border-[#2196F3] sm:text-sm rounded-md ${
                  errors.productForm ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Product Form</option>
                {productForms.map((form) => (
                  <option key={form} value={form}>
                    {form}
                  </option>
                ))}
              </select>
              {errors.productForm && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.productForm.message}
                </p>
              )}
            </div>

            {/* Product Status */}
            <div className="pt-6 mt-4 border-t md:col-span-2">
              <h2 className="mb-4 text-lg font-medium text-gray-800">
                Product Status
              </h2>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="featured"
                  type="checkbox"
                  {...register("featured")}
                  className="focus:ring-[#2196F3] h-4 w-4 text-[#2196F3] border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="featured" className="font-medium text-gray-700">
                  Featured Product
                </label>
                <p className="text-gray-500">
                  This product will be displayed in featured sections
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="published"
                  type="checkbox"
                  {...register("published")}
                  className="focus:ring-[#2196F3] h-4 w-4 text-[#2196F3] border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="published"
                  className="font-medium text-gray-700"
                >
                  Published
                </label>
                <p className="text-gray-500">
                  This product will be visible on your store
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Link
              to="/products"
              className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2196F3]"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2196F3] hover:bg-[#1976D2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2196F3] disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
