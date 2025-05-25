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
    profesor: { id: "" },
  });

  const cargarCursoParaEditar = (curso) => {
    setNuevo({
      id: curso.id,
      nombre: curso.nombre,
      descripcion: curso.descripcion,
      profesor: { id: curso.profesor?.id || "" },
    });
  };

  const cargarCursos = async () => {
    const res = await axios.get("http://localhost:8080/api/cursos");
    const datos = Array.isArray(res.data) ? res.data : [];
    setCursos(datos);
  };

  useEffect(() => {
    cargarCursos();
  }, []);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    if (name === "profesorId") {
      setNuevo({ ...nuevo, profesor: { id: value } });
    } else {
      setNuevo({ ...nuevo, [name]: value });
    }
  };

  const guardarCurso = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/cursos", nuevo);
    cargarCursos();
    setNuevo({ id: null, nombre: "", descripcion: "", profesor: { id: "" } });
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
        onClick={() => (window.location.href = "/dashboard")}
        style={{
          backgroundColor: "#ffffff",
          color: "#2563eb",
          border: "2px solid #2563eb",
          borderRadius: "8px",
          padding: "8px 16px",
          fontWeight: "bold",
          cursor: "pointer",
          marginBottom: "20px",
          marginTop: "10px",
        }}
      >
        ← Volver al Dashboard
      </button>

      <div className="logo-lateral">
        <img src={logo} alt="Logo institucional" style={{ width: "80px" }} />
      </div>

      <div style={{ flex: 1 }}>
        <h2>💼 Gestión de Cursos</h2>

        <form onSubmit={guardarCurso} className="estudiante-form">
          <input
            name="nombre"
            placeholder="Nombre"
            value={nuevo.nombre}
            onChange={manejarCambio}
            required
          />
          <input
            name="descripcion"
            placeholder="Descripción"
            value={nuevo.descripcion}
            onChange={manejarCambio}
            required
          />
          <input
            name="profesorId"
            placeholder="ID Profesor"
            value={nuevo.profesor.id}
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
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(cursos) &&
              cursos
                .filter((c) => c.nombre.toLowerCase().includes(filtro))
                .map((c) => (
                  <tr key={c.id}>
                    <td>{c.nombre}</td>
                    <td>{c.descripcion}</td>
                    <td>{c.profesor?.nombre || ""}</td>
                    <td>
                      <button
                        className="editar-btn"
                        onClick={() => cargarCursoParaEditar(c)}
                      >
                        Editar
                      </button>
                      <button
                        className="eliminar-btn"
                        onClick={() => eliminarCurso(c.id)}
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

export default Cursos;
