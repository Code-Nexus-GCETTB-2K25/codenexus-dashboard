'use client'

import Link from 'next/link'

export default function EventTable({ events, loading, onEdit, onDelete }) {
    if (loading) {
        return <div className="text-center py-8 text-white">Loading events...</div>
    }

    if (events.length === 0) {
        return <div className="text-center py-8 text-white">No events found. Add one to get started!</div>
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 border border-gray-700">
                <thead className="bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">#</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                    {events.map((event, index) => (
                        <tr key={event._id} className="hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap text-gray-300">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-white font-medium">{event.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-300">{event.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-300">{event.location}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <Link
                                    href={event.link}
                                    target="_blank"
                                    className="text-blue-400 hover:text-blue-600 mr-3"
                                >
                                    View
                                </Link>
                                <button
                                    onClick={() => onEdit(event)}
                                    className="text-indigo-400 hover:text-indigo-600 mr-3"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(event._id)}
                                    className="text-red-400 hover:text-red-600"
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
