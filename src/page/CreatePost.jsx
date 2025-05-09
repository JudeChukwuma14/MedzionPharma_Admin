"use client"

import { ArrowLeftIcon } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"


function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    featuredImage: null,
    excerpt: "",
    tags: "",
    status: "draft",
    allowComments: true,
  })

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

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      })
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your API
    alert("Post created successfully!")
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          to="/content/posts"
          className="inline-flex items-center text-sm font-medium text-[#2196F3] hover:text-[#1976D2]"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Posts
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800 mt-2">Create New Post</h1>
        <p className="text-gray-600">Create a new blog post or article</p>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2196F3] focus:border-[#2196F3] sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
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
              <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-1">
                Featured Image
              </label>
              <input
                type="file"
                name="featuredImage"
                id="featuredImage"
                accept="image/*"
                onChange={handleChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#87CEEB] file:text-white hover:file:bg-[#2196F3]"
              />
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows={2}
                value={formData.excerpt}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2196F3] focus:border-[#2196F3] sm:text-sm"
                placeholder="A short summary of your post"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content *
              </label>
              <textarea
                id="content"
                name="content"
                rows={12}
                required
                value={formData.content}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2196F3] focus:border-[#2196F3] sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                id="tags"
                value={formData.tags}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2196F3] focus:border-[#2196F3] sm:text-sm"
                placeholder="Enter tags separated by commas"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#2196F3] focus:border-[#2196F3] sm:text-sm rounded-md"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="allowComments"
                  name="allowComments"
                  type="checkbox"
                  checked={formData.allowComments}
                  onChange={handleChange}
                  className="focus:ring-[#2196F3] h-4 w-4 text-[#2196F3] border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="allowComments" className="font-medium text-gray-700">
                  Allow Comments
                </label>
                <p className="text-gray-500">Enable comments on this post</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2196F3]"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2196F3] hover:bg-[#1976D2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2196F3]"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost
