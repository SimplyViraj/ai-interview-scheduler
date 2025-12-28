import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../auth/useAuth";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/register", data);

      // save auth
      login(res.data.token, res.data.role);

      // role-based redirect
      if (res.data.role === "candidate") {
        navigate("/candidate/dashboard");
      } else {
        navigate("/interviewer/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 shadow rounded w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Create Account
        </h2>

        <input
          {...register("name", { required: true })}
          placeholder="Full Name"
          className="input"
        />

        <input
          {...register("email", { required: true })}
          placeholder="Email"
          className="input mt-3"
        />

        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="Password"
          className="input mt-3"
        />

        <select
          {...register("role", { required: true })}
          className="input mt-3"
        >
          <option value="">Select role</option>
          <option value="candidate">Candidate</option>
          <option value="interviewer">Interviewer</option>
        </select>

        <button className="btn mt-5 w-full">
          Register
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
