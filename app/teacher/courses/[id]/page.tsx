"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function CourseDetail() {
  const { id } = useParams(); 
  const supabase = createClient();

  const [course, setCourse] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [studentEmail, setStudentEmail] = useState("");
  const [message, setMessage] = useState("");

  // Load course
  useEffect(() => {
    const loadCourse = async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("course_id", id)
        .single();

      if (!error) setCourse(data);
    };

    loadCourse();
  }, [id]);

  // Load sessions for this course
  useEffect(() => {
    const loadSessions = async () => {
    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .eq("course_id", id)
      .order("session_number", { ascending: false });


    if (!error) setSessions(data);
    };

    loadSessions();
  }, [id]);

  // Add student
  const handleAddStudent = async (e) => {
    e.preventDefault();
    setMessage("");

    // 1. Find user by email
    const { data: userData, error: userErr } = await supabase
      .from("profiles")
      .select("user_id")
      .eq("email", studentEmail)
      .single();

    if (userErr || !userData) {
      setMessage("❌ Student not found");
      return;
    }

    // 2. Insert enrollment
    const { error: insertErr } = await supabase.from("enrollments").insert({
      student_id: userData.user_id,
      course_id: id,
    });

    if (insertErr) {
      setMessage("❌ Already enrolled or error occurred");
    } else {
      setMessage("✅ Student added successfully!");
    }
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{course.course_name}</h1>
        <p className="text-gray-600">{course.description}</p>
      </div>

      <div className="flex gap-4">
        <a
          href={`/teacher/courses/${id}/add-session`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          ➕ Add Attendance Session
        </a>
        
      </div>

      <div className="p-4 border rounded-lg bg-gray-50 space-y-3">
        <h2 className="text-xl font-semibold">Attendance Sessions</h2>

        {sessions.length === 0 ? (
          <p className="text-gray-500">No sessions created yet.</p>
        ) : (
          <div className="space-y-3">
            {sessions.map((s) => (
              <a
                key={s.session_id}
                href={`/teacher/courses/${id}/attendance/${s.session_id}`}
                className="block p-3 border rounded-lg bg-white hover:bg-gray-100"
              >
                <div className="font-semibold">
                  Session {s.session_number}: {s.title}
                </div>
                <div className="text-sm text-gray-600">
                  Date: {s.session_date}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      <form
        onSubmit={handleAddStudent}
        className="p-4 border rounded-lg bg-gray-50 space-y-3"
      >
        <h2 className="text-xl font-semibold">Add Student to Course</h2>

        <input
          type="email"
          placeholder="Student Email"
          className="w-full p-2 border rounded"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
        >
          Add Student
        </button>

        {message && <p className="text-sm pt-1">{message}</p>}
      </form>
    </div>
  );
}
