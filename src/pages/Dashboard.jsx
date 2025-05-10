function Dashboard() {
  const username = localStorage.getItem("userName");

  const cardStyle = {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    width: "160px",
    fontWeight: "bold",
    textDecoration: "none",
    color: "#2563eb",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

 return (
  <div style={{
    height: "100vh",
    backgroundColor: "#f1f5f9",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "40px 20px"
  }}>
    <div>
      <h1 style={{ color: "#1e293b", marginBottom: "5px", textAlign: "center" }}>
        ¡Bienvenido, {username}!
      </h1>
      <p style={{ color: "#475569", marginBottom: "30px", textAlign: "center" }}>
        Selecciona un módulo para continuar con la gestión académica.
      </p>
      <div style={{
        display: "flex",
        gap: "20px",
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: "170px"
      }}>
        <a href="/estudiantes" style={cardStyle}>📚 Estudiantes</a>
        <a href="#" style={cardStyle}>📘 Cursos</a>
        <a href="#" style={cardStyle}>👨‍🏫 Profesores</a>
        <a href="#" style={cardStyle}>📝 Matrículas</a>
      </div>
    </div>

    <p style={{
      fontSize: "14px",
      color: "#94a3b8",
      marginBottom:"70px"
    }}>
      EducationSystem - Sistema de Gestión Académica © CESDE 2025
    </p>
  </div>
);
}
export default Dashboard;
