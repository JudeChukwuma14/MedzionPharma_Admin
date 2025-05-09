
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react"

function PageList() {
  const pages = [
    { id: 1, title: "Home", slug: "home", status: "Published", lastUpdated: "2023-04-10" },
    { id: 2, title: "About Us", slug: "about-us", status: "Published", lastUpdated: "2023-04-08" },
    { id: 3, title: "Contact", slug: "contact", status: "Published", lastUpdated: "2023-04-05" },
    { id: 4, title: "FAQ", slug: "faq", status: "Published", lastUpdated: "2023-04-03" },
    { id: 5, title: "Terms & Conditions", slug: "terms-conditions", status: "Published", lastUpdated: "2023-03-28" },
    { id: 6, title: "Privacy Policy", slug: "privacy-policy", status: "Published", lastUpdated: "2023-03-25" },
    { id: 7, title: "Shipping & Returns", slug: "shipping-returns", status: "Draft", lastUpdated: "2023-03-20" },
    { id: 8, title: "Blog", slug: "blog", status: "Published", lastUpdated: "2023-03-15" },
  ]

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Pages</h1>
          <p className="text-gray-600">Manage your static pages</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2196F3] hover:bg-[#1976D2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2196F3]">
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Page
          </button>
        </div>
      </div>

      {/* Pages Table */}
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
                  Slug
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
                  Last Updated
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
              {pages.map((page) => (
                <tr key={page.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{page.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">/{page.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${page.status === "Published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                    >
                      {page.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{page.lastUpdated}</div>
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

export default PageList
