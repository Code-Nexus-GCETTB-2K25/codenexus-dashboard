'use client'

import { useState, useEffect } from 'react'
import EventForm from '@/components/EventForm'
import EventTable from '@/components/EventTable'

export default function EventPage() {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [editEvent, setEditEvent] = useState(null)

    const fetchEvents = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/events')
            const data = await response.json()

            if (data.success) {
                setEvents(data.data)
            } else {
                setError(data.error || 'Failed to fetch events')
            }
        } catch (err) {
            setError('An error occurred while fetching data')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    const handleAddNew = () => {
        setEditEvent(null)
        setShowForm(true)
    }

    const handleEdit = (event) => {
        setEditEvent(event)
        setShowForm(true)
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                const response = await fetch(`/api/events/${id}`, {
                    method: 'DELETE',
                })

                const data = await response.json()

                if (data.success) {
                    fetchEvents()
                } else {
                    setError(data.error || 'Failed to delete event')
                }
            } catch (err) {
                setError('An error occurred while deleting')
                console.error(err)
            }
        }
    }

    const handleFormSubmit = async (eventData) => {
        try {
            if (editEvent) {
                // Update existing event
                const response = await fetch(`/api/events/${editEvent._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(eventData),
                })

                const data = await response.json()

                if (data.success) {
                    fetchEvents()
                    setShowForm(false)
                    setEditEvent(null)
                } else {
                    setError(data.error || 'Failed to update event')
                }
            } else {
                // Create new event
                const response = await fetch('/api/events', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(eventData),
                })

                const data = await response.json()

                if (data.success) {
                    fetchEvents()
                    setShowForm(false)
                } else {
                    setError(data.error || 'Failed to create event')
                }
            }
        } catch (err) {
            setError('An error occurred')
            console.error(err)
        }
    }

    const handleCancel = () => {
        setShowForm(false)
        setEditEvent(null)
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Events</h1>
                <button
                    onClick={handleAddNew}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                >
                    Add New Event
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {showForm ? (
                <EventForm
                    initialData={editEvent}
                    onSubmit={handleFormSubmit}
                    onCancel={handleCancel}
                />
            ) : (
                <EventTable
                    events={events}
                    loading={loading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </div>
    )
}
