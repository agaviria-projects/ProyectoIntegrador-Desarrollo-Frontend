import { useState, useEffect } from "react";

function Estudiantes() {
  const [formData, setFormData] = useState({
    cedula: "",
    nombre: "",
    apellido: "",
    email: "",
    cursoId: ""
  });
  const [estudiantes, setEstudiantes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const cursos = {
    "1": "Matemáticas",
    "2": "Lenguaje"
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const actualizados = [...estudiantes];
      actualizados[editIndex] = formData;
      setEstudiantes(actualizados);
      setEditIndex(null);
    } else {
      setEstudiantes([...estudiantes, formData]);
    }
    setFormData({
      cedula: "",
      nombre: "",
      apellido: "",
      email: "",
      cursoId: ""
    });
  };

  const handleEdit = (index) => {
    setFormData(estudiantes[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const filtrados = estudiantes.filter((_, i) => i !== index);
    setEstudiantes(filtrados);
  };

  const resultadosBusqueda = estudiantes.filter(est =>
    est.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    est.cedula.includes(busqueda)
  );

  return (
    <div style={{
      backgroundColor: "#f1f5f9",
      paddingTop: "60px",
      paddingBottom: "40px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "500px",
        padding: "40px",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
      }}>
        <h2 style={{ marginBottom: "20px", textAlign: "center", color: "#1e293b" }}>
          Registro de Estudiantes
        </h2>

        <form onSubmit={handleSubmit}>
          {["cedula", "nombre", "apellido", "email"].map((field) => (
            <input
              key={field}
              name={field}
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
                borderRadius: "6px",
                border: "1px solid #ccc"
              }}
            />
          ))}

          <select
            name="cursoId"
            value={formData.cursoId}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          >
            <option value="">Seleccione un curso</option>
            <option value="1">Matemáticas</option>
            <option value="2">Lenguaje</option>
          </select>

          <button type="submit" style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer"
          }}>
            {editIndex !== null ? "Actualizar Estudiante" : "Guardar Estudiante"}
          </button>
        </form>
      </div>

      {/* 🔍 Buscador */}
      <input
        type="text"
        placeholder="Buscar por nombre o cédula"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          marginTop: "30px",
          padding: "10px",
          width: "90%",
          maxWidth: "500px",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />

      {/* 📋 Tabla */}
      <div style={{
        width: "90%",
        maxWidth: "800px",
        marginTop: "30px",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        padding: "20px"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f1f5f9" }}>
              <th>Cédula</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Curso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {resultadosBusqueda.map((est, index) => (
              <tr key={index} style={{ textAlign: "center", borderTop: "1px solid #eee" }}>
                <td>{est.cedula}</td>
                <td>{est.nombre}</td>
                <td>{est.apellido}</td>
                <td>{est.email}</td>
                <td>{cursos[est.cursoId]}</td>
                <td>
                  <button onClick={() => handleEdit(index)} style={{ marginRight: "10px" }}>✏️</button>
                  <button onClick={() => handleDelete(index)}>🗑️</button>
                </td>
              </tr>
            ))}
            {resultadosBusqueda.length === 0 && (
              <tr><td colSpan="6">No hay estudiantes</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <p style={{
        marginTop: "30px",
        fontSize: "14px",
        color: "#94a3b8",
        textAlign: "center"
      }}>
        EducationSystem - Sistema de Gestión Académica © CESDE 2025
      </p>
    </div>
  );
}

export default Estudiantes;
