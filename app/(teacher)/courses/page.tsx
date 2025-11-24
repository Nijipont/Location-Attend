// app/(teacher)/courses/page.js

import Link from "next/link";

export default function CoursesPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📚 My Courses</h1>
      
      <div className="space-y-4">
        <div className="flex justify-end items-center">
            <Link 
                href={"/course-creation"} 
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
            >
                + Create New Course
            </Link>
          </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-teal-500">
          <h3 className="text-xl font-semibold">Next.js App Router Masterclass</h3>
          <p className="text-gray-600">45 Students - 10 Modules</p>
          <button className="mt-2 text-sm text-teal-600 hover:text-teal-800">Manage Course</button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-teal-500">
          <h3 className="text-xl font-semibold">Advanced TypeScript Patterns</h3>
          <p className="text-gray-600">120 Students - 6 Modules</p>
          <button className="mt-2 text-sm text-teal-600 hover:text-teal-800">Manage Course</button>
        </div>
        {/* ... รายการคอร์สอื่น ๆ */}
      </div>
    </section>
  );
}