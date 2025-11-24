// app/(student)/student-dashboard/page.tsx

export default function StudentDashboardPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🚀 My Learning Progress</h1>
      
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <p className="text-xl font-semibold">Courses Completed</p>
          <p className="text-4xl text-green-600">6</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <p className="text-xl font-semibold">Average Grade</p>
          <p className="text-4xl text-blue-600">A-</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <p className="text-xl font-semibold">Next Deadline</p>
          <p className="text-xl text-red-600 mt-2">React Final Project</p>
          <p className="text-sm text-gray-500">Dec 15</p>
        </div>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Latest Course Activity</h2>
        {/* รายละเอียดกิจกรรมล่าสุด */}
        <p>You submitted 'Lesson 5 Quiz' for Next.js Masterclass.</p>
      </div>
    </section>
  );
}