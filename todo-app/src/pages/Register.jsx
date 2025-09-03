import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5162/api/account/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
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
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <p>Already a user? Log in instead</p>
      <Link to="/">
        <button style={{ padding: "10px 20px", marginTop: "10px" }}>
          Login
        </button>
      </Link>
      
      {error && <p style={{ color: "red" }}>{error}</p>}
      
    </div>
  );
}
