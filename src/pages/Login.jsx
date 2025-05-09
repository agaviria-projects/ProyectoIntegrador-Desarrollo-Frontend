import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userName", username);
      navigate("/dashboard");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f1f5f9",
      fontFamily: "Arial, sans-serif",
      margin: "0",
      padding: "0",  

    }}>
      <div style={{
        width: "100%",
        maxWidth: "420px",
        background: "#ffffff",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        textAlign: "center"
      }}>
        <img src={logo} alt="Logo" style={{ width: "150px", marginBottom: "20px" }} />
        <h2 style={{ color: "#1e293b", marginBottom: "20px" }}>
          Bienvenido al <br />Sistema de Gestión Académica
        </h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              padding: "12px",
              width: "100%",
              borderRadius: "6px",
              border: "1px solid #ccc",
              marginBottom: "20px",
              fontSize: "16px"
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px",
              width: "100%",
              backgroundColor: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  ); 
}

export default Login;
