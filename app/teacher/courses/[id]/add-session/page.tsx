"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { format } from "date-fns";

export default function AddSessionPage() {
  const { id } = useParams(); 
  const supabase = createClient();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [sessionDate, setSessionDate] = useState("");
  const [checkinStartTime, setCheckinStartTime] = useState("");
  const [checkinEndTime, setCheckinEndTime] = useState("");
  const [loading, setLoading] = useState(false);

  const setTimeToNow = (target: "start" | "end") => {
    const now = format(new Date(), "HH:mm");

    if (target === "start") setCheckinStartTime(now);
    if (target === "end") setCheckinEndTime(now);

    if (!sessionDate) {
      setSessionDate(format(new Date(), "yyyy-MM-dd"));
    }
  };

  const addSession = async () => {
    setLoading(true);

    if (!sessionDate || !checkinStartTime || !checkinEndTime) {
      alert("Please set Session Date, Start Time, and End Time.");
      setLoading(false);
      return;
    }

    const startTimestamp = new Date(
      `${sessionDate}T${checkinStartTime}:00`
    );
    const endTimestamp = new Date(
      `${sessionDate}T${checkinEndTime}:00`
    );

    if (
      isNaN(startTimestamp.getTime()) ||
      isNaN(endTimestamp.getTime())
    ) {
      alert("Invalid date or time format");
      setLoading(false);
      return;
    }

    const { data: last } = await supabase
      .from("sessions")
      .select("session_number")
      .eq("course_id", id)
      .order("session_number", { ascending: false })
      .limit(1);

    const newNumber = last?.[0]?.session_number + 1 || 1;

    const { data, error } = await supabase
      .from("sessions")
      .insert([
        {
          course_id: id,
          session_number: newNumber,
          title,
          session_date: sessionDate,
          checkin_start: startTimestamp.toISOString(),
          checkin_end: endTimestamp.toISOString(),
        },
      ])
      .select()
      .single();

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push(`/teacher/courses/${id}/attendance/${data.session_id}`);
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">
        Add Attendance Session
      </h1>

      <div>
        <label className="block mb-2 font-medium">
          Session Title
        </label>
        <input
          className="border p-3 w-full rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Lecture 1: Introduction"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Session Date
        </label>
        <input
          type="date"
          className="border p-3 w-full rounded-lg"
          value={sessionDate}
          onChange={(e) => setSessionDate(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium text-sm">
            Check-in Start Time
          </label>
          <div className="flex items-center gap-2">
            <input
              type="time"
              className="h-11 border px-3 w-full rounded-lg"
              value={checkinStartTime}
              onChange={(e) =>
                setCheckinStartTime(e.target.value)
              }
            />
            <button
              type="button"
              onClick={() => setTimeToNow("start")}
              className="h-11 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
            >
              Now
            </button>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-sm">
            Check-in End Time
          </label>
          <div className="flex items-center gap-2">
            <input
              type="time"
              className="h-11 border px-3 w-full rounded-lg"
              value={checkinEndTime}
              onChange={(e) =>
                setCheckinEndTime(e.target.value)
              }
            />
            <button
              type="button"
              onClick={() => setTimeToNow("end")}
              className="h-11 px-4 rounded-lg bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300 transition"
            >
              Now
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={addSession}
        disabled={loading}
        className="w-full bg-teal-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-teal-700 disabled:bg-gray-400 transition"
      >
        {loading ? "Creating Session..." : "Create Session"}
      </button>
    </div>
  );
}
