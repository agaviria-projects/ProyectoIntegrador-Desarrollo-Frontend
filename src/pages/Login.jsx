import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Login() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/api/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombreUsuario: username, contrasena: password }),
    });

    if (response.ok) {
      const user = await response.json();
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userName", user.nombreUsuario);
      localStorage.setItem("rol", user.rol);
      navigate("/dashboard");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f1f5f9",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 0 15px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ width: "150px", marginBottom: "20px" }}
        />
        <h2 style={{ color: "#1e293b", marginBottom: "20px" }}>
          Bienvenido al <br />
          Sistema de Gestión Académica
        </h2>

        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          {error && (
            <div
              style={{
                backgroundColor: "#dc2626",
                color: "#fff",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "12px",
                fontWeight: "bold",
                width: "100%",           
                boxSizing: "border-box"  
              }}
            >
              {error}
            </div>
          )}

          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              padding: "12px",
              width: "100%",
              marginBottom: "10px",
              boxSizing: "border-box",
            }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "12px",
              width: "100%",
              marginBottom: "20px",
              boxSizing: "border-box",
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
              cursor: "pointer",
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

