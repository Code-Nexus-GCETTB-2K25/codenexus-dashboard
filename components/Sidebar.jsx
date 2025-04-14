import Link from 'next/link'

export default function Sidebar() {
    return (
        <div className="h-full p-4">
            <div className="mb-8">
                <Link href="/" className="text-xl font-bold flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    CodeNexus
                </Link>
            </div>

            <nav>
                <ul className="space-y-2">
                    <li>
                        <Link href="/" className="block py-2 px-4 rounded hover:bg-gray-700">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/team" className="block py-2 px-4 rounded hover:bg-gray-700">Team Members</Link>
                    </li>
                    <li>
                        <Link href="/volunteers" className="block py-2 px-4 rounded hover:bg-gray-700">Volunteers</Link>
                    </li>
                    <li>
                        <Link href="/events" className="block py-2 px-4 rounded hover:bg-gray-700">Events</Link>
                    </li>
                    <li>
                        <Link href="/activities" className="block py-2 px-4 rounded hover:bg-gray-700">Activities</Link>
                    </li>
                    <li>
                        <Link href="/resources" className="block py-2 px-4 rounded hover:bg-gray-700">Resources</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}