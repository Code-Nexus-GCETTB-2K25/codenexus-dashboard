export default function ResourceTable({ resources, loading, onEdit, onDelete }) {
    if (loading) {
        return <div className="text-center py-8 text-white">Loading resources...</div>
    }

    if (resources.length === 0) {
        return <div className="text-center py-8 text-white">No resources found. Add one to get started!</div>
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 border border-gray-700">
                <thead className="bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Level</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Author</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                    {resources.map((resource) => (
                        <tr key={resource._id} className="hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap text-gray-300">{resource.order}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <span className="text-2xl mr-2">{resource.icon}</span>
                                    <div>
                                        <div className="font-medium text-white">{resource.title}</div>
                                        <Link href={resource.link} className="text-sm text-gray-400">{resource.link}</Link>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-300">{resource.level}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-300">{resource.author}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                    onClick={() => onEdit(resource)}
                                    className="text-indigo-400 hover:text-indigo-600 mr-3 cursor-pointer"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(resource._id)}
                                    className="text-red-400 hover:text-red-600 cursor-pointer"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
