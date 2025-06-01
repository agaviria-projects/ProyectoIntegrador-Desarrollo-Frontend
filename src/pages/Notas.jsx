import { useEffect, useState } from "react";
import axios from "axios";
import "./notas.css";
import logo from "../assets/logosinfondo.png";

function Notas() {
  const [filtro, setFiltro] = useState("");
  const [notas, setNotas] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [cursos, setCursos] = useState([]);
  const rol = (localStorage.getItem("rol") || "ADMIN").toUpperCase();
  const username = localStorage.getItem("userName") || "";

  const [nuevaNota, setNuevaNota] = useState({
    id: null,
    nota: "",
    fechaNota: "",
    estudianteId: "",
    cursoId: ""
  });

  const cargarNotas = async () => {
    const res = await axios.get("http://localhost:8080/api/notas/dto");
    const datos = Array.isArray(res.data) ? res.data : [];

    if (rol === "ESTUDIANTE") {
      setNotas(datos.filter(n => n.emailEstudiante === username));
    } else {
      setNotas(datos);
    }
  };

  const cargarEstudiantes = async () => {
    const res = await axios.get("http://localhost:8080/api/estudiantes");
    setEstudiantes(res.data);
  };

  const cargarCursosPorEstudiante = async (estudianteId) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/matriculas/estudiante/${estudianteId}/cursos`);
      setCursos(res.data || []);
    } catch (error) {
      console.error("Error cargando cursos del estudiante:", error);
      setCursos([]);
    }
  };

  useEffect(() => {
    cargarNotas();
    cargarEstudiantes();
  }, []);

  useEffect(() => {
    if (nuevaNota.estudianteId) {
      cargarCursosPorEstudiante(nuevaNota.estudianteId);
    } else {
      setCursos([]);
    }
  }, [nuevaNota.estudianteId]);

  const manejarCambio = (e) => {
    setNuevaNota({ ...nuevaNota, [e.target.name]: e.target.value });
  };

  const guardarNota = async (e) => {
    e.preventDefault();
    const notaNum = parseFloat(nuevaNota.nota);
    if (notaNum < 1 || notaNum > 5) {
      alert("La nota debe estar entre 1.0 y 5.0");
      return;
    }

    await axios.post("http://localhost:8080/api/notas", {
      id: nuevaNota.id,
      nota: nuevaNota.nota,
      fechaNota: nuevaNota.fechaNota,
      estudianteId: nuevaNota.estudianteId,
      cursoId: nuevaNota.cursoId
    });

    cargarNotas();
    setNuevaNota({
      id: null,
      nota: "",
      fechaNota: "",
      estudianteId: "",
      cursoId: ""
    });
  };

  const cargarNotaParaEditar = (nota) => {
    setNuevaNota({
      id: nota.id,
      nota: nota.nota,
      fechaNota: nota.fechaNota,
      estudianteId: nota.estudianteId,
      cursoId: nota.cursoId
    });
  };

  const eliminarNota = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/notas/${id}`);
      cargarNotas();
    } catch (error) {
      console.error("Error al eliminar nota:", error);
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

      <div style={{ flex: 1 }}>
        <h2>📝 Gestión de Notas</h2>

        {rol !== "ESTUDIANTE" && (
          <form onSubmit={guardarNota} className="estudiante-form">
            <input
              name="nota"
              type="number"
              step="0.1"
              min="1"
              max="5"
              placeholder="Nota (ej.4.5)"
              value={nuevaNota.nota}
              onChange={e => {
                const valor = e.target.value.replace(',', '.');
                setNuevaNota({ ...nuevaNota, nota: valor });
              }}
              required
            />
            <input
              name="fechaNota"
              type="date"
              placeholder="Fecha de Nota"
              value={nuevaNota.fechaNota}
              onChange={manejarCambio}
              required
            />
            <select
              name="estudianteId"
              value={nuevaNota.estudianteId}
              onChange={manejarCambio}
              required
            >
              <option value="">Seleccione Estudiante</option>
              {estudiantes.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.nombre} {e.apellido}
                </option>
              ))}
            </select>

            <select
              name="cursoId"
              value={nuevaNota.cursoId}
              onChange={manejarCambio}
              required
            >
              <option value="">Seleccione Curso</option>
              {cursos.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>

            <button type="submit" className="guardar-btn">
              Guardar
            </button>
          </form>
        )}
      </div>

      <div className="buscador-wrapper">
        <span className="icono-lupa">🔍</span>
        <input
          type="text"
          placeholder="Buscar por estudiante"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value.toLowerCase())}
          className="buscador-input"
        />
      </div>

      <div className="tabla-contenedor">
        <table>
          <thead>
            <tr>
              <th>Nota</th>
              <th>Fecha</th>
              <th>Estudiante</th>
              <th>Curso</th>
              {rol !== "ESTUDIANTE" && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {notas
              .filter(n =>  `${n.nombreEstudiante} ${n.apellidoEstudiante}`.toLowerCase().includes(filtro))
              .map((n) => (
                <tr key={n.id}>
                  <td>{n.nota}</td>
                  <td>{n.fechaNota}</td>
                  <td>{n.nombreEstudiante} {n.apellidoEstudiante}</td>
                  <td>{n.nombreCurso}</td>
                  {rol !== "ESTUDIANTE" && (
                    <td>
                      <button
                        className="editar-btn"
                        onClick={() => cargarNotaParaEditar(n)}
                      >
                        Editar
                      </button>
                      <button
                        className="eliminar-btn"
                        onClick={() => eliminarNota(n.id)}
                      >
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

export default Notas;
