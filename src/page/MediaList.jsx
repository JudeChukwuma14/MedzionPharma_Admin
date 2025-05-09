
import { DownloadIcon, PlusIcon, TrashIcon } from "lucide-react"
import { useState } from "react"
// import { PlusIcon, TrashIcon, DownloadIcon } from "@heroicons/react/outline"

function MediaList() {
  const [view, setView] = useState("grid")

  const mediaFiles = [
    {
      id: 1,
      name: "product-image-1.jpg",
      type: "image/jpeg",
      size: "1.2 MB",
      uploaded: "2023-04-10",
      dimensions: "1200 x 800",
    },
    {
      id: 2,
      name: "supplement-brochure.pdf",
      type: "application/pdf",
      size: "3.5 MB",
      uploaded: "2023-04-08",
      dimensions: "-",
    },
    {
      id: 3,
      name: "vitamin-d-benefits.jpg",
      type: "image/jpeg",
      size: "0.8 MB",
      uploaded: "2023-04-05",
      dimensions: "1500 x 1000",
    },
    {
      id: 4,
      name: "protein-powder.png",
      type: "image/png",
      size: "2.1 MB",
      uploaded: "2023-04-03",
      dimensions: "2000 x 2000",
    },
    {
      id: 5,
      name: "product-catalog.pdf",
      type: "application/pdf",
      size: "5.2 MB",
      uploaded: "2023-03-28",
      dimensions: "-",
    },
    {
      id: 6,
      name: "omega3-bottle.jpg",
      type: "image/jpeg",
      size: "1.5 MB",
      uploaded: "2023-03-25",
      dimensions: "1800 x 1200",
    },
    {
      id: 7,
      name: "probiotic-info.png",
      type: "image/png",
      size: "1.8 MB",
      uploaded: "2023-03-20",
      dimensions: "1600 x 900",
    },
    {
      id: 8,
      name: "brand-logo.svg",
      type: "image/svg+xml",
      size: "0.3 MB",
      uploaded: "2023-03-15",
      dimensions: "Vector",
    },
  ]

  return (
    <div>
      <div className="flex flex-col mb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Media Library</h1>
          <p className="text-gray-600">Manage your images, documents, and other media files</p>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <div className="mr-4">
            <button
              onClick={() => setView("grid")}
              className={`px-3 py-1 rounded-md ${
                view === "grid" ? "bg-[#87CEEB] text-white" : "bg-white text-gray-700"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-3 py-1 rounded-md ${
                view === "list" ? "bg-[#87CEEB] text-white" : "bg-white text-gray-700"
              }`}
            >
              List
            </button>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2196F3] hover:bg-[#1976D2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2196F3]">
            <PlusIcon className="w-5 h-5 mr-2" />
            Upload Media
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {mediaFiles.map((file) => (
            <div key={file.id} className="overflow-hidden bg-white rounded-lg shadow">
              <div className="flex items-center justify-center h-40 bg-gray-200">
                {file.type.startsWith("image") ? (
                  <img
                    src={`/placeholder.svg?height=160&width=240`}
                    alt={file.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="text-4xl text-gray-500">{file.type.includes("pdf") ? "PDF" : "FILE"}</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 truncate">{file.name}</h3>
                <p className="mt-1 text-xs text-gray-500">
                  {file.size} • {file.uploaded}
                </p>
                <div className="flex justify-between mt-4">
                  <button className="text-[#2196F3] hover:text-[#1976D2]">
                    <DownloadIcon className="w-5 h-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    File
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Size
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Dimensions
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Uploaded
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
                {mediaFiles.map((file) => (
                  <tr key={file.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-gray-200 rounded">
                          {file.type.startsWith("image") ? (
                            <img
                              src={`/placeholder.svg?height=40&width=40`}
                              alt={file.name}
                              className="object-cover w-10 h-10 rounded"
                            />
                          ) : (
                            <div className="text-xs text-gray-500">{file.type.includes("pdf") ? "PDF" : "FILE"}</div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{file.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{file.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{file.size}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{file.dimensions}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{file.uploaded}</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      <button className="text-[#2196F3] hover:text-[#1976D2] mr-3">
                        <DownloadIcon className="w-5 h-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default MediaList
