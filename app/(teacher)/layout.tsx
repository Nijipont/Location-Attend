// app/(teacher)/layout.tsx

import Link from 'next/link';
// 1. นำเข้า PropsWithChildren
import { PropsWithChildren } from 'react'; 

// Component จำลอง: Sidebar สำหรับครู
const TeacherSidebar = () => (
  <aside className="w-64 bg-slate-800 text-white p-4 flex flex-col">
    <h1 className="text-2xl font-bold mb-6">👨‍🏫 Teacher Panel</h1>
    <nav className="space-y-2">
      <Link href="/teacher-dashboard" className="block p-2 rounded hover:bg-slate-700 transition">
        📊 Dashboard
      </Link>
      <Link href="/courses" className="block p-2 rounded hover:bg-slate-700 transition">
        📚 My Courses
      </Link>
    </nav>
  </aside>
);

// Component จำลอง: Header
const TeacherHeader = () => (
  <header className="bg-white shadow-md p-4 flex justify-between items-center">
    <h2 className="text-xl font-semibold text-gray-800">Welcome back, Prof. Max!</h2>
    <button className="text-sm text-red-500 hover:text-red-700">Logout</button>
  </header>
);

// 2. แก้ไขโดยการเพิ่ม Type PropsWithChildren
export default function TeacherLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen">
      {/* 1. Sidebar จะอยู่ด้านซ้ายเสมอ */}
      <TeacherSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* 2. Header จะอยู่ด้านบนเสมอ */}
        <TeacherHeader />
        
        {/* 3. children คือเนื้อหาของหน้าปัจจุบัน (Dashboard หรือ Courses) */}
        <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}