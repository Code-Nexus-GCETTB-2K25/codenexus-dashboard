import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">CodeNexus Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-indigo-950">
        <Link href="/team" className="block p-6 bg-white rounded-lg shadow hover:bg-gray-50 ">
          <h2 className="text-xl font-semibold mb-2">Team Members</h2>
          <p className="text-gray-600">Manage your team members information</p>
        </Link>

        <Link href="/volunteers" className="block p-6 bg-white rounded-lg shadow hover:bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Volunteers</h2>
          <p className="text-gray-600">Manage your volunteers information</p>
        </Link>

        <Link href="/resources" className="block p-6 bg-white rounded-lg shadow hover:bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Resources</h2>
          <p className="text-gray-600">Manage team resources and assets</p>
        </Link>
        <Link href="/events" className="block p-6 bg-white rounded-lg shadow hover:bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Events</h2>
          <p className="text-gray-600">Manage events</p>
        </Link>
        <Link href="/activities" className="block p-6 bg-white rounded-lg shadow hover:bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Activities</h2>
          <p className="text-gray-600">Manage recent activities</p>
        </Link>
      </div>
    </div>
  )
}