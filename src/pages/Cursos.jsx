import { useEffect, useState } from "react";
import axios from "axios";
import "./curso.css";
import logo from "../assets/logosinfondo.png";

function Cursos() {
  const [filtro, setFiltro] = useState("");
  const [cursos, setCursos] = useState([]);
  const [nuevo, setNuevo] = useState({
    id: null,
    nombre: "",
    descripcion: "",
    profesorId: ""
  });

  const rol = localStorage.getItem("rol")?.toUpperCase();
  const userName = localStorage.getItem("userName");

  const cargarCursos = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/cursos/dto");
      const todosLosCursos = Array.isArray(res.data) ? res.data : [];
      let cursosFiltrados = todosLosCursos;

      if (rol === "PROFESOR") {
        cursosFiltrados = todosLosCursos.filter(c => c.emailProfesor === userName);
      } else if (rol === "ESTUDIANTE") {
        cursosFiltrados = todosLosCursos.filter(c =>
          c.estudiantes?.some(e => e.email === userName)
        );
      }

      setCursos(cursosFiltrados);
    } catch (error) {
      console.error("Error cargando cursos:", error);
    }
  };

  useEffect(() => {
    cargarCursos();
  }, []);

  const manejarCambio = (e) => {
    setNuevo({ ...nuevo, [e.target.name]: e.target.value });
  };

  const guardarCurso = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/cursos", {
        nombre: nuevo.nombre,
        descripcion: nuevo.descripcion,
        profesor: { id: parseInt(nuevo.profesorId) }
      });
      cargarCursos();
      setNuevo({ id: null, nombre: "", descripcion: "", profesorId: "" });
    } catch (error) {
      console.error("Error guardando curso:", error);
    }
  };

  const eliminarCurso = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/cursos/${id}`);
      cargarCursos();
    } catch (error) {
      console.error("Error al eliminar curso:", error);
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

      <h2>📦 Gestión de Cursos</h2>

      {rol === "ADMIN" && (
        <form onSubmit={guardarCurso} className="estudiante-form">
          <input name="nombre" placeholder="Nombre" value={nuevo.nombre} onChange={manejarCambio} required />
          <input name="descripcion" placeholder="Descripción" value={nuevo.descripcion} onChange={manejarCambio} required />
          <input name="profesorId" placeholder="ID Profesor" value={nuevo.profesorId} onChange={manejarCambio} required />
          <button type="submit" className="guardar-btn">Guardar</button>
        </form>
      )}

      <div className="buscador-wrapper">
        <span className="icono-lupa">🔍</span>
        <input
          type="text"
          placeholder="Buscar por nombre"
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
              <th>Descripción</th>
              <th>Profesor</th>
              {rol === "ADMIN" && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {cursos
              .filter(c => c.nombre.toLowerCase().includes(filtro))
              .map((c) => (
                <tr key={c.id}>
                  <td>{c.nombre}</td>
                  <td>{c.descripcion}</td>
                  <td>{c.nombreProfesor}</td>
                  {rol === "ADMIN" && (
                    <td>
                      <button className="editar-btn" onClick={() =>
                        setNuevo({
                          id: c.id,
                          nombre: c.nombre,
                          descripcion: c.descripcion,
                          profesorId: ""
                        })
                      }>
                        Editar
                      </button>
                      <button className="eliminar-btn" onClick={() => eliminarCurso(c.id)}>
                        Eliminar
                      </button>
                    </td>
                  )}
                </tr>
              ))
            }
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

export default Cursos;
