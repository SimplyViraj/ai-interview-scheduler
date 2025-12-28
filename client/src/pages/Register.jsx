import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../api/api";
export default function Register() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await api.post("/auth/register", data);
    localStorage.setItem("token", res.data.token);
    navigate("/availability"); // ✅ REDIRECT
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      <input {...register("email")} />
      <input {...register("password")} type="password" />
      <select {...register("role")}>
        <option value="candidate">Candidate</option>
        <option value="interviewer">Interviewer</option>
      </select>
      <button>Register</button>
    </form>
  );
}
