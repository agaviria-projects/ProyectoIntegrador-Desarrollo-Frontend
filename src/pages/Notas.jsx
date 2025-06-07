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
  const estudianteId = parseInt(localStorage.getItem("estudiante_id") || "0");
  const profesorId = parseInt(localStorage.getItem("profesorId") || "0");

  const [nuevaNota, setNuevaNota] = useState({
    id: null,
    nota: "",
    fechaNota: "",
    estudianteId: "",
    cursoId: ""
  });

  const cargarNotas = async () => {
    try {
      let url = "http://localhost:8080/api/notas/dto";
      const params = [];

      if (rol === "ESTUDIANTE" && estudianteId) {
        params.push(`estudianteId=${estudianteId}`);
      }

      if (rol === "PROFESOR" && profesorId) {
        params.push(`profesorId=${profesorId}`);
      }

      if (params.length > 0) {
        url += `?${params.join("&")}`;
      }

      const res = await axios.get(url);
      setNotas(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error al cargar notas:", error);
    }
  };

  const cargarEstudiantes = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/estudiantes");
      setEstudiantes(res.data);
    } catch (error) {
      console.error("Error cargando estudiantes:", error);
    }
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
    if (rol !== "ESTUDIANTE") {
      cargarEstudiantes();
    }
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

    try {
      await axios.post("http://localhost:8080/api/notas", {
        id: nuevaNota.id,
        nota: nuevaNota.nota,
        fechaNota: nuevaNota.fechaNota,
        estudianteId: nuevaNota.estudianteId,
        cursoId: nuevaNota.cursoId
      });

      setNuevaNota({
        id: null,
        nota: "",
        fechaNota: "",
        estudianteId: "",
        cursoId: ""
      });

      cargarNotas();
    } catch (error) {
      console.error("Error al guardar nota:", error);
    }
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

      <h2>📝 Gestión de Notas</h2>

      {rol !== "ESTUDIANTE" && (
        <form onSubmit={guardarNota} className="estudiante-form">
          <input
            name="fechaNota"
            type="date"
            placeholder="Fecha"
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

          <input
            name="nota"
            type="number"
            step="0.1"
            min="1"
            max="5"
            placeholder="Nota (ej. 4.5)"
            value={nuevaNota.nota}
            onChange={(e) =>
              setNuevaNota({ ...nuevaNota, nota: e.target.value.replace(",", ".") })
            }
            required
          />

          <button type="submit" className="guardar-btn">
            Guardar
          </button>
        </form>
      )}

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
              <th>Fecha</th>
              <th>Estudiante</th>
              <th>Curso</th>
              <th>Nota</th>
              {rol !== "ESTUDIANTE" && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {notas
              .filter((n) =>
                `${n.nombreEstudiante || ""} ${n.apellidoEstudiante || ""}`.toLowerCase().includes(filtro)
              )
              .map((n) => (
                <tr key={n.id}>
                  <td>{n.fechaNota}</td>
                  <td>{n.nombreEstudiante} {n.apellidoEstudiante}</td>
                  <td>{n.nombreCurso}</td>
                  <td>{n.nota}</td>
                  {rol !== "ESTUDIANTE" && (
                    <td>
                      <button className="editar-btn" onClick={() => cargarNotaParaEditar(n)}>
                        Editar
                      </button>
                      <button className="eliminar-btn" onClick={() => eliminarNota(n.id)}>
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
