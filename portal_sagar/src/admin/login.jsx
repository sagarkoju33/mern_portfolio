import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HideLoading, ShowLoading } from "../redux/rootSlice";
import { useDispatch } from "react-redux";

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/admin-login", user);
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        console.log(response.data.message);
        navigate("/dashboard");

      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.success(error.message);
      dispatch(HideLoading());
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#000515] text-white">
      <div className="w-96 p-6 rounded-lg shadow-lg border border-gray-500 flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-center">Admin Login</h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full border border-gray-400 p-2 rounded bg-transparent text-white"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-400 p-2 rounded bg-transparent text-white"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-400 text-white py-2 rounded-md hover:bg-green-500 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
