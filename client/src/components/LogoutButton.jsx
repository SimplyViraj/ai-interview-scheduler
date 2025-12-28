import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        logout();
        navigate("/login");
      }}
      className="text-sm underline"
    >
      Logout
    </button>
  );
}
export default LogoutButton;