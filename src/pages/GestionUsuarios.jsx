import { useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/logosinfondo.png";
import "./estudiantes.css";
import { FaUserCog } from "react-icons/fa";

function GestionUsuarios() {
  const [filtro, setFiltro] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [nuevo, setNuevo] = useState({
    id: null,
    nombreUsuario: "",
    contrasena: "",
    correo: "",
    rol: ""
  });

  const cargarUsuarios = async () => {
    const res = await axios.get("http://localhost:8080/api/usuarios");
    const datos = Array.isArray(res.data) ? res.data : [];
    setUsuarios(datos);
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const manejarCambio = (e) => {
    setNuevo({ ...nuevo, [e.target.name]: e.target.value });
  };

  const guardarUsuario = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/usuarios", nuevo);
    cargarUsuarios();
    setNuevo({ id: null, nombreUsuario: "", contrasena: "", correo: "", rol: "" });
  };

  const eliminarUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/usuarios/${id}`);
      cargarUsuarios();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const cargarUsuarioParaEditar = (usuario) => {
    setNuevo(usuario);
  };

  return (
    <div className="estudiantes-container">
      <button
        onClick={() => window.location.href = "/dashboard"}
        style={{
          backgroundColor: "#ffffff",
          color: "#2563eb",
          border: "2px solid #2563eb",
          borderRadius: "8px",
          padding: "8px 16px",
          fontWeight: "bold",
          cursor: "pointer",
          marginBottom: "20px",
          marginTop: "10px"
        }}>
        ← Volver al Dashboard
      </button>

      <div className="logo-lateral">
        <img src={logo} alt="Logo institucional" style={{ width: "80px" }} />
      </div>

      <div style={{ flex: 1 }}>
        <h2><FaUserCog style={{ marginRight: "8px" }} /> Gestión de Usuarios</h2>

        <form onSubmit={guardarUsuario} className="estudiante-form">
          <input
            name="nombreUsuario"
            placeholder="Nombre de usuario"
            value={nuevo.nombreUsuario}
            onChange={manejarCambio}
            required
          />
          <input
            name="contrasena"
            placeholder="Contraseña"
            type="password"
            value={nuevo.contrasena}
            onChange={manejarCambio}
            required
          />
          <input
            name="correo"
            placeholder="Correo"
            value={nuevo.correo}
            onChange={manejarCambio}
          />
          <select
            name="rol"
            value={nuevo.rol}
            onChange={manejarCambio}
            required
          >
            <option value="">Seleccionar rol</option>
            <option value="ADMIN">ADMIN</option>
            <option value="PROFESOR">PROFESOR</option>
            <option value="ESTUDIANTE">ESTUDIANTE</option>
          </select>
          <button type="submit" className="guardar-btn">
            Guardar
          </button>
        </form>
      </div>

      <div className="buscador-wrapper">
        <span className="icono-lupa">🔍</span>
        <input
          type="text"
          placeholder="Buscar por nombre de usuario"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value.toLowerCase())}
          className="buscador-input"
        />
      </div>

      <div className="tabla-contenedor">
        <table>
          <thead>
            <tr>
              <th>ID</th>  
              <th>Nombre Usuario</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(usuarios) &&
            usuarios
                .filter((e) => (e.nombreUsuario || "").toLowerCase().includes(filtro))
                .map((u) => (
                <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.nombreUsuario}</td>
                    <td>{u.correo}</td>
                    <td>{u.rol}</td>
                    <td>
                    <button
                        className="editar-btn"
                        onClick={() => cargarUsuarioParaEditar(u)}
                    >
                        Editar
                    </button>
                    <button
                        className="eliminar-btn"
                        onClick={() => eliminarUsuario(u.id)}
                    >
                        Eliminar
                    </button>
                    </td>
                </tr>
                ))}

          </tbody>
        </table>
      </div>

      <footer className="footer-institucional">
        <p>© 2025 EducationSystem | Instituto de Gestión Académica</p>
        <p>Versión 1.0.0</p>
      </footer>
    </div>
  );
}

export default GestionUsuarios;

