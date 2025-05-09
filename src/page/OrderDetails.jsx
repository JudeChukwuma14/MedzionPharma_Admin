"use client"

import { ArrowLeftIcon } from "lucide-react"
import { Link, useParams } from "react-router-dom"
// import { ArrowLeftIcon } from "@heroicons/react/outline"

function OrderDetails() {
  const { id } = useParams()

  // Mock order data - in a real app, you would fetch this from an API
  const order = {
    id: id,
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "(123) 456-7890",
    },
    shippingAddress: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      country: "USA",
    },
    billingAddress: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      country: "USA",
    },
    date: "2023-04-12",
    status: "Shipped",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    items: [
      { id: 1, name: "Vitamin D3 Supplement", quantity: 2, price: "$29.99", total: "$59.98" },
      { id: 2, name: "Omega-3 Fish Oil", quantity: 1, price: "$24.99", total: "$24.99" },
      { id: 3, name: "Magnesium Citrate", quantity: 1, price: "$19.99", total: "$19.99" },
    ],
    subtotal: "$104.96",
    shipping: "$5.99",
    tax: "$8.40",
    total: "$119.35",
  }

  return (
    <div>
      <div className="mb-6">
        <Link to="/orders" className="inline-flex items-center text-sm font-medium text-[#2196F3] hover:text-[#1976D2]">
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Back to Orders
        </Link>
        <div className="flex flex-col mt-2 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Order {order.id}</h1>
          <div className="mt-2 md:mt-0">
            <span
              className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full 
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
          </div>
        </div>
        <p className="text-gray-600">Placed on {order.date}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Order Summary */}
        <div className="md:col-span-2">
          <div className="mb-6 overflow-hidden bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">Order Items</h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Product
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{item.quantity}</div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{item.price}</div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{item.total}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pt-4 mt-6 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">{order.subtotal}</span>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-900">{order.shipping}</span>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium text-gray-900">{order.tax}</span>
                </div>
                <div className="flex justify-between pt-4 mt-4 border-t border-gray-200">
                  <span className="text-base font-medium text-gray-900">Total</span>
                  <span className="text-base font-medium text-gray-900">{order.total}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">Order Status</h2>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label htmlFor="status" className="block mb-1 text-sm font-medium text-gray-700">
                  Update Status
                </label>
                <select
                  id="status"
                  name="status"
                  defaultValue={order.status}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#2196F3] focus:border-[#2196F3] sm:text-sm rounded-md"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2196F3] hover:bg-[#1976D2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2196F3]"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="md:col-span-1">
          <div className="mb-6 overflow-hidden bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">Customer</h2>
            </div>
            <div className="p-6">
              <p className="text-sm font-medium text-gray-900">{order.customer.name}</p>
              <p className="mt-1 text-sm text-gray-500">{order.customer.email}</p>
              <p className="mt-1 text-sm text-gray-500">{order.customer.phone}</p>
            </div>
          </div>

          <div className="mb-6 overflow-hidden bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">Shipping Address</h2>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-500">{order.shippingAddress.street}</p>
              <p className="mt-1 text-sm text-gray-500">
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
              </p>
              <p className="mt-1 text-sm text-gray-500">{order.shippingAddress.country}</p>
            </div>
          </div>

          <div className="overflow-hidden bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">Payment Information</h2>
            </div>
            <div className="p-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Method</span>
                <span className="font-medium text-gray-900">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-gray-600">Status</span>
                <span className={`font-medium ${order.paymentStatus === "Paid" ? "text-green-600" : "text-red-600"}`}>
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
