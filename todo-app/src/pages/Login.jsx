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
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
        <Link to="/register">
          <button style={{ padding: "10px 20px", marginTop: "10px" }}>
            Register
          </button>
        </Link>
      </form>
      
      {error && <p style={{ color: "red" }}>{error}</p>}
      
    </div>
  );
}
