'use client'

import { useState, useEffect } from 'react'
import TeamTable from '@/components/TeamTable'
import MemberForm from '@/components/MemberForm'

export default function TeamPage() {
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [editMember, setEditMember] = useState(null)

    // Fetch all team members
    const fetchMembers = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/team')
            const data = await response.json()

            if (data.success) {
                setMembers(data.data)
            } else {
                setError(data.error || 'Failed to fetch team members')
            }
        } catch (err) {
            setError('An error occurred while fetching data')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMembers()
    }, [])

    const handleAddNew = () => {
        setEditMember(null)
        setShowForm(true)
    }

    const handleEdit = (member) => {
        setEditMember(member)
        setShowForm(true)
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this team member?')) {
            try {
                const response = await fetch(`/api/team/${id}`, {
                    method: 'DELETE',
                })

                const data = await response.json()

                if (data.success) {
                    // Refresh the member list
                    fetchMembers()
                } else {
                    setError(data.error || 'Failed to delete team member')
                }
            } catch (err) {
                setError('An error occurred while deleting')
                console.error(err)
            }
        }
    }

    const handleFormSubmit = async (memberData) => {
        try {
            if (editMember) {
                // Update existing member
                const response = await fetch(`/api/team/${editMember._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(memberData),
                })

                const data = await response.json()

                if (data.success) {
                    fetchMembers()
                    setShowForm(false)
                    setEditMember(null)
                } else {
                    setError(data.error || 'Failed to update team member')
                }
            } else {
                // Create new member
                const response = await fetch('/api/team', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(memberData),
                })

                const data = await response.json()

                if (data.success) {
                    fetchMembers()
                    setShowForm(false)
                } else {
                    setError(data.error || 'Failed to create team member')
                }
            }
        } catch (err) {
            setError('An error occurred')
            console.error(err)
        }
    }

    const handleCancel = () => {
        setShowForm(false)
        setEditMember(null)
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Team Members</h1>
                <button
                    onClick={handleAddNew}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add New Member
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {showForm ? (
                <MemberForm
                    initialData={editMember}
                    onSubmit={handleFormSubmit}
                    onCancel={handleCancel}
                />
            ) : (
                <TeamTable
                    members={members}
                    loading={loading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </div>
    )
}