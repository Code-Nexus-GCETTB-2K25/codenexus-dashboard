'use client'

import { useState, useEffect } from 'react'

export default function ResourceForm({ initialData, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        title: '',
        icon: '',
        level: '',
        duration: '',
        author: '',
        topics: '',
        tags: '',
        accentColor: '',
        link: '',
    })

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                icon: initialData.icon || '',
                level: initialData.level || '',
                duration: initialData.duration || '',
                author: initialData.author || '',
                topics: (initialData.topics || []).join(', '),
                tags: (initialData.tags || []).join(', '),
                accentColor: initialData.accentColor || '',
                link: initialData.link || '',
            })
        }
    }, [initialData])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Convert comma-separated strings into arrays before submission
        const preparedData = {
            ...formData,
            topics: formData.topics.split(',').map(t => t.trim()).filter(t => t),
            tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        }

        onSubmit(preparedData)
    }

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-white">
                {initialData ? 'Edit Resource' : 'Add New Resource'}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Title*</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Icon</label>
                    <input
                        type="text"
                        name="icon"
                        value={formData.icon}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Level*</label>
                    <input
                        type="text"
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Duration*</label>
                    <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Author*</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Topics (comma-separated)</label>
                    <input
                        type="text"
                        name="topics"
                        value={formData.topics}
                        onChange={handleChange}
                        placeholder="e.g. Arrays, Linked List, Trees"
                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Tags (comma-separated)</label>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="e.g. Competitive, Interview"
                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Accent Color</label>
                    <input
                        type="text"
                        name="accentColor"
                        value={formData.accentColor}
                        onChange={handleChange}
                        placeholder="e.g. border-cyan-500 or border-purple-500"
                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Link*</label>
                    <input
                        type="text"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        required
                        placeholder="/dsa"
                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                    />
                </div>

                <div className="md:col-span-2 flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        {initialData ? 'Update Resource' : 'Add Resource'}
                    </button>
                </div>
            </form>
        </div>
    )
}
