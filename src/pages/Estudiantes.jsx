import { useEffect, useState } from "react";
import "./estudiantes.css";
import logo from "../assets/logosinfondo.png";

function Estudiantes() {
  const [filtro, setFiltro] = useState("");
  const [estudiantes, setEstudiantes] = useState([
    { id: 1, cedula: "1001", nombre: "Laura", apellido: "Gómez", email: "laura@correo.com" },
    { id: 2, cedula: "1002", nombre: "Pedro", apellido: "Ruiz", email: "pedro@correo.com" }
  ]);

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

  const manejarCambio = (e) => {
    setNuevo({ ...nuevo, [e.target.name]: e.target.value });
  };

  const guardarEstudiante = (e) => {
    e.preventDefault();
    const copia = [...estudiantes];
    if (nuevo.id) {
      const index = copia.findIndex(est => est.id === nuevo.id);
      copia[index] = nuevo;
    } else {
      const nuevoEst = { ...nuevo, id: Date.now() };
      copia.push(nuevoEst);
    }
    setEstudiantes(copia);
    setNuevo({ id: null, cedula: "", nombre: "", apellido: "", email: "", cantidadFaltas: 0 });
  };

  const eliminarEstudiante = (id) => {
    const copia = estudiantes.filter(est => est.id !== id);
    setEstudiantes(copia);
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
            {estudiantes
              .filter(e =>
                e.cedula.toLowerCase().includes(filtro) ||
                e.nombre.toLowerCase().includes(filtro))
              .map((e) => (
                <tr key={e.id}>
                  <td>{e.cedula}</td>
                  <td>{e.nombre}</td>
                  <td>{e.apellido}</td>
                  <td>{e.email}</td>
                  <td>
                    <button className="editar-btn" onClick={() => cargarEstudianteParaEditar(e)}>Editar</button>
                    <button className="eliminar-btn" onClick={() => eliminarEstudiante(e.id)}>Eliminar</button>
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
