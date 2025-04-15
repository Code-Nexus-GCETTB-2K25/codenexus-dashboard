'use client'

import { useState, useEffect } from 'react'
import ResourceForm from '@/components/ResourceForm'
import ResourceTable from '@/components/ResourceTable'

export default function ResourcePage() {
    const [resources, setResources] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [editResources, setEditResources] = useState(null)

    const fetchResources = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/resources')
            const data = await response.json()

            if (data.success) {
                setResources(data.data)
            } else {
                setError(data.error || 'Failed to fetch resources')
            }
        } catch (err) {
            setError('An error occurred while fetching data')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchResources()
    }, [])

    const handleAddNew = () => {
        setEditResources(null)
        setShowForm(true)
    }

    const handleEdit = (resource) => {
        setEditResources(resource)
        setShowForm(true)
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this Resource?')) {
            try {
                const response = await fetch(`/api/resources/${id}`, {
                    method: 'DELETE',
                })

                const data = await response.json()

                if (data.success) {
                    fetchResources()
                } else {
                    setError(data.error || 'Failed to delete')
                }
            } catch (err) {
                setError('An error occurred while deleting')
                console.error(err)
            }
        }
    }

    const handleFormSubmit = async (resourceData) => {
        try {
            if (editResources) {
                // Update existing resource
                const response = await fetch(`/api/resources/${editResources._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(resourceData),
                })

                const data = await response.json()

                if (data.success) {
                    fetchResources()
                    setShowForm(false)
                    setEditResources(null)
                } else {
                    setError(data.error || 'Failed to update')
                }
            } else {
                // Create new resource
                const response = await fetch('/api/resources', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(resourceData),
                })

                const data = await response.json()

                if (data.success) {
                    fetchResources()
                    setShowForm(false)
                } else {
                    setError(data.error || 'Failed to create')
                }
            }
        } catch (err) {
            setError('An error occurred')
            console.error(err)
        }
    }

    const handleCancel = () => {
        setShowForm(false)
        setEditResources(null)
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Resources</h1>
                <button
                    onClick={handleAddNew}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                >
                    Add New Resource
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {showForm ? (
                <ResourceForm
                    initialData={editResources}
                    onSubmit={handleFormSubmit}
                    onCancel={handleCancel}
                />
            ) : (
                <ResourceTable
                    resources={resources}
                    loading={loading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </div>
    )
}
