import { Loader2 } from "lucide-react"

export default function TeamTable({ members, loading, onEdit, onDelete }) {
    if (loading) {
        return <div className="text-center py-8 text-white flex items-center justify-center gap-2"><Loader2 className="animate-spin"/>Loading...</div>
    }

    if (members.length === 0) {
        return <div className="text-center py-8 text-white">No members found. Add one to get started!</div>
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 border border-gray-700">
                <thead className="bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                    {members.map((member) => (
                        <tr key={member._id} className="hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap text-gray-300">{member.order}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    {member.image && (
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="h-10 w-10 rounded-full mr-3 object-cover"
                                        />
                                    )}
                                    <div>
                                        <div className="font-medium text-white">{member.name}</div>
                                        <div className="flex flex-col gap-1">
                                            {member.linkedin && (
                                                <a
                                                    href={member.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-400 hover:underline text-sm"
                                                >
                                                    LinkedIn Profile
                                                </a>
                                            )}
                                            {member.insta && (
                                                <a
                                                    href={member.insta}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-400 hover:underline text-sm"
                                                >
                                                    Instagram Profile
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-300">{member.role}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                    onClick={() => onEdit(member)}
                                    className="text-indigo-400 hover:text-indigo-600 mr-3 cursor-pointer"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(member._id)}
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
