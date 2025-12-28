import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../api/api";
export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await api.post("/auth/login", data);
    localStorage.setItem("token", res.data.token);
    navigate("/availability"); // ✅ REDIRECT
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} placeholder="Email" />
      <input {...register("password")} type="password" />
      <button>Login</button>
    </form>
  );
}
