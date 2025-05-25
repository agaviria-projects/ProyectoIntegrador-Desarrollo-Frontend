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

  useEffect(() => {
    cargarMatriculas();
    cargarEstudiantes();
    cargarCursos();
  }, []);

  const cargarMatriculas = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/matriculas");
      setMatriculas(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error al cargar matrículas:", error);
    }
  };

  const cargarEstudiantes = async () => {
    const res = await axios.get("http://localhost:8080/api/estudiantes");
    setEstudiantes(res.data || []);
  };

  const cargarCursos = async () => {
    const res = await axios.get("http://localhost:8080/api/cursos");
    setCursos(res.data || []);
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
      setNueva({
        estudianteId: "",
        cursoId: "",
        fechaMatricula: "",
      });
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
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {matriculas
              .filter((m) =>
                m.nombreEstudiante.toLowerCase().includes(filtro) ||
                m.nombreCurso.toLowerCase().includes(filtro)
              )
              .map((m) => (
                <tr key={m.id}>
                  <td>{m.nombreEstudiante} {m.apellidoEstudiante}</td>
                  <td>{m.nombreCurso}</td>
                  <td>{m.fechaMatricula}</td>
                  <td>
                    <button className="eliminar-btn" onClick={() => eliminarMatricula(m.id)}>
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

export default Matriculas;
