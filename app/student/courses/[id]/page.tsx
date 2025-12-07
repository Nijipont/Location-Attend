"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function CourseDetailPage({ params }) {
  const { id } = params; // course_id
  const supabase = createClient();

  const [course, setCourse] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // course info
      const { data: courseData } = await supabase
        .from("courses")
        .select("*")
        .eq("course_id", id)
        .single();

      // sessions
      const { data: sessionData } = await supabase
        .from("sessions")
        .select("*")
        .eq("course_id", id);

      // attendance
      const { data: attendanceData } = await supabase
        .from("attendance")
        .select("session_id, status")
        .eq("student_id", user.id);

      setCourse(courseData);
      setSessions(sessionData || []);
      setAttendance(attendanceData || []);
    };

    loadData();
  }, [id]);

  const getStatus = (sessionId) =>
    attendance.find((a) => a.session_id === sessionId)?.status || "Not marked";

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">{course?.course_name}</h1>
      <p className="mb-6 text-gray-700">{course?.description}</p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Sessions</h2>

      <div className="space-y-4">
        {sessions.map((s) => (
          <div key={s.session_id} className="p-4 bg-white rounded shadow">
            <h3 className="font-semibold">
              Session {s.session_number}: {s.title}
            </h3>
            <p>Date: {s.session_date}</p>
            <p>Status: {getStatus(s.session_id)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
