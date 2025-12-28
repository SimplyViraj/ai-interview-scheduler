import { useForm } from "react-hook-form";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { BackgroundPaths } from "../components/ui/BackgroundPaths";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    const res = await api.post("/auth/login", data);
    login(res.data.token, res.data.role, { name: res.data.name, email: res.data.email });
    console.log("LOGIN RESPONSE:", res.data);

    if (res.data.role === "candidate") {
      navigate("/candidate/dashboard");
    } else {
      navigate("/interviewer/dashboard");
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-white">
      
      <div className="absolute inset-0 z-0">
        <BackgroundPaths />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-black/10"
        >
          <h2 className="text-2xl font-bold text-black text-center">
           AI Scheduler
          </h2>
          <p className="text-sm text-gray-500 text-center mt-1">
            Sign in to continue
          </p>

          <div className="mt-6">
            <label className="text-sm font-medium text-black">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-black
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-700"
            />
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-black">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-black
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition duration-700"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-black py-2.5 text-white font-semibold 
            hover:bg-neutral-900 transition duration-2000 shadow-md"
          >
            Login
          </button>
          <p className="text-sm text-gray-600 mt-6 text-center">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-black font-medium hover:underline"
            >
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
