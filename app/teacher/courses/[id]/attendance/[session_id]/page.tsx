import { createClient } from "@/lib/supabase/server";

export default async function SessionAttendancePage({
  params,
}: {
  params: Promise<{ id: string; session_id: string }>;
}) {
  const { id, session_id } = await params; 

  const sessionId = Number(session_id);

  if (isNaN(sessionId)) {
    return <p className="p-6 text-red-600">Invalid session id</p>;
  }

  const supabase = await createClient();

  const { data: session, error: sessionError } = await supabase
    .from("sessions")
    .select("*")
    .eq("session_id", sessionId)
    .single();

  const { data: attendance, error: attendanceError } = await supabase
    .from("attendance")
    .select("id, checked_at, profiles(firstname, lastname, user_id, username)")
    .eq("session_id", sessionId)
    .order("checked_at", { ascending: true });

  if (sessionError) {
     console.log("Error loading session:", sessionError);
    return <p className="p-6 text-red-600">Session not found</p>;
  }else if (attendanceError) {
    console.log("Error loading attendance:", attendanceError);
    return <p className="p-6 text-red-600">Error loading attendance</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Session {session.session_number}: {session.title}
        </h1>
        <p className="text-gray-600">
          Date: {session.session_date}
        </p>
        <p className="text-gray-600">
          Check-in Time:{" "}
          {new Date(session.checkin_start).toLocaleTimeString()} -{" "}
          {new Date(session.checkin_end).toLocaleTimeString()}
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Checked-in Students</h2>

        {attendance?.length ? (
          attendance.map((a, index) => (
            <div
              key={a.id}
              className="flex justify-between items-center p-3 border rounded-lg bg-white"
            >
              <div>
                <p className="font-semibold">
                  {index + 1}. {a.profiles?.firstname} {a.profiles?.lastname}
                </p>
                <p className="text-sm text-gray-500">
                  Student ID: {a.profiles?.username}
                </p>
              </div>

              <p className="text-sm text-gray-600">
                {new Date(a.checked_at).toLocaleTimeString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No students have checked in yet.</p>
        )}
      </div>
    </div>
  );
}
