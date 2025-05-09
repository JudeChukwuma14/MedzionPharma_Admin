
import { DollarSign, ShoppingBagIcon, ShoppingCartIcon, TrendingDownIcon, TrendingUpIcon, User } from "lucide-react"

  
  function Dashboard() {
    const stats = [
      { name: "Total Products", value: "120", icon: ShoppingBagIcon, change: "+5%", trend: TrendingUpIcon },
      { name: "Total Orders", value: "450", icon: ShoppingCartIcon, change: "+12%", trend: TrendingUpIcon },
      { name: "Revenue", value: "$24,500", icon: DollarSign, change: "+8%", trend: TrendingUpIcon },
      { name: "Customers", value: "2,340", icon: User, change: "-3%", trend: TrendingDownIcon },
    ]
  
    const recentOrders = [
      { id: "#ORD-001", customer: "John Doe", date: "2023-04-12", status: "Delivered", amount: "$125.00" },
      { id: "#ORD-002", customer: "Jane Smith", date: "2023-04-11", status: "Processing", amount: "$85.50" },
      { id: "#ORD-003", customer: "Robert Johnson", date: "2023-04-10", status: "Shipped", amount: "$210.75" },
      { id: "#ORD-004", customer: "Emily Davis", date: "2023-04-09", status: "Pending", amount: "$65.25" },
      { id: "#ORD-005", customer: "Michael Brown", date: "2023-04-08", status: "Delivered", amount: "$145.00" },
    ]
  
    const topProducts = [
      { name: "Vitamin D3 Supplement", sales: 120, revenue: "$3,600" },
      { name: "Protein Powder", sales: 95, revenue: "$4,750" },
      { name: "Omega-3 Fish Oil", sales: 85, revenue: "$2,550" },
      { name: "Probiotic Complex", sales: 78, revenue: "$2,340" },
      { name: "Magnesium Citrate", sales: 65, revenue: "$1,950" },
    ]
  
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Welcome to your supplement store admin dashboard</p>
        </div>
  
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow p-5">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
                </div>
                <div className="rounded-full bg-[#87CEEB] bg-opacity-20 p-3">
                  <stat.icon className="h-6 w-6 text-[#2196F3]" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <stat.trend className={`h-4 w-4 ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`} />
                <span className={`text-sm ml-1 ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                  {stat.change} from last month
                </span>
              </div>
            </div>
          ))}
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-5 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
            </div>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-[#2196F3]">{order.id}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Processing"
                                  ? "bg-blue-100 text-blue-800"
                                  : order.status === "Shipped"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{order.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
  
          {/* Top Products */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-5 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Top Selling Products</h2>
            </div>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sales
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Revenue
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {topProducts.map((product) => (
                      <tr key={product.name}>
                        <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{product.sales} units</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{product.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Dashboard
  