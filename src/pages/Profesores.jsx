import { useEffect, useState } from "react";
import axios from "axios";
import "./profesores.css";
import logo from "../assets/logosinfondo.png";

function Profesores() {
  const [filtro, setFiltro] = useState("");
  const [profesores, setProfesores] = useState([]);
  const [nuevo, setNuevo] = useState({
    id: null,
    nombre: "",
    especialidad: "",
    email: "",
  });

  const cargarProfesorParaEditar = (profesor) => {
    setNuevo(profesor);
  };

  const cargarProfesores = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/profesores/dto");
      console.log("Profesores cargados(DTO):", res.data);
      setProfesores(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error cargando profesores:", error);
    }
  };

  useEffect(() => {
    cargarProfesores();
  }, []);

  const manejarCambio = (e) => {
    setNuevo({ ...nuevo, [e.target.name]: e.target.value });
  };

  const guardarProfesor = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/profesores", nuevo);
      cargarProfesores(); // Recargar lista
      setNuevo({ id: null, nombre: "", especialidad: "", email: "" });
    } catch (error) {
      console.error("Error guardando profesor:", error);
    }
  };

  const eliminarProfesor = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/profesores/${id}`);
      cargarProfesores();
    } catch (error) {
      console.error("Error al eliminar profesor:", error);
    }
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
        }}
      >
        ← Volver al Dashboard
      </button>

      <div className="logo-lateral">
        <img src={logo} alt="Logo institucional" style={{ width: "80px" }} />
      </div>

      <h2>👨‍🏫 Gestión de Profesores</h2>

      <form onSubmit={guardarProfesor} className="estudiante-form">
        <input
          name="nombre"
          placeholder="Nombre"
          value={nuevo.nombre}
          onChange={manejarCambio}
          required
        />
        <input
          name="especialidad"
          placeholder="Especialidad"
          value={nuevo.especialidad}
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

      <div className="buscador-wrapper">
        <span className="icono-lupa">🔍</span>
        <input
          type="text"
          placeholder="Buscar por nombre o especialidad"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value.toLowerCase())}
          className="buscador-input"
        />
      </div>

      <div className="tabla-contenedor">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Especialidad</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(profesores) &&
              profesores
                .filter(
                  (p) =>
                    p.nombre.toLowerCase().includes(filtro) ||
                    p.especialidad.toLowerCase().includes(filtro)
                )
                .map((p) => (
                  <tr key={p.id}>
                    <td>{p.nombre}</td>
                    <td>{p.especialidad}</td>
                    <td>{p.email}</td>
                    <td>
                      <button className="editar-btn" onClick={() => cargarProfesorParaEditar(p)}>
                        Editar
                      </button>
                      <button className="eliminar-btn" onClick={() => eliminarProfesor(p.id)}>
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

export default Profesores;
