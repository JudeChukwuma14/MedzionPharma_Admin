"use client";

import { BellIcon, MenuIcon, UserCircleIcon } from "lucide-react";
import { useSelector } from "react-redux";

function Header({ setSidebarOpen }) {
  const user = useSelector((state) => state.user.user);
  const userFirstLetter = user?.username?.charAt(0).toUpperCase();
  return (
    <header className="sticky top-0 z-10 flex h-16 bg-white shadow">
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#2196F3] md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuIcon className="w-6 h-6" aria-hidden="true" />
      </button>
      <div className="flex justify-between flex-1 px-4">
        <div className="flex items-center flex-1">
          <h1 className="hidden text-xl font-semibold text-gray-800 md:block">
            Dashboard
          </h1>
        </div>
        <div className="flex items-center ml-4 md:ml-6">
          <button
            type="button"
            className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2196F3]"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="w-6 h-6" aria-hidden="true" />
          </button>

          {/* Profile dropdown */}
          <div className="relative ml-3">
            <div>
              {userFirstLetter ? (
                <h1  className=" cursor-pointer font-bold text-xl bg-[#2196F3] text-white rounded-full h-[30px] w-[30px] flex justify-center items-center ring-4">{userFirstLetter}</h1>
              ) : (
                <div
                  type="button"
                  className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2196F3]"
                  id="user-menu-button"
                >
                  <span className="sr-only">Open user menu</span>
                  <UserCircleIcon
                    className="w-8 h-8 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
