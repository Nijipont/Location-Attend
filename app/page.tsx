export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-300 font-sans text-zinc-900 p-4">
      <main className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-center">Welcome to <span className="text-blue-600">Location Attend</span></h1>

          <div className="bg-zinc-50 p-6 rounded-xl shadow-inner">
            <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block font-medium mb-1">Email:</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  required
                  className="w-full border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block font-medium mb-1">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="w-full border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Login
              </button>

              <div className="text-center mt-2">
                <a href="/register" className="text-blue-600 hover:underline">Register</a>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
