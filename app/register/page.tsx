export default function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-300 font-sans text-zinc-900 p-4">
      <main className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Create an <span className="text-blue-600">Account</span>
        </h1>

        <form className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstname" className="block font-medium mb-1">First Name</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                required
                className="w-full border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="lastname" className="block font-medium mb-1">Last Name</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                required
                className="w-full border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="username" className="block font-medium mb-1">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="w-full border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-medium mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-zinc-600 mt-1">
              • ต้องมีอย่างน้อย 8 ตัวอักษร<br />
              • ต้องมีตัวพิมพ์ใหญ่ 1 ตัว<br />
              • ต้องมีตัวเลข 1 ตัว<br />
              • ต้องมีสัญลักษณ์อย่างน้อย 1 ตัว
            </p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              className="w-full border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Register
          </button>

          <p className="text-center text-sm mt-2">
            Already have an account? <a href="/" className="text-blue-600 hover:underline">Login</a>
          </p>
        </form>
      </main>
    </div>
  );
}
