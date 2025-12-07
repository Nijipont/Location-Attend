// app/(student)/student-dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function StudentDashboardPage() {
  const supabase = createClient();
  const [myCourses, setMyCourses] = useState([]);

    useEffect(() => {
    const loadEnrolls = async () => {
        const {
        data: { user },
        } = await supabase.auth.getUser();

        const { data } = await supabase
        .from("enrollments")
        .select("course_id, courses(*)")
        .eq("student_id", user.id);

        setMyCourses(data);
    };

    loadEnrolls();
    }, []);

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Enrolled courses</h1>
      <div className="space-y-4">
         {myCourses.map((e) => (
        <div key={e.course_id} className="p-4 bg-white rounded-lg shadow">
           <h3 className="text-xl font-semibold">{e.course_id} | {e.courses.course_name}</h3>
           <p className="text-gray-600">{e.courses.description}</p>
           <Link
             href={`/student/courses/${e.course_id}`}
             className="mt-2 inline-block text-sm text-teal-600 hover:text-teal-800"
           >
             View Course →
           </Link>
        </div>
        ))}
      </div>
    </section>
  );
}