"use client"

import { EyeIcon, FilterIcon } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
// import { FilterIcon, EyeIcon } from "@heroicons/react/outline"

function OrderList() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState("")
  const [dateRange, setDateRange] = useState({ from: "", to: "" })

  const orders = [
    { id: "#ORD-001", customer: "John Doe", date: "2023-04-12", status: "Delivered", items: 3, total: "$125.00" },
    { id: "#ORD-002", customer: "Jane Smith", date: "2023-04-11", status: "Processing", items: 2, total: "$85.50" },
    { id: "#ORD-003", customer: "Robert Johnson", date: "2023-04-10", status: "Shipped", items: 5, total: "$210.75" },
    { id: "#ORD-004", customer: "Emily Davis", date: "2023-04-09", status: "Pending", items: 1, total: "$65.25" },
    { id: "#ORD-005", customer: "Michael Brown", date: "2023-04-08", status: "Delivered", items: 4, total: "$145.00" },
    { id: "#ORD-006", customer: "Sarah Wilson", date: "2023-04-07", status: "Cancelled", items: 2, total: "$95.50" },
    { id: "#ORD-007", customer: "David Miller", date: "2023-04-06", status: "Processing", items: 3, total: "$115.25" },
    { id: "#ORD-008", customer: "Jennifer Taylor", date: "2023-04-05", status: "Shipped", items: 6, total: "$235.00" },
  ]

  const filteredOrders = orders.filter((order) => {
    if (selectedStatus && order.status !== selectedStatus) return false
    if (dateRange.from && new Date(order.date) < new Date(dateRange.from)) return false
    if (dateRange.to && new Date(order.date) > new Date(dateRange.to)) return false
    return true
  })

  return (
    <div>
      <div className="flex flex-col mb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Orders</h1>
          <p className="text-gray-600">Manage customer orders</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2196F3]"
          >
            <FilterIcon className="w-5 h-5 mr-2 text-gray-500" />
            Filter
          </button>
        </div>
      </div>

      {/* Filters */}
      {filterOpen && (
        <div className="p-4 mb-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-lg font-medium text-gray-800">Filter Orders</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label htmlFor="status" className="block mb-1 text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#2196F3] focus:border-[#2196F3] sm:text-sm rounded-md"
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label htmlFor="dateFrom" className="block mb-1 text-sm font-medium text-gray-700">
                Date From
              </label>
              <input
                type="date"
                id="dateFrom"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2196F3] focus:border-[#2196F3] sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="dateTo" className="block mb-1 text-sm font-medium text-gray-700">
                Date To
              </label>
              <input
                type="date"
                id="dateTo"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2196F3] focus:border-[#2196F3] sm:text-sm"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => {
                setSelectedStatus("")
                setDateRange({ from: "", to: "" })
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

      {/* Orders Table */}
      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Order ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Customer
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Items
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Total
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
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-[#2196F3]">{order.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.customer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{order.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Shipped"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "Pending"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{order.items}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{order.total}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                    <Link to={`/orders/${order.id}`} className="text-[#2196F3] hover:text-[#1976D2]">
                      <EyeIcon className="w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default OrderList
