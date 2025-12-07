// app/(student)/layout.tsx
"use client";

import Link from 'next/link';
import { PropsWithChildren } from 'react'; // เพื่อแก้ปัญหา Type Error ของ children
import ClientLogoutButton from '@/app/clientLogoutButton';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from "react";


// Component จำลอง: Sidebar สำหรับนักเรียน
const StudentSidebar = () => (
  <aside className="w-64 bg-indigo-700 text-white p-4 flex flex-col">
    <h1 className="text-2xl font-bold mb-6">🧑‍🎓 Student Portal</h1>
    <nav className="space-y-2">
      <Link href="student/student-dashboard" className="block p-2 rounded hover:bg-indigo-600 transition">
        Enrolled Courses
      </Link>
    </nav>
  </aside>
);


// Component หลัก: StudentLayout
export default function StudentLayout({ children }: PropsWithChildren) {
  const supabase = createClient();
  const [firstname, setFirstname] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("firstname")
        .eq("user_id", user.id)
        .single();

      setFirstname(profile?.firstname || "Student");
    };

    loadProfile();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar เฉพาะนักเรียน */}
      <StudentSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header เฉพาะนักเรียน */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Hello, {firstname}</h2>
        <ClientLogoutButton></ClientLogoutButton>
        </header>
        
        {/* เนื้อหาของหน้าย่อย */}
        <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}