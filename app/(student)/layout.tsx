// app/(student)/layout.tsx

import Link from 'next/link';
import { PropsWithChildren } from 'react'; // เพื่อแก้ปัญหา Type Error ของ children

// Component จำลอง: Sidebar สำหรับนักเรียน
const StudentSidebar = () => (
  <aside className="w-64 bg-indigo-700 text-white p-4 flex flex-col">
    <h1 className="text-2xl font-bold mb-6">🧑‍🎓 Student Portal</h1>
    <nav className="space-y-2">
      <Link href="/student-dashboard" className="block p-2 rounded hover:bg-indigo-600 transition">
        🚀 Enrolled Courses
      </Link>
    </nav>
  </aside>
);

// Component จำลอง: Header
const StudentHeader = () => (
  <header className="bg-white shadow-md p-4 flex justify-between items-center">
    <h2 className="text-xl font-semibold text-gray-800">Hello, New Student!</h2>
    <button className="text-sm text-red-500 hover:text-red-700">Logout</button>
  </header>
);

// Component หลัก: StudentLayout
export default function StudentLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar เฉพาะนักเรียน */}
      <StudentSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header เฉพาะนักเรียน */}
        <StudentHeader />
        
        {/* เนื้อหาของหน้าย่อย */}
        <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}