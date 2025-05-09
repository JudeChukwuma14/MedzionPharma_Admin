"use client";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  HomeIcon,
  NewspaperIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  LogOutIcon, // Add this import
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../util/slices/userSlices";
import { Logout } from "../../services/authApi";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const [productsOpen, setProductsOpen] = useState(false);
  const [contentOpen, setContentOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async() => {
    await Logout()
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/signin");
    setSidebarOpen(false); 
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      <div
        className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity md:hidden ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform md:translate-x-0 md:static md:inset-0 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex-1">
          <div className="flex items-center justify-center h-16 border-b border-gray-200">
            <h1 className="text-xl font-bold text-[#2196F3]">Medzionpharma</h1>
          </div>

          <nav className="px-2 mt-5">
          <Link
            to="/"
            className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
              location.pathname === "/"
                ? "bg-[#87CEEB] text-white"
                : "text-gray-600 hover:bg-[#F7F7F7] hover:text-[#2196F3]"
            }`}
          >
            <HomeIcon className="w-6 h-6 mr-3" />
            Dashboard
          </Link>

          {/* Products Dropdown */}
          <div className="mt-1">
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className={`w-full group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                location.pathname.includes("/products")
                  ? "bg-[#87CEEB] text-white"
                  : "text-gray-600 hover:bg-[#F7F7F7] hover:text-[#2196F3]"
              }`}
            >
              <ShoppingBagIcon className="w-6 h-6 mr-3" />
              Products
              {productsOpen ? (
                <ChevronUpIcon className="w-5 h-5 ml-auto" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 ml-auto" />
              )}
            </button>
            {productsOpen && (
              <div className="pl-10 pr-2 mt-1 space-y-1">
                <Link
                  to="/products"
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    location.pathname === "/products"
                      ? "bg-[#87CEEB] text-white"
                      : "text-gray-600 hover:bg-[#F7F7F7] hover:text-[#2196F3]"
                  }`}
                >
                  Product List
                </Link>
                <Link
                  to="/products/create"
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    location.pathname === "/products/create"
                      ? "bg-[#87CEEB] text-white"
                      : "text-gray-600 hover:bg-[#F7F7F7] hover:text-[#2196F3]"
                  }`}
                >
                  Create Product
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/orders"
            className={`mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md ${
              location.pathname.includes("/orders")
                ? "bg-[#87CEEB] text-white"
                : "text-gray-600 hover:bg-[#F7F7F7] hover:text-[#2196F3]"
            }`}
          >
            <ShoppingCartIcon className="w-6 h-6 mr-3" />
            Orders
          </Link>

          {/* Content Dropdown */}
          <div className="mt-1">
            <button
              onClick={() => setContentOpen(!contentOpen)}
              className={`w-full group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                location.pathname.includes("/content")
                  ? "bg-[#87CEEB] text-white"
                  : "text-gray-600 hover:bg-[#F7F7F7] hover:text-[#2196F3]"
              }`}
            >
              <NewspaperIcon className="w-6 h-6 mr-3" />
              Content
              {contentOpen ? (
                <ChevronUpIcon className="w-5 h-5 ml-auto" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 ml-auto" />
              )}
            </button>
            {contentOpen && (
              <div className="pl-10 pr-2 mt-1 space-y-1">
                <Link
                  to="/content/posts"
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    location.pathname === "/content/posts"
                      ? "bg-[#87CEEB] text-white"
                      : "text-gray-600 hover:bg-[#F7F7F7] hover:text-[#2196F3]"
                  }`}
                >
                  Posts
                </Link>
                <Link
                  to="/content/posts/create"
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    location.pathname === "/content/posts/create"
                      ? "bg-[#87CEEB] text-white"
                      : "text-gray-600 hover:bg-[#F7F7F7] hover:text-[#2196F3]"
                  }`}
                >
                  Create Post
                </Link>
                <Link
                  to="/content/pages"
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    location.pathname === "/content/pages"
                      ? "bg-[#87CEEB] text-white"
                      : "text-gray-600 hover:bg-[#F7F7F7] hover:text-[#2196F3]"
                  }`}
                >
                  Pages
                </Link>
                <Link
                  to="/content/media"
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    location.pathname === "/content/media"
                      ? "bg-[#87CEEB] text-white"
                      : "text-gray-600 hover:bg-[#F7F7F7] hover:text-[#2196F3]"
                  }`}
                >
                  Media
                </Link>
              </div>
            )}
          </div>
        </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-[#F7F7F7] hover:text-[#2196F3]"
          >
            <LogOutIcon className="w-6 h-6 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;