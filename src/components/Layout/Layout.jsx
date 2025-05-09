import { Outlet } from "react-router-dom";
import Header from "../static/Header";
import Sidebar from "../static/Sidebar";
import { useEffect, useState } from "react";
import Spinners from "../reuse/Spinner";

const useLoading = (delay = 1500) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return loading;
};
const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const loading = useLoading();
  return loading ? (
    <Spinners />
  ) : (
    <div className="flex h-screen bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-4 overflow-y-auto bg-gray-50 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
