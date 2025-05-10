import { useState } from "react";

function Estudiantes() {
  const [formData, setFormData] = useState({
    cedula: "",
    nombre: "",
    apellido: "",
    email: "",
    cursoId: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    // Aquí luego se conecta con el backend
  };

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
            Guardar Estudiante
          </button>
        </form>
      </div>

      {/* Pie de página afuera del formulario */}
      <p style={{
        marginTop: "20px",
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
