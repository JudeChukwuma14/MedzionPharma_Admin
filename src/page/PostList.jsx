"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

import { FilterIcon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react"

function PostList() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")

  const categories = [
    "Health Tips",
    "Nutrition",
    "Fitness",
    "Wellness",
    "Product Reviews",
    "Research",
    "Recipes",
    "Success Stories",
  ]

  const posts = [
    {
      id: 1,
      title: "Top 10 Vitamin D Benefits",
      category: "Health Tips",
      author: "Dr. Jane Smith",
      date: "2023-04-10",
      status: "Published",
      views: 1250,
    },
    {
      id: 2,
      title: "How to Choose the Right Protein Powder",
      category: "Product Reviews",
      author: "Mike Johnson",
      date: "2023-04-08",
      status: "Published",
      views: 980,
    },
    {
      id: 3,
      title: "The Science Behind Probiotics",
      category: "Research",
      author: "Dr. Robert Lee",
      date: "2023-04-05",
      status: "Published",
      views: 765,
    },
    {
      id: 4,
      title: "Healthy Smoothie Recipes for Energy",
      category: "Recipes",
      author: "Sarah Wilson",
      date: "2023-04-03",
      status: "Draft",
      views: 0,
    },
    {
      id: 5,
      title: "Supplements for Joint Health",
      category: "Health Tips",
      author: "Dr. Jane Smith",
      date: "2023-03-28",
      status: "Published",
      views: 1120,
    },
    {
      id: 6,
      title: "Workout Recovery Supplements",
      category: "Fitness",
      author: "Mike Johnson",
      date: "2023-03-25",
      status: "Draft",
      views: 0,
    },
    {
      id: 7,
      title: "Magnesium: The Forgotten Mineral",
      category: "Research",
      author: "Dr. Robert Lee",
      date: "2023-03-20",
      status: "Published",
      views: 890,
    },
    {
      id: 8,
      title: "Immune Boosting Supplement Guide",
      category: "Health Tips",
      author: "Sarah Wilson",
      date: "2023-03-15",
      status: "Published",
      views: 1450,
    },
  ]

  const filteredPosts = posts.filter((post) => {
    if (selectedCategory && post.category !== selectedCategory) return false
    if (selectedStatus && post.status !== selectedStatus) return false
    return true
  })

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Posts</h1>
          <p className="text-gray-600">Manage your blog posts and articles</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2196F3]"
          >
            <FilterIcon className="h-5 w-5 mr-2 text-gray-500" />
            Filter
          </button>
          <Link
            to="/content/posts/create"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2196F3] hover:bg-[#1976D2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2196F3]"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Post
          </Link>
        </div>
      </div>

      {/* Filters */}
      {filterOpen && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Filter Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
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
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#2196F3] focus:border-[#2196F3] sm:text-sm rounded-md"
              >
                <option value="">All Statuses</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => {
                setSelectedCategory("")
                setSelectedStatus("")
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

      {/* Posts Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Author
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Views
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{post.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{post.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{post.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{post.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${post.status === "Published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{post.views}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-[#2196F3] hover:text-[#1976D2] mr-3">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <TrashIcon className="h-5 w-5" />
                    </button>
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

export default PostList
