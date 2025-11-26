// app/(teacher)/teacher-dashboard/page.js

export default function DashboardPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Teacher Dashboard Overview</h1>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-xl font-semibold">Total Students</p>
          <p className="text-4xl text-blue-600">450</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-xl font-semibold">Active Courses</p>
          <p className="text-4xl text-green-600">4</p>
        </div>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        {/* รายละเอียดกิจกรรมล่าสุด */}
        <p>... Activity List goes here ...</p>
      </div>
    </section>
  );
}