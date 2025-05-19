import { useEffect, useState } from "react";
import axios from "axios";
import "./estudiantes.css";
import logo from "../assets/logosinfondo.png";

function Estudiantes() {
  const [filtro, setFiltro] = useState("");
  const [estudiantes, setEstudiantes] = useState([]);
  const [nuevo, setNuevo] = useState({
    id: null,
    cedula: "",
    nombre: "",
    apellido: "",
    email: "",
    cantidadFaltas: 0,
  });

  const cargarEstudianteParaEditar = (estudiante) => {
    setNuevo(estudiante);
  };

  const cargarEstudiantes = async () => {
    const res = await axios.get("http://localhost:8080/api/estudiantes");
    const datos = Array.isArray(res.data) ? res.data : [];
    setEstudiantes(datos);
  };

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  const manejarCambio = (e) => {
    setNuevo({ ...nuevo, [e.target.name]: e.target.value });
  };

  const guardarEstudiante = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/estudiantes", nuevo);
    cargarEstudiantes();
    setNuevo({
      id: null,
      cedula: "",
      nombre: "",
      apellido: "",
      email: "",
      cantidadFaltas: 0,
    });
  };

  const eliminarEstudiante = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/estudiantes/${id}`);
      cargarEstudiantes();
    } catch (error) {
      console.error("Error al eliminar estudiante:", error);
    }
  };

  return (
    <div className="estudiantes-container">
      <button
        onClick={() => (window.location.href = "/dashboard")}
        style={{
          backgroundColor: "#1e3a8a",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          padding: "8px 16px",
          cursor: "pointer",
          marginBottom: "16px",
        }}
      >
        ← Volver al Dashboard
      </button>

      <div className="logo-lateral">
        <img src={logo} alt="Logo institucional" style={{ width: "80px" }} />
      </div>

      <div style={{ flex: 1 }}>
        <h2>👩‍🎓 Gestión de Estudiantes</h2>

        <form onSubmit={guardarEstudiante} className="estudiante-form">
          <input
            name="cedula"
            placeholder="Cédula"
            value={nuevo.cedula}
            onChange={manejarCambio}
            required
          />
          <input
            name="nombre"
            placeholder="Nombre"
            value={nuevo.nombre}
            onChange={manejarCambio}
            required
          />
          <input
            name="apellido"
            placeholder="Apellido"
            value={nuevo.apellido}
            onChange={manejarCambio}
            required
          />
          <input
            name="email"
            placeholder="Email"
            value={nuevo.email}
            onChange={manejarCambio}
            required
          />
          <button type="submit" className="guardar-btn">
            Guardar
          </button>
        </form>
      </div>

      <div className="buscador-wrapper">
        <span className="icono-lupa">🔍</span>
        <input
          type="text"
          placeholder="Buscar por cédula o nombre"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value.toLowerCase())}
          className="buscador-input"
        />
      </div>

      <div className="tabla-contenedor">
        <table>
          <thead>
            <tr>
              <th>Cédula</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(estudiantes) &&
              estudiantes
                .filter(
                  (e) =>
                    e.cedula.toLowerCase().includes(filtro) ||
                    e.nombre.toLowerCase().includes(filtro)
                )
                .map((e) => (
                  <tr key={e.id}>
                    <td>{e.cedula}</td>
                    <td>{e.nombre}</td>
                    <td>{e.apellido}</td>
                    <td>{e.email}</td>
                    <td>
                      <button
                        className="editar-btn"
                        onClick={() => cargarEstudianteParaEditar(e)}
                      >
                        Editar
                      </button>
                      <button
                        className="eliminar-btn"
                        onClick={() => eliminarEstudiante(e.id)}
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

export default Estudiantes;
