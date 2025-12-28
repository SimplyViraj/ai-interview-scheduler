import { useForm } from "react-hook-form";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    const res = await api.post("/auth/login", data);
    login(res.data.token, res.data.role);

    if (res.data.role === "candidate") {
      navigate("/candidate/dashboard");
    } else {
      navigate("/interviewer/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 shadow rounded w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input {...register("email")} placeholder="Email" className="input" />
        <input {...register("password")} type="password" placeholder="Password" className="input mt-2" />
        <button className="btn mt-4 w-full">Login</button>
      </form>
    </div>
  );
}
