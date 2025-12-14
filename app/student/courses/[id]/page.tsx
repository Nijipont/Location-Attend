"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function CourseDetailPage() {
  const { id } = useParams(); // course_id
  const supabase = createClient();

  const [course, setCourse] = useState<any>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: courseData } = await supabase
        .from("courses")
        .select("*")
        .eq("course_id", id)
        .single();

      const { data: sessionData } = await supabase
        .from("sessions")
        .select(
          "session_id, session_number, title, session_date, checkin_start, checkin_end"
        )
        .eq("course_id", id)
        .order("session_number", { ascending: false });

      const { data: attendanceData } = await supabase
        .from("attendance")
        .select("session_id, status")
        .eq("student_id", user.id);

      setCourse(courseData);
      setSessions(sessionData || []);
      setAttendance(attendanceData || []);
    };

    loadData();
    setErrorMsg(null);
  }, [id]);

  const getStatus = (sessionId: number) =>
    attendance.find((a) => a.session_id === sessionId)?.status ||
    "Not checked";

  const isWithinTime = (start?: string, end?: string) => {
    if (!start || !end) return false;

    const now = new Date();
    return now >= new Date(start) && now <= new Date(end);
  };

  const checkIn = async (sessionId: number) => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/check-network");
      if (!res.ok) throw new Error("Network check failed");

      const network = await res.json();

      if (!network.allowed) {
        setErrorMsg("❌ You are not in the allowed location to check-in.");
        setLoading(false);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error } = await supabase.from("attendance").insert([
        {
          session_id: sessionId,
          student_id: user.id,
          status: "Present",
        },
      ]);

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      setAttendance((prev) => [
        ...prev,
        { session_id: sessionId, status: "Present" },
      ]);
    } catch (err) {
      setErrorMsg("⚠️ Unable to verify network. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      {errorMsg && (
        <div className="p-3 rounded-lg bg-red-100 text-red-700 border border-red-300">
          {errorMsg}
        </div>
      )}
      <h1 className="text-3xl font-bold">{course.course_name}</h1>
      <p className="text-gray-600">{course.description}</p>

      <h2 className="text-xl font-semibold">Attendance Sessions</h2>

      {sessions.map((s) => {
        const status = getStatus(s.session_id);
        const inTime = isWithinTime(s.checkin_start, s.checkin_end);

        const canCheckIn =
          status !== "Present" && inTime && !loading;

        return (
          <div
            key={s.session_id}
            className="p-4 border rounded bg-white flex justify-between items-center"
          >
            <div>
              <div className="font-semibold">
                Session {s.session_number}: {s.title}
              </div>
              <div className="text-sm text-gray-600">
                Date: {s.session_date}
              </div>
              <div
                className={`text-sm font-medium ${status === "Present"
                  ? "text-green-600"
                  : inTime
                    ? "text-yellow-600"
                    : "text-red-500"
                  }`}
              >
                {status}
                {status !== "Present" &&
                  (inTime ? " (Open)" : " (Closed)")}
              </div>
            </div>

            {canCheckIn && (
              <button
                onClick={() => checkIn(s.session_id)}
                disabled={!canCheckIn}
                className={`px-4 py-2 rounded text-white ${canCheckIn
                    ? "bg-teal-600 hover:bg-teal-700"
                    : "bg-gray-400 cursor-not-allowed"
                  }`}
              >
                {status === "Present"
                  ? "Checked"
                  : inTime
                    ? "Check-in"
                    : "Closed"}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
