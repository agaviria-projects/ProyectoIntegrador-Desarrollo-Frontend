function Dashboard() {
  const username = localStorage.getItem("userName");

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f1f5f9",
      fontFamily: "Arial, sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "50px"
    }}>
      <h1 style={{ color: "#1e293b", marginBottom: "10px" }}>
        ¡Bienvenido, {username}!
      </h1>
      <p style={{ marginBottom: "30px", color: "#475569" }}>
        Este es el panel principal del sistema EducationSystem.
      </p>

      <div style={{
        display: "grid",
        gap: "20px",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        width: "100%",
        maxWidth: "800px"
      }}>
        <a href="/estudiantes" style={linkStyle}>📚 Estudiantes</a>
        <a href="#" style={linkStyle}>📘 Cursos</a>
        <a href="#" style={linkStyle}>👨‍🏫 Profesores</a>
        <a href="#" style={linkStyle}>📝 Matrículas</a>
      </div>
    </div>
  );
}

const linkStyle = {
  backgroundColor: "#ffffff",
  padding: "20px",
  textAlign: "center",
  borderRadius: "10px",
  textDecoration: "none",
  fontWeight: "bold",
  color: "#2563eb",
  boxShadow: "0 0 10px rgba(0,0,0,0.05)"
};

export default Dashboard;

