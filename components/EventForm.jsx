'use client'

import { useState, useEffect } from 'react'

export default function EventForm({ initialData, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        shortInfo: '',
        fullDetails: '',
        location: '',
        link: '',
    })

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                date: initialData.date || '',
                shortInfo: initialData.shortInfo || '',
                fullDetails: initialData.fullDetails || '',
                location: initialData.location || '',
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
        onSubmit(formData)  // send plain object for saving
    }

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-white">
                {initialData ? 'Edit Event' : 'Add New Event'}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Event Name*</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Event Date*</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Short Info*</label>
                    <input
                        type="text"
                        name="shortInfo"
                        value={formData.shortInfo}
                        onChange={handleChange}
                        required
                        placeholder="A quick summary of the event"
                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Full Details*</label>
                    <textarea
                        name="fullDetails"
                        value={formData.fullDetails}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="Describe the event in detail..."
                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Location*</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        placeholder="Location of the event"
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
                        placeholder="https://example.com/event"
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
                        {initialData ? 'Update Event' : 'Add Event'}
                    </button>
                </div>
            </form>
        </div>
    )
}
