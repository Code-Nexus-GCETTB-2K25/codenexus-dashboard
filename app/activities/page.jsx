'use client'

import { useState, useEffect } from 'react'
import ActivityForm from '@/components/ActivityForm'
import ActivityTable from '@/components/ActivityTable'

export default function ActivityPage() {
    const [activities, setActivities] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [editActivity, setEditActivity] = useState(null)

    const fetchActivities = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/activities')
            const data = await response.json()

            if (data.success) {
                setActivities(data.data)
            } else {
                setError(data.error || 'Failed to fetch activities')
            }
        } catch (err) {
            setError('An error occurred while fetching data')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchActivities()
    }, [])

    const handleAddNew = () => {
        setEditActivity(null)
        setShowForm(true)
    }

    const handleEdit = (activity) => {
        setEditActivity(activity)
        setShowForm(true)
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this activity?')) {
            try {
                const response = await fetch(`/api/activities/${id}`, { method: 'DELETE' })
                const data = await response.json()

                if (data.success) {
                    fetchActivities()
                } else {
                    setError(data.error || 'Failed to delete activity')
                }
            } catch (err) {
                setError('An error occurred while deleting')
                console.error(err)
            }
        }
    }

    const handleFormSubmit = async (activityData) => {
        try {
            if (editActivity) {
                // Update existing activity
                const response = await fetch(`/api/activities/${editActivity._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(activityData),
                })
                const data = await response.json()

                if (data.success) {
                    fetchActivities()
                    setShowForm(false)
                    setEditActivity(null)
                } else {
                    setError(data.error || 'Failed to update activity')
                }
            } else {
                // Create new activity
                const response = await fetch('/api/activities', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(activityData),
                })
                const data = await response.json()

                if (data.success) {
                    fetchActivities()
                    setShowForm(false)
                } else {
                    setError(data.error || 'Failed to create activity')
                }
            }
        } catch (err) {
            setError('An error occurred')
            console.error(err)
        }
    }

    const handleCancel = () => {
        setShowForm(false)
        setEditActivity(null)
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Activities</h1>
                <button
                    onClick={handleAddNew}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add New Activity
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {showForm ? (
                <ActivityForm
                    initialData={editActivity}
                    onSubmit={handleFormSubmit}
                    onCancel={handleCancel}
                />
            ) : (
                <ActivityTable
                    activities={activities}
                    loading={loading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </div>
    )
}
