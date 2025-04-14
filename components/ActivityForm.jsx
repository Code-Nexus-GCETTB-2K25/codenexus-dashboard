'use client'

import { useState, useEffect } from 'react'

export default function ActivityForm({ initialData, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        date: '',
    })

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                summary: initialData.summary || '',
                date: initialData.date || '',
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
        onSubmit(formData)  // Send cleaned object to parent
    }

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-white">
                {initialData ? 'Edit Activity' : 'Add New Activity'}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-4">

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Activity Title*</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="Enter activity title"
                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Summary*</label>
                    <textarea
                        name="summary"
                        value={formData.summary}
                        onChange={handleChange}
                        required
                        rows={3}
                        placeholder="Short summary of the activity"
                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Date*</label>
                    <input
                        type="text"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        placeholder="e.g. March 15, 2025"
                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                    />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-600 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
                    >
                        {initialData ? 'Update Activity' : 'Add Activity'}
                    </button>
                </div>
            </form>
        </div>
    )
}
