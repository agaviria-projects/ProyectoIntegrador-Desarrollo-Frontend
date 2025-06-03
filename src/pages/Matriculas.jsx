import { useEffect, useState } from "react";
import axios from "axios";
import "./matriculas.css";
import logo from "../assets/logosinfondo.png";

function Matriculas() {
  const [filtro, setFiltro] = useState("");
  const [matriculas, setMatriculas] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [nueva, setNueva] = useState({
    estudianteId: "",
    cursoId: "",
    fechaMatricula: "",
  });

  const rol = localStorage.getItem("rol")?.toUpperCase();
  const estudianteId = parseInt(localStorage.getItem("estudiante_id") || "0");

  useEffect(() => {
    cargarMatriculas();
    if (rol === "ADMIN") cargarEstudiantes();
    cargarCursos();
  }, []);

  const cargarMatriculas = async () => {
    try {
      let res;

      if (rol === "ESTUDIANTE") {
        if (!estudianteId) {
          console.warn("ID del estudiante no válido");
          return;
        }

        res = await axios.get(`http://localhost:8080/api/matriculas/estudiante/${estudianteId}`);
        const data = res.data.map((m) => ({
          id: m.id,
          nombreEstudiante: `${m.estudiante.nombre}`,
          apellidoEstudiante: `${m.estudiante.apellido}`,
          nombreCurso: m.curso.nombre,
          fechaMatricula: m.fechaMatricula
        }));
        setMatriculas(data);
      } else {
        res = await axios.get("http://localhost:8080/api/matriculas");
        setMatriculas(res.data || []);
      }

    } catch (error) {
      console.error("Error al cargar matrículas:", error);
    }
  };

  const cargarEstudiantes = async () => {
    const res = await axios.get("http://localhost:8080/api/estudiantes");
    setEstudiantes(res.data || []);
  };

  const cargarCursos = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/cursos/dto");
      setCursos(res.data || []);
    } catch (error) {
      console.error("Error al cargar cursos:", error);
    }
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setNueva({ ...nueva, [name]: value });
  };

  const guardarMatricula = async (e) => {
    e.preventDefault();
    try {
      const data = {
        estudiante: { id: parseInt(nueva.estudianteId) },
        curso: { id: parseInt(nueva.cursoId) },
        fechaMatricula: nueva.fechaMatricula,
      };
      await axios.post("http://localhost:8080/api/matriculas", data);
      setNueva({ estudianteId: "", cursoId: "", fechaMatricula: "" });
      cargarMatriculas();
    } catch (error) {
      console.error("Error al guardar matrícula:", error);
    }
  };

  const eliminarMatricula = async (id) => {
    await axios.delete(`http://localhost:8080/api/matriculas/${id}`);
    cargarMatriculas();
  };

  return (
    <div className="matriculas-container">
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

      <h2>📓 Gestión de Matrículas</h2>

      {rol === "ADMIN" && (
        <form onSubmit={guardarMatricula} className="matricula-form">
          <select name="estudianteId" value={nueva.estudianteId} onChange={manejarCambio} required>
            <option value="">Selecciona estudiante</option>
            {estudiantes.map((e) => (
              <option key={e.id} value={e.id}>{e.nombre} {e.apellido}</option>
            ))}
          </select>

          <select name="cursoId" value={nueva.cursoId} onChange={manejarCambio} required>
            <option value="">Selecciona curso</option>
            {cursos.map((c) => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>

          <input
            type="date"
            name="fechaMatricula"
            value={nueva.fechaMatricula}
            onChange={manejarCambio}
            required
          />

          <button type="submit" className="guardar-btn">Guardar</button>
        </form>
      )}

      <div className="buscador-wrapper">
        <span className="icono-lupa">🔍</span>
        <input
          type="text"
          placeholder="Buscar por estudiante o curso"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value.toLowerCase())}
          className="buscador-input"
        />
      </div>

      <div className="tabla-contenedor">
        <table>
          <thead>
            <tr>
              <th>Estudiante</th>
              <th>Curso</th>
              <th>Fecha Matrícula</th>
              {rol === "ADMIN" && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {matriculas
              .filter((m) =>
                `${m.nombreEstudiante} ${m.apellidoEstudiante || ""}`.toLowerCase().includes(filtro) ||
                m.nombreCurso.toLowerCase().includes(filtro)
              )
              .map((m) => (
                <tr key={m.id}>
                  <td>{m.nombreEstudiante} {m.apellidoEstudiante}</td>
                  <td>{m.nombreCurso}</td>
                  <td>{m.fechaMatricula}</td>
                  {rol === "ADMIN" && (
                    <td>
                     <button
                          className="editar-btn"
                          onClick={() =>
                            setNueva({
                              estudianteId: estudiantes.find(e => `${e.nombre} ${e.apellido}` === m.nombreEstudiante)?.id || "",
                              cursoId: cursos.find(c => c.nombre === m.nombreCurso)?.id || "",
                              fechaMatricula: m.fechaMatricula,
                              id: m.id
                            })
                          }
                        >
                          Editar
                        </button>
                        <button className="eliminar-btn" onClick={() => eliminarMatricula(m.id)}>
                          Eliminar
                        </button>
                      </td>
                    )}
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

export default Matriculas;
