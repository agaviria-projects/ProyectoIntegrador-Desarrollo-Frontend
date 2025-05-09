function Dashboard() {
  const username = localStorage.getItem("userName");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bienvenido, {username}</h1>
      <p>Este es el panel principal del Sistema de Gestión Académica.</p>
      <a href="/estudiantes">Ir al módulo Estudiantes</a>
    </div>
  );
}

export default Dashboard;
