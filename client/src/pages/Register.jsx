import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../auth/useAuth";
import { BackgroundPaths } from "../components/ui/BackgroundPaths";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/register", data);
      login(res.data.token, res.data.role);

      navigate(
        res.data.role === "candidate"
          ? "/candidate/dashboard"
          : "/interviewer/dashboard"
      );
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-white">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <BackgroundPaths />
      </div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-black/10"
        >
          <h2 className="text-2xl font-bold text-black text-center">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 text-center mt-1">
            Get started in seconds
          </p>

          {/* Name */}
          <div className="mt-6">
            <label className="text-sm font-medium text-black">
              Full Name
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="John Doe"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-black
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          {/* Email */}
          <div className="mt-4">
            <label className="text-sm font-medium text-black">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-black
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-700"
            />
          </div>

          {/* Password */}
          <div className="mt-4">
            <label className="text-sm font-medium text-black">
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-black
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-700"
            />
          </div>

          {/* Role */}
          <div className="mt-4">
            <label className="text-sm font-medium text-black">
              Role
            </label>
            <select
              {...register("role", { required: true })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-black
              focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-700"
            >
              <option value="">Select role</option>
              <option value="candidate">Candidate</option>
              <option value="interviewer">Interviewer</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-black py-2.5 text-white font-semibold 
            hover:bg-neutral-900 transition duration-200 shadow-md"
          >
            Register
          </button>

          {/* Login */}
          <p className="text-sm text-gray-600 mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-black font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
