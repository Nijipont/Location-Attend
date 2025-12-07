"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AttendancePage({ params }) {
  const { id, session_id } = params; // course_id + session_id
  const supabase = createClient();

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // 1. ดึงนักศึกษาที่ลงทะเบียนใน course นี้
      const { data: enrolls } = await supabase
        .from("enrollments")
        .select("student_id, profiles(username)")
        .eq("course_id", id);

      setStudents(enrolls || []);

      // 2. ดึง attendance ที่มีอยู่แล้ว
      const { data: attendanceData } = await supabase
        .from("attendance")
        .select("*")
        .eq("session_id", session_id);

      // แปลงเป็น dict
      const a = {};
      attendanceData?.forEach((row) => {
        a[row.student_id] = row.status;
      });

      setAttendance(a);
      setLoading(false);
    };

    loadData();
  }, []);

  const updateStatus = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const saveAttendance = async () => {
    const updates = students.map((s) => ({
      session_id,
      student_id: s.student_id,
      status: attendance[s.student_id] || "absent",
    }));

    const { error } = await supabase.from("attendance").upsert(updates);

    if (!error) alert("Attendance saved!");
    else alert(error.message);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Attendance for Session {session_id}
      </h1>

      <div className="space-y-4">
        {students.map((s) => (
          <div
            key={s.student_id}
            className="flex justify-between items-center p-4 bg-white shadow rounded"
          >
            <span className="font-medium">{s.profiles.username}</span>

            <div className="space-x-2">
              <button
                onClick={() => updateStatus(s.student_id, "present")}
                className={`px-3 py-1 rounded ${
                  attendance[s.student_id] === "present"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Present
              </button>

              <button
                onClick={() => updateStatus(s.student_id, "absent")}
                className={`px-3 py-1 rounded ${
                  attendance[s.student_id] === "absent"
                    ? "bg-red-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Absent
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={saveAttendance}
        className="mt-6 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
      >
        Save Attendance
      </button>
    </div>
  );
}
