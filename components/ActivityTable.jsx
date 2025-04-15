'use client'

import { Loader2 } from "lucide-react"

export default function ActivityTable({ activities, loading, onEdit, onDelete }) {
    if (loading) {
        return <div className="text-center py-8 text-white flex items-center justify-center gap-2"><Loader2 className="animate-spin"/>Loading activities...</div>
    }

    if (activities.length === 0) {
        return <div className="text-center py-8 text-white">No activities found. Add one to get started!</div>
    }

    return (
        <div className="overflow-x-auto max-w-full">
            <table className="max-w-full bg-gray-800 border border-gray-700">
                <thead className="bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">#</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Summary</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                    {activities.map((activity, index) => (
                        <tr key={activity._id} className="hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap text-gray-300">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-white font-medium">{activity.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-300">{activity.summary}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-300">{activity.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                    onClick={() => onEdit(activity)}
                                    className="text-indigo-400 hover:text-indigo-600 mr-3 cursor-pointer"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(activity._id)}
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
