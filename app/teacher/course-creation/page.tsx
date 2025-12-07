"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateCoursePage() {
  const supabase = createClient();
  const router = useRouter();

  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. ดึง user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Not logged in");
      return;
    }

    // 2. INSERT ลง table courses
    const { error } = await supabase.from("courses").insert({
      course_id: courseId,
      course_name: courseName,
      description: description,
      teacher_id: user.id, // เพิ่ม teacher_id
    });

    if (error) {
      console.error(error);
      setMessage("Error creating course: " + error.message);
      return;
    }

   setMessage("Course created successfully!");
   setTimeout(() => router.push("/teacher/courses"), 3000);

    // 3. redirect กลับไปหน้า course list
    router.push("/teacher/courses");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Create New Course</h1>
        <Link href="/courses" className="text-teal-600 hover:text-teal-800 flex items-center">
          ← Back to Course List
        </Link>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-xl border">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block mb-1 text-gray-700">Course ID</label>
            <input
              type="text"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              placeholder="e.g., NEXTJS-001"
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block mb-1 text-gray-700">Course Title</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Course title"
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-gray-700">Short Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full p-3 border rounded-lg"
              placeholder="Provide a short description"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700"
            >
              Create Course
            </button>
          </div>
          {message && (
            <div className="p-3 mb-4 text-green-700 bg-green-100 border border-green-300 rounded">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
