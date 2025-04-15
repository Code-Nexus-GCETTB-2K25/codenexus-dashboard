import Link from 'next/link'
import { LayoutDashboard } from 'lucide-react';
import { User } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';
import { Calendar1 } from 'lucide-react';
import { SquareActivity } from 'lucide-react';
import { FileCode2 } from 'lucide-react';

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
                        <Link href="/" className="py-2 px-4 rounded hover:bg-gray-700 flex items-center gap-2"><LayoutDashboard /> Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/team" className="flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-700"><CircleUserRound /> Team Members</Link>
                    </li>
                    <li>
                        <Link href="/volunteers" className="flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-700"><User /> Volunteers</Link>
                    </li>
                    <li>
                        <Link href="/events" className="flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-700"><Calendar1 /> Events</Link>
                    </li>
                    <li>
                        <Link href="/activities" className="flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-700"><SquareActivity /> Activities</Link>
                    </li>
                    <li>
                        <Link href="/resources" className="flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-700"><FileCode2 /> Resources</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}