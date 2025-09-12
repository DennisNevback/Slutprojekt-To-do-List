import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5162/api/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Felaktigt användarnamn eller lösenord");
      }

      // Om API:t returnerar en token eller annan data:
      const data = await response.json();
      console.log("Inloggad!", data);

      // 👉 Spara token i localStorage (eller sessionStorage)
      //Innehpller 
      localStorage.setItem("token", data.token);

      //decode JWT token to access id
      const token = localStorage.getItem("token");
      const jwtDecoded = jwtDecode(token);
      localStorage.setItem("userId", jwtDecoded.nameid); // spara användarid separat

      // Skicka användaren vidare
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
  <div className="flex items-center justify-center min-h-screen w-screen bg-black">
    <div className="w-full max-w-sm bg-gray-800 rounded-2xl shadow-lg p-6">
      <h1 className="text-2xl font-bold text-center text-white mb-6">Log in</h1>
      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
        >
          Log in
        </button>
        <Link to="/register" className="w-full">
          <button
            type="button"
            className="w-full py-2 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-700 transition-colors"
          >
            Register
          </button>
        </Link>
      </form>

      {error && (
        <p className="mt-4 text-center text-sm text-red-400">{error}</p>
      )}
    </div>
  </div>
);

}
